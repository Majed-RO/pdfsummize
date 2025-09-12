'use client';
import { forwardRef, useState } from 'react';
import { Button } from '../ui/button';
import {  Loader2 } from 'lucide-react';
import FileInput from './file-input';
import { Label } from '../ui/label';

interface UploadFormInputProps {
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	isLoading: boolean;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const UploadFormInput = forwardRef<HTMLFormElement, UploadFormInputProps>(
	({ onSubmit, isLoading, file, onFileChange  }, ref) => {

		const handleFileChange = (
			event: React.ChangeEvent<HTMLInputElement>
		) => {
			const selectedFile = event.target.files?.[0] || null;
      onFileChange(selectedFile); // setFile in the parent
		};

		return (
			<form
				ref={ref}
				className="flex flex-col gap-6"
				onSubmit={onSubmit}
			>
				<div className="flex justify-end items-center gap-1">
					{/* <Input
						type="file"
						id="file"
						name="file"
						accept="application/pdf"
						required
						className={cn(
							isLoading &&
								'opacity-50 cursor-not-allowed'
						)}
						disabled={isLoading}
					/> */}

					<div className="mt-1 w-full">
						<FileInput
							label={
								file
									? file.name
									: 'Select a PDF file'
							}
							onChange={
								handleFileChange
							}
							// id="pdfFile"
						/>
					</div>
					<Button disabled={isLoading || file === null}>
						{isLoading ? (
							<>
								<Loader2 className="mr-2 size-4 animate-spin" />{' '}
								Processing...
							</>
						) : (
							'Upload your PDF'
						)}
					</Button>
				</div>
			</form>
		);
	}
);

export default UploadFormInput;
