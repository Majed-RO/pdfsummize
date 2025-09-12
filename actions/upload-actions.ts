'use server';

import getDbConnection from '@/lib/db';
import { generateSummaryFromGemini } from '@/lib/geminiai';
import { fetchAndExtractPdfText } from '@/lib/langchain';
import { generateSummaryFromOpenAI } from '@/lib/openai';
import { formatFileNameToTitle, isAppError } from '@/lib/utils';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

interface PDFSummaryTypes {
	userId?: string;
	fileUrl: string;
	summary: string;
	title: string;
	fileName: string;
}

// server actions
// export async function generatePdfText(
// 	uploadResponse: {
// 		serverData: {
// 			userId: string;
// 			file: {
// 				url: string;
// 				name: string;
// 			};
// 		};
// 	} | null
// ) {
export async function generatePdfText(fileName: string, fileUrl: string) {
	if (!fileUrl) {
		return {
			success: false,
			message: 'File upload failed',
			data: null
		};
	}

	let pdfText;
  
	try {
		// extract the pdf file using long-chain
		pdfText = await fetchAndExtractPdfText(fileUrl);
	} catch (error) {
		console.error('Error extracting PDF text:', error);
		return {
			success: false,
			message: 'Failed to read the PDF content.',
			data: null
		};
	}

	// If both succeed
	const formattedFileName = formatFileNameToTitle(fileName);
	return {
		success: true,
		message: 'Summary generated successfully.',
		data: {
			pdfText,
			title: formattedFileName
		}
	};
}

export async function generateSummaryByAi(pdfText: string) {
	let summary;
	try {
		summary = await generateSummaryFromOpenAI(pdfText);

		if (!summary) {
			return {
				success: false,
				message: 'Failed to generate a summary.',
				data: null
			};
		}
	} catch (error) {
		console.error('Error generating summary with OpenAI:', error);

		// call gemini in case open-ia fails
		if (isAppError(error, 'RATE_LIMIT_EXCEEDED')) {
			console.log(
				'OpenAI quota exceeded, switching to Gemini API'
			);
			try {
				summary = await generateSummaryFromGemini(
					pdfText
				);
			} catch (geminiError) {
				console.error(
					'Gemini API failed after OpenAI quote exceeded',
					geminiError
				);

				throw new Error(
					'Failed to generate summary with available AI providers'
				);
			}
		}
	}

	return {
		success: true,
		message: 'Summary generated successfully.',
		data: {
			summary
		}
	};
}

export async function storePDFSummaryAction({
	fileUrl,
	summary,
	title,
	fileName
}: PDFSummaryTypes) {
	// user is logged in ? and get the user id
	// store the summary in the db = savePDFSummary()
	// return success or failure

	let savedPDFSummary;
	try {
		const { userId } = await auth();
		if (!userId) {
			// throw new Error('User not authenticated');
			return {
				success: false,
				message: 'User not found.',
				data: null
			};
		}
		savedPDFSummary = await savePDFSummary({
			userId,
			fileUrl,
			summary,
			title,
			fileName
		});

		if (!savedPDFSummary) {
			return {
				success: false,
				message: 'Failed to save PDF summary. Please try again.',
				data: null
			};
		}
	} catch (error) {
		return {
			success: false,
			message:
				error instanceof Error
					? error.message
					: 'Error saving PDF summary.',
			data: null
		};
	}

	// revalidate the path /summary to reflect the new summary added
	revalidatePath(`/summaries/${savedPDFSummary.id}`);

	return {
		success: true,
		message: 'PDF summary saved successfully.',
		data: {
			id: savedPDFSummary.id,
			summaryText: savedPDFSummary.summary_text
		}
	};
}

export async function savePDFSummary({
	userId,
	fileUrl,
	summary,
	title,
	fileName
}: PDFSummaryTypes) {
	let savedSummary;
	try {
		const sql = await getDbConnection();

		[savedSummary] = await sql`INSERT INTO pdf_summaries (
          user_id,
          original_file_url,
          summary_text,
          title,
          file_name
      ) VALUES (
          ${userId},
          ${fileUrl},
          ${summary},
          ${title},
          ${fileName}
      )
      RETURNING id, summary_text;
      `;
	} catch (error) {
		console.log('Error saving PDF summary:', error);
		throw error;
	}

	// console.log('SAVED SUMMARY ID', savedSummary);

	return savedSummary;
}
