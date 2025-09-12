import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { FileText } from 'lucide-react';

export default function Loading() {
	return (
		<div className="relative isolate min-h-screen bg-rose-50/40">
			<div className="container mx-auto flex flex-col gap-4">
				<div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-12 lg:py-24">
					<div className="flex flex-col">
						{/* SummaryHeader Skeleton */}

						<SummaryHeaderSkeleton />
					</div>
					{/* SourceInfo Skeleton */}

					<SourceInfoSkeleton />

					{/* Main content area skeleton */}
					<div className="relative p-4 sm:p-6 lg:p-8 bg-white/80 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-xl border border-rose-100/30 transition-all duration-300 hover:shadow-2xl hover:bg-white/90 max-w-4xl mx-auto mt-8">
						<div className="absolute inset-0 bg-linear-to-br from-rose-50/50 via-orange-50/30 to-transparent opacity-50 rounded-2xl sm:rounded-3xl" />
						<div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground bg-white/90 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-xs">
							<FileText className="h-3 w-3 sm:h-4 sm:w-4 text-rose-400" />
							<Skeleton className="h-4 w-20 bg-gray-100" />
						</div>

						{/* Custom Skeleton for SummaryViewer */}
						<div className="relative mt-8 sm:mt-6 flex justify-center ">
							<SummaryViewerSkeleton />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export const SummaryViewerSkeleton = () => {
	return (
		<Card className="relative px-2 h-[600px] w-full md:w-[450px]   xl:w-[600px] overflow-hidden bg-linear-to-br from-background via-background/95 to-rose-500/5 backdrop-blur-lg shadow-2xl rounded-3xl border border-rose-500/10">
			<div className="h-[600px] flex flex-col justify-between">
				{/* ProgressBar Skeleton */}
				<ProgressBarSkeleton />

				{/* SummaryViewer Content Skeleton */}
				<div className="h-full pb-20 sm:pb-24 px-4 sm:px-6">
					{/* Title and main heading skeletons */}
					<div className="flex flex-col items-center gap-4 text-center my-6">
						<Skeleton className="h-6 w-1/2 bg-gray-200 rounded-lg" />
						<Skeleton className="h-10 w-full max-w-lg bg-gray-200 rounded-xl" />
					</div>
					{/* List items skeleton */}
					<div className="flex flex-col gap-4 text-gray-700 pb-10">
						{Array.from({
							length: 3
						}).map((_, index) => (
							<div
								key={index}
								className="rounded-lg border p-4 bg-gray-50 flex items-start gap-4"
							>
								<Skeleton className="h-6 w-6 rounded-full bg-yellow-200" />
								<div className="flex-1 space-y-2">
									<Skeleton className="h-4 w-full bg-gray-200" />
									<Skeleton className="h-4 w-11/12 bg-gray-200" />
								</div>
							</div>
						))}
					</div>
					{/* Navigation Controls Skeleton */}
					<div className="w-full p-4 border-t border-rose-500/10 flex justify-between gap-4">
						<Skeleton className="h-10 w-10 rounded-full bg-rose-200" />
						<div className="flex items-center gap-2">
							<Skeleton className="h-2 w-2 rounded-full bg-rose-400" />
							<Skeleton className="h-2 w-2 rounded-full bg-rose-200" />
							<Skeleton className="h-2 w-2 rounded-full bg-rose-200" />
						</div>
						<Skeleton className="h-10 w-10 rounded-full bg-rose-200" />
					</div>
				</div>
			</div>
		</Card>
	);
};

const SummaryHeaderSkeleton = () => {
	return (
		<div className="flex gap-4 mb-4 justify-between">
			<div className="space-y-6">
				<div className="flex flex-wrap items-center gap-4">
					<Skeleton className="relative h-7 w-32 rounded-full bg-rose-100" />
					<div className="flex items-center gap-2 text-sm text-gray-500">
						<Skeleton className="h-4 w-4 bg-rose-100" />
						<Skeleton className="h-4 w-32 bg-rose-100" />
					</div>
					<div className="flex items-center gap-2 text-sm text-gray-500">
						<Skeleton className="h-4 w-4 bg-rose-100" />
						<Skeleton className="h-4 w-24 bg-rose-100" />
					</div>
				</div>
				<Skeleton className="h-10 w-full max-w-xl bg-rose-100" />
			</div>
			<div className="self-start">
				<Skeleton className="h-8 w-28 rounded-full bg-rose-100" />
			</div>
		</div>
	);
};

const SourceInfoSkeleton = () => {
	return (
		<div
			className="flex flex-col lg:flex-row items-center
      justify-between gap-4 text-sm text-muted-foreground mt-4 sm:mt-8"
		>
			<div
				className="flex items-center justify-center
        gap-2"
			>
				<Skeleton className="h-4 w-4 bg-rose-100" />
				<Skeleton className="h-4 w-40 bg-rose-100" />
			</div>

			<div className="flex gap-2">
				<Skeleton className="h-8 w-32 rounded-full bg-rose-100" />
				<Skeleton className="h-8 w-32 rounded-full bg-rose-100" />
			</div>
		</div>
	);
};

const ProgressBarSkeleton = () => {
	return (
		<div className="backdrop-blur-xs pt-4 pb-2 border-b border-rose-50/10">
			<div className="px-4 flex gap-1.5">
				{[...Array(6)].map((_, index) => (
					<div
						key={index}
						className="flex-1 h-1.5 rounded-full bg-rose-500/10 overflow-hidden"
					>
						<Skeleton
							className={`h-full bg-rose-200 transition-all duration-500 ${
								index === 1
									? 'w-full'
									: 'w-0'
							}`}
						/>
					</div>
				))}
			</div>
		</div>
	);
};
