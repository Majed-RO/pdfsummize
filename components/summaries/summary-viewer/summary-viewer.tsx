'use client';

import React, { useState } from 'react';
import ProgressBar from './progress-bar';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader
} from '@/components/ui/card';
import NavigationControls from './navigation-controls';
import { extractSections } from '@/lib/utils';
import ScrollableSection from './scrollable-section';
import {
	MotionDiv,
	MotionLi,
	MotionUl
} from '@/components/common/motion-wrapper';
import { containerVariants, itemVariants } from '@/lib/motions';

const SummaryViewer = ({ summary }: { summary: string }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const sections = extractSections(summary);

	const nextItem = () => {
		if (currentIndex < sections.length - 1) {
			setCurrentIndex(currentIndex + 1);
		}
	};

	const prevItem = () => {
		if (currentIndex > 0) {
			setCurrentIndex(currentIndex - 1);
		}
	};

	return (
		<Card className="relative px-2 h-[600px] w-full md:w-[450px]   xl:w-[600px] overflow-hidden bg-linear-to-br from-background via-background/95 to-rose-500/5 backdrop-blur-lg shadow-2xl rounded-3xl border border-rose-500/10">
			<CardHeader>
				<ProgressBar
					total={sections.length}
					current={currentIndex}
				/>
			</CardHeader>

			<CardContent>
				{/* Content Box with transition */}
				{/* pt-12 sm:pt-16 */}
				<div className="h-full pb-20 sm:pb-24">
					<MotionDiv
						key={currentIndex}
						variants={itemVariants}
						/* initial={{ opacity: 0}}
						whileInView={{
							opacity: 1
						}}
						transition={{
							duration: 0.2,
							ease: 'easeInOut'
						}}
						exit={{ opacity: 0 }} */
						className="px-4 sm:px-6"
					>
						<div className="flex flex-col gap-2 mb-6 sticky top-0 pt-2 pb-4 bg-background/80 backdrop-blur-xs z-10">
							<h2 className="text-3xl lg:text-4xl font-bold text-center flex items-center justify-center gap-2">
								{
									sections[
										currentIndex
									].title
								}
							</h2>
						</div>
						<ScrollableSection maxHeight="h-[300px]">
							{/* <div className=""> */}
							<MotionUl
								variants={
									containerVariants
								}
								initial={
									'hidden'
								}
								animate="visible"
								exit={'exit'}
								className="flex flex-col gap-4 text-gray-700 pb-10"
							>
								{sections[
									currentIndex
								].content.map(
									(
										item,
										index
									) => (
										<MotionLi
											key={`${index}`}
											variants={
												itemVariants
											}
											className="rounded-lg border p-4 bg-gray-50"
										>
											{
												item
											}
										</MotionLi>
									)
								)}
							</MotionUl>
							{/* </div> */}
						</ScrollableSection>
					</MotionDiv>
				</div>
			</CardContent>
			<CardFooter>
				{/* Navigation */}
				<div className="w-full absolute bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-xs border-t border-rose-500/10">
					<NavigationControls
						contentItems={sections}
						prevItem={prevItem}
						currentIndex={currentIndex}
						nextItem={nextItem}
						setCurrentIndex={
							setCurrentIndex
						}
					/>
				</div>
			</CardFooter>
		</Card>
	);
};

export default SummaryViewer;
