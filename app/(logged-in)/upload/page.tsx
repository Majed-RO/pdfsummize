import BgGradient from '@/components/common/bg-gradient';
import { MotionDiv } from '@/components/common/motion-wrapper';
import UploadForm from '@/components/upload/upload-form';
import UploadHeader from '@/components/upload/upload-header';
import { containerVariants } from '@/lib/motions';
import { hasReachedUploadLimit } from '@/lib/user';
import { delay } from '@/lib/utils';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import React from 'react';

export const maxDuration = 60;

const UploadPage = async () => {
	const user = await currentUser();

	const userId = user?.id;

	if (!userId) return redirect('/sign-in');

	const { hasReachedLimit, uploadLimit } = await hasReachedUploadLimit(
		userId,
		user.emailAddresses[0]?.emailAddress
	);

	if (hasReachedLimit)
		return redirect('/dashboard?message=upload_access_denied');

  // await delay(3000);

	return (
		<section className="min-h-screen">
			<BgGradient />
			<MotionDiv
				variants={containerVariants}
				initial="hidden"
				animate="visible"
				className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8"
			>
				<div className="flex flex-col gap-6 items-center justify-center text-center">
					<UploadHeader />
					<UploadForm />
				</div>
			</MotionDiv>
		</section>
	);
};

export default UploadPage;
