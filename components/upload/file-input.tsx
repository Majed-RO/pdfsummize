import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import React, { ChangeEvent } from 'react';
import { Label } from '../ui/label';

interface FileInputProps {
	label: string;
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

// const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
// 	({ label, onChange, ...props }, ref) => {
const FileInput = ({ label, onChange, ...props }: FileInputProps) => {
	return (
		<div className="flex gap-2">
			<div className="relative flex-1">
				{/* The hidden file input */}
				<Input
					id="file-upload"
					// ref={ref}
					type="file"
					className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
					onChange={onChange}
					{...props}
				/>
				{/* The visible, styled button */}
				<Button
					asChild
					className="w-full flex justify-center items-center gap-2 border-dashed border-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
					variant="outline"
				>
					<Label
						htmlFor="file-upload"
						className="cursor-pointer p-4"
					>
						<Upload className="h-4 w-4" />
						<span>
							{label
								? label
								: 'Click to select file'}
						</span>
					</Label>
				</Button>
			</div>
		</div>
	);
}
// )

// FileInput.displayName = 'FileInput';
export default FileInput;
