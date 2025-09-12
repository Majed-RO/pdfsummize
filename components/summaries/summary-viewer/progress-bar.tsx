import { cn } from '@/lib/utils';
import React from 'react';

const ProgressBar = ({
	total,
	current
}: {
	total: number;
	current: number;
}) => {
	return (
		<div className="backdrop-blur-xs pt-4 pb-2 border-b border-rose-50/10">
			<div className="px-4 flex gap-1.5">
				{[...Array(total)].map((_, index) => (
					<div
						key={index}
						className="flex-1 h-1.5 rounded-full bg-rose-500/10 overflow-hidden"
					>
						<div
							className={cn(
								`h-full bg-linear-to-r from-gray-500 to-rose-600 transition-all duration-500`,
								index ===
									current
									? 'w-full'
									: current >
									  index
									? 'w-full opacity-10'
									: 'w-0'
							)}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default ProgressBar;

/* 
 <div className="flex w-full space-x-1 mb-6">

 index ===
								current
									? 'bg-rose-500'
									: 'bg-rose-200'
*/

/* 
return (
		<div className="bg-background/80 backdrop-blur-xs pt-4 pb-2 border-b border-rose-50/10">
			<div className="px-4 flex gap-1.5">
				{[...Array(total)].map((_, index) => (
					<div
						key={index}
						className="flex-1 h-1.5 rounded-full bg-rose-500/10 overflow-hidden"
					>
						<div
							className={cn(
								`h-full bg-linear-t-r from-gray-500 to-rose-600 transition-all duration-500`,
								index ===
									current
									? 'w-full'
									: current >
									  index
									? 'w-full opacity-10'
									: 'w-0'
							)}
						/>
					</div>
				))}
			</div>
		</div>
	);

*/
