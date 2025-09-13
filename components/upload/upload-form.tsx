'use client';

import z from 'zod';
import UploadFormInput from './upload-form-input';
import { useUploadThing } from '@/lib/uploadthing';
import { CustomToast } from '../common/custom-toast';
import { Check, X } from 'lucide-react';
import {
	generatePdfText,
	generateSummaryByAi,
	storePDFSummaryAction
} from '@/actions/upload-actions';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MotionDiv } from '../common/motion-wrapper';
import StatusMessages, { Message, StatusOptions } from './status-messages';
import { SummaryViewerSkeleton } from '@/app/(logged-in)/summaries/[id]/loading';

const schema = z.object({
	file: z
		.instanceof(File, { message: 'Invalid file.' })
		.refine(file => file.type === 'application/pdf', {
			message: 'Only PDF files are allowed.'
		})
		.refine(file => file.size <= 20 * 1024 * 1024, {
			message: 'File must be under 20MB.'
		})
});

const UploadForm = () => {
	const formRef = useRef<HTMLFormElement>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [file, setFile] = useState<File | null>(null);
	const [messages, setMessages] = useState<Message[]>([]);
	const router = useRouter();

	const showStatus = (
		title: string,
		description: string,
		options: StatusOptions = {}
	) => {
		const {
			icon,
			className = '',
			type = 'info',
			showToast = true
		} = options;

		if (showToast)
			CustomToast(title, { description, icon, className });

		setMessages((prev: Message[]) => [
			...prev,
			{
				id: Date.now(),
				text: `${title}: ${description}`,
				type
			}
		]);
	};

	const { startUpload, isUploading } = useUploadThing('pdfUploader', {
		onClientUploadComplete: () => {
			// console.log('uploaded successfully!');
			showStatus(
				'Success Upload',
				'The file has been uploaded successfully.',
				{ showToast: false }
			);
		},
		onUploadError: err => {
			console.error('error occurred while uploading', err);

			showStatus(
				'Upload Error',
				'An error occurred while uploading. Please try again.',
				{ icon: X, type: 'error' }
			);
		},
		onUploadBegin: fileName => {
			// console.log('upload has begun for', fileName);
			showStatus(
				'Upload Started',
				`Uploading "${fileName}"... The upload time will depend on your file size and internet speed.`
			);
		}
	});

	const resetForm = () => {
		formRef.current?.reset();
		setFile(null);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!file) return;

		// Handle file upload logic here
		setIsLoading(true);
		setMessages([]); // Clear previous logs

		try {
			// const formData = new FormData(e.currentTarget);
			// const file = formData.get('file') as File;

			// Validate the fields
			const validatedFile = schema.safeParse({ file });

			if (!validatedFile.success) {
				const errorMessages = validatedFile.error.issues
					.map(issue => issue.message)
					.join(', ');

				/* 
        // another way: 
        validatedFile.error.issues
						.flatMap(issue => issue.message)
						.join(', ')
        */

				showStatus(
					'Invalid File',
					errorMessages ||
						'An unknown error occurred.',
					{ icon: X, type: 'error' }
				);

				setIsLoading(false);
				return;
			}

			// Upload the file to uploadthing
			const uploadResponse = await startUpload([
				validatedFile.data.file
			]);

			if (!uploadResponse) {
				showStatus(
					'Upload Failed',
					'Something went wrong. Please try another file.',
					{ icon: X, type: 'error' }
				);

				setIsLoading(false);
				return;
			}

			showStatus(
				'Processing PDF',
				'Hang tight! Our AI is reading your document.',
				{ type: 'info' }
			);

			const uploadFileUrl =
				uploadResponse[0].serverData.file.url;
			const fileName = file.name;

			// Parse the PDF using LangChain
			const generatedText = await generatePdfText(
				// uploadResponse[0] ? uploadResponse[0] : null
				fileName,
				uploadFileUrl
			);

			if (
				!generatedText ||
				!generatedText.success ||
				!generatedText.data
			) {
				showStatus(
					'Summary Failed',
					generatedText.message ||
						'System could not extract text from the pdf.',
					{ icon: X, type: 'error' }
				);

				resetForm();
				setIsLoading(false);
				return;
			}

			const {
				data: { pdfText, title }
			} = generatedText;

			// Summarize the PDF using AI
			const summary = await generateSummaryByAi(pdfText);

			const {
				data = null,
				message = null,
				success = false
			} = summary || {};

			if (!summary || !success || !data) {
				showStatus(
					'Summary Failed',
					message ||
						'The AI could not summarize the document.',
					{ icon: X, type: 'error' }
				);

				resetForm();
				setIsLoading(false);
				return;
			}

			if (data && data.summary) {
				showStatus(
					'Saving Summary',
					'Almost there! Saving the generated summary.',
					{ type: 'info' }
				);

				// Save the summary to the database
				const storedSummaryStatus =
					await storePDFSummaryAction({
						summary: data.summary,
						fileUrl: uploadFileUrl,
						title,
						fileName
					});

				if (storedSummaryStatus.success) {
					showStatus(
						'🌟 Summary Generated!',
						'Your PDF has been saved successfully. You will be redirected to the summary page. 🌟',
						{
							icon: Check,
							className: ' bg-gradient-to-r text-white from-green-900 to-green-500',
							type: 'success'
						}
					);
				} else {
					showStatus(
						'Save Error',
						'Could not save the summary.',
						{ icon: X, type: 'error' }
					);
					return;
				}

				resetForm();
				setIsLoading(false);

				// redirect to [id] summary page
				setTimeout(() => {
					router.push(
						`/summaries/${storedSummaryStatus?.data?.id}`
					);
				}, 1500);
			}
		} catch (error) {
			console.error('Error occurred', error);

			showStatus(
				'System Error',
				'An unexpected error occurred.',
				{ icon: X, type: 'error' }
			);

			setIsLoading(false);
			resetForm();
		} finally {
			setIsLoading(false);
			// router.refresh();
		}
	};
	return (
		<MotionDiv
			// variants={itemVariants}
			className="flex flex-col ga-8 w-full max-w-2xl mx-auto"
		>
			<UploadFormInput
				ref={formRef}
				isLoading={isLoading || isUploading}
				onSubmit={handleSubmit}
				file={file}
				onFileChange={setFile}
			/>
			<StatusMessages messages={messages} />

			{isLoading && (
				<div className="relative mt-8 sm:mt-6 flex justify-center">
					<SummaryViewerSkeleton />
				</div>
			)}
		</MotionDiv>
	);
};

UploadFormInput.displayName = 'UploadFormInput';

export default UploadForm;
