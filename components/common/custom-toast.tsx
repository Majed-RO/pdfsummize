import { toast } from 'sonner';
// import { Heart } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils';

export function CustomToast(
	message: string,
	options: {
		description?: string;
		icon?: string | React.ComponentType<{ className?: string }>;
		className?: string;
		duration?: number;
	} = {}
) {
	const showIcon = (icon: any) => {
		let NewIcon;
		if (typeof icon === 'string') {
			return <span className="size-8">icon</span>;
		} else {
			NewIcon = icon;
			return <NewIcon className="h-8 w-8" />;
		}
	};

	const { description, icon, className, duration = 2000 } = options;

	toast.custom(
		t => (
			<div
				/* bg-gradient-to-r bg-linear-to-r from-slate-900 to-rose-500 text-white */
				className={cn(
					'p-4 rounded-lg shadow-lg',
					className
				)}
			>
				<div className="flex  gap-2">
					{icon && showIcon(icon)}
					<div className="flex flex-col ">
						<div>
							<div className="font-semibold">
								{message}
							</div>
							{description && (
								<div className="text-sm opacity-90">
									{
										description
									}
								</div>
							)}
						</div>
						<button
							onClick={() =>
								toast.dismiss(t)
							}
							className=" ml-auto bg-white/20 hover:bg-white/30 rounded px-2 py-1 text-xs border"
						>
							Close
						</button>
					</div>
				</div>
			</div>
		),
		{ duration: duration }
	);
}
