'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog';
import { Trash2, X } from 'lucide-react';
import { deleteSummaryAction } from '@/actions/summary-actions';
import { CustomToast } from '../common/custom-toast';

interface DeleteButtonProps {
	summaryId: string;
}
export default function DeleteButton({ summaryId }: DeleteButtonProps) {
	const [open, setOpen] = React.useState(false);
	const [isPending, startTransition] = React.useTransition();

	const handleDelete = async (event: React.FormEvent) => {
		// lets you render a part of the UI in the background.
		startTransition(async () => {
			const deletedSummary = await deleteSummaryAction({
				summaryId
			});

			if (!deletedSummary.success) {
				CustomToast('Error', {
					description: 'Failed to delete summary'
				});
			}
			setOpen(false);
		});
	};

	return (
		<div className="w-full p-6 flex justify-center">
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button
						variant={'ghost'}
						size="icon"
						className="text-gray-400 bg-gray-50 border
        border-gray-200 hover:text-rose-600 hover:bg-rose-50"
					>
						<Trash2 className="w-4 h-4" />
					</Button>
				</DialogTrigger>
				{/* [&>button]:bg-transparent to change the background color of close tbn (x) in the top right
        [&>button]:hidden: This is a Tailwind CSS arbitrary variant.

        1- & refers to the parent element, which is DialogContent.

        2- > targets direct children of the parent.

        3- button targets any <button> elements.

        This rule essentially says, "for this DialogContent element, hide any button that is a direct child." Since the default close button is a direct child.
        */}
				<DialogContent className="sm:max-w-[425px] [&>button]:bg-transparent">
					<form onSubmit={handleDelete}>
						<DialogHeader className="mb-8">
							<DialogTitle>
								Delete Summary
							</DialogTitle>
							<DialogDescription>
								Are you sure you
								want to delete
								this summary?
								This action
								cannot be
								undone.
							</DialogDescription>
						</DialogHeader>

						<DialogFooter>
							<DialogClose asChild>
								<Button
									variant="ghost"
									// size={'icon'}
									className="bg-gray-50 border border-gray-200 hover:text-gray-600 hover:bg-gray-100"
								>
									Cancel
								</Button>
							</DialogClose>
							<Button type="submit">
								{isPending
									? 'Deleting...'
									: 'DELETE'}
							</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
		</div>
	);
}
