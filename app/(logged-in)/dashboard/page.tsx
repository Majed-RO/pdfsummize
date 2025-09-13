import BgGradient from '@/components/common/bg-gradient';
import {
	MotionDiv,
	MotionH1,
	MotionP
} from '@/components/common/motion-wrapper';
import NoSummaries from '@/components/summaries/no-summaries';
import SummaryCard from '@/components/summaries/summary-card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { itemVariants } from '@/lib/motions';
import { getSummaries } from '@/lib/summaries';
import { hasReachedUploadLimit } from '@/lib/user';
import { currentUser } from '@clerk/nextjs/server';
import { AlertTriangleIcon, ArrowRight, Plus } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function DashboardPage({
	searchParams
}: {
	searchParams: Promise<{
		message?: string;
	}>;
}) {
	const { message } = await searchParams;

	const user = await currentUser();

	const userId = user?.id;

	if (!userId) return redirect('/sign-in');

	const { hasReachedLimit, uploadLimit } = await hasReachedUploadLimit(
		userId,
		user.emailAddresses[0]?.emailAddress
	);

	const summaries = await getSummaries(userId);

	return (
		<main className="min-h-screen">
			<BgGradient className="from-emerald-200 via-teal-200 to-cyan-200" />
			<div className="container mx-auto flex flex-col gap-4">
				<div className="px-2 py-12 sm:py-24">
					<div className="flex gap-4 mb-8 justify-between">
						<div className="flex flex-col gap-2">
							<MotionH1
								variants={
									itemVariants
								}
								initial="hidden"
								whileInView="visible"
								className="text-4xl font-bold tracking-tight bg-linear-to-r from-gray-600 to-gray-900 bg-clip-text text-transparent"
							>
								Your Summaries
							</MotionH1>
							<MotionP
								variants={
									itemVariants
								}
								initial="hidden"
								animate="visible"
								className="text-gray-600"
							>
								Transform your
								PDFs into
								concise,
								actionable
								insights
							</MotionP>
						</div>
						{!hasReachedLimit && (
							<MotionDiv
								variants={
									itemVariants
								}
								initial="hidden"
								animate="visible"
								whileHover={{
									scale: 1.05
								}}
								className="self-start"
							>
								<Button
									variant={
										'link'
									}
									className="bg-linear-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 hover:scale-105 transition-all duration-300 group hover:no-underline"
								>
									<Link
										href="/upload"
										className="flex items-center text-white"
									>
										<Plus className="w-5 h-5 mr-2" />
										New
										Summary
									</Link>
								</Button>
							</MotionDiv>
						)}
					</div>
					{message === 'upload_access_denied' && (
						<MotionDiv
							variants={itemVariants}
							initial="hidden"
							animate="visible"
							className="w-full mb-6"
						>
							<Alert className="border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950/30 dark:text-yellow-200 [&>svg]:text-yellow-600 dark:[&>svg]:text-yellow-400">
								<AlertTriangleIcon />
								<AlertTitle>
									Upload
									page is
									unreachable!
								</AlertTitle>
								<AlertDescription className="text-yellow-700 dark:text-yellow-300">
									You
									don't
									have
									permission
									to view
									that
									page.
									Please
									upgrade
									your
									plan.
								</AlertDescription>
							</Alert>
						</MotionDiv>
					)}
					{hasReachedLimit && (
						<MotionDiv
							variants={itemVariants}
							initial="hidden"
							animate="visible"
							className="mb-6"
						>
							<div className="bg-rose-50 border border-rose-200 rounded-lg p-4 text-rose-800">
								<p className="text-sm">
									You have
									reached
									the
									limit of{' '}
									{
										uploadLimit
									}{' '}
									uploads
									on the
									basic
									plan.{' '}
									<Link
										href={
											'/#pricing'
										}
										className="text-rose-800 underline font-medium underline-offset-4 inline-flex items-center"
									>
										Click
										here
										to
										upgrade
										to
										Pro{' '}
										<ArrowRight className="w-4 h-4 inline-block" />{' '}
									</Link>
									for
									unlimited
									uploads
									and more
									features.
								</p>
							</div>
						</MotionDiv>
					)}

					<div className="mb-6"></div>

					{/* Map through summaries here */}
					{summaries.length > 0 ? (
						<div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 sm:px-0">
							{summaries.map(
								(
									summary,
									index
								) => (
									<SummaryCard
										key={
											index
										}
										summary={
											summary
										}
									/>
								)
							)}
						</div>
					) : (
						<NoSummaries />
					)}
				</div>
			</div>
		</main>
	);
}
