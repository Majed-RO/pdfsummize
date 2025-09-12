import Link from 'next/link';
import { Card } from '../ui/card';
import DeleteButton from './delete-button';
import { FileText } from 'lucide-react';
import { formatFileName, formatFileNameToTitle } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { itemVariants } from '@/lib/motions';
import { MotionDiv } from '../common/motion-wrapper';

const SummaryHeader = ({
	fileUrl,
	title,
	createdAt
}: {
	fileUrl: string;
	title: string | null;
	createdAt: Date;
}) => {
	return (
		<div className="flex items-start gap-2 sm:gap-4">
			<FileText
				className="w-6 h-6 sm:w-8 sm:h-8
        text-rose-400 mt-1"
			/>
			<div className="flex-1 min-w-0">
				<h3
					className="text-base xl:text-lg font-semibold
          text-gray-900 truncate w-4/5"
				>
					{title || formatFileName(fileUrl)}
				</h3>
				<p className="text-sm text-gray-500">
					{formatDistanceToNow(createdAt, {
						addSuffix: true
					})}
				</p>
			</div>
		</div>
	);
};

const StatusBadge = ({ status }: { status: string }) => {
	let bgColor = 'bg-gray-200 text-gray-800';
	if (status === 'completed') {
		bgColor = 'bg-green-200 text-green-800';
	} else if (status === 'in-progress') {
		bgColor = 'bg-yellow-200 text-yellow-800';
	} else if (status === 'failed') {
		bgColor = 'bg-red-200 text-red-800';
	} else {
		bgColor = 'bg-yellow-100 text-yellow-800';
	}

	return (
		<span
			className={`px-3 py-1 text-xs font-medium rounded-full capitalize ${bgColor}`}
		>
			{status.replace('-', ' ').toUpperCase()}
		</span>
	);
};

export default function SummaryCard({ summary }: { summary: any }) {
	return (
		<MotionDiv
			variants={itemVariants}
			initial="hidden"
			animate="visible"
      whileHover={{scale: 1.01, transition:{duration: 0.2, ease: 'easeOut'}}}
		>
			<Card className="relative h-full">
				<div className="absolute top-2 right-2">
					<DeleteButton summaryId={summary.id} />
				</div>
				<Link
					href={`summaries/${summary.id}`}
					className="block p-4 sm:p-6"
				>
					<div className=" flex flex-col gap-3 sm:gap-4">
						<SummaryHeader
							fileUrl={
								summary.original_file_url
							}
							title={
								summary.title ||
								'Untitled Summary'
							}
							createdAt={
								summary.created_at
							}
						/>
						<p className="text-sm text-gray-600 line-clamp-2 sm:text-base pl-2">
							{summary.summary_text}
						</p>

						<div className="flex justify-between items-center mt-2 sm:mt-4">
							<StatusBadge
								status={
									summary.status
								}
							/>
						</div>
					</div>
				</Link>
			</Card>
		</MotionDiv>
	);
}
