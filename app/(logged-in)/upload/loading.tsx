import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import BgGradient from '@/components/common/bg-gradient';

export default function LoadingSkeleton() {
	return (
		<div className="min-h-screen">
			<BgGradient />

			<div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
				<div className="flex flex-col gap-2 items-center justify-center text-center">
					{/* "AI-Powered Content Creation" Tag */}
					<div className="mb-8 rounded-full border px-6 py-4">
						<Skeleton className="h-4 w-48 bg-gray-100" />
					</div>

					{/* "Start Uploading Your PDF's" Title */}
					<div className="mb-4">
						<Skeleton className="h-10 w-[350px] sm:w-[500px] bg-gray-200" />
					</div>

					{/* Subheading */}
					<div className="mb-12">
						<Skeleton className="h-6 w-[250px] sm:w-[400px] bg-gray-200" />
					</div>

					{/* File Upload Box */}
					<div className="flex w-2/3 items-center justify-between gap-4">
						<Skeleton className="h-12 w-full rounded-xl bg-gray-200" />
						{/* Upload Button */}
						<Skeleton className="h-12 w-32 rounded-xl bg-gray-300" />
					</div>
				</div>
			</div>
		</div>
	);
}
