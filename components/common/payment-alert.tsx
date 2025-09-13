'use client';

import React, { useEffect, useState } from 'react';
import { MotionDiv } from './motion-wrapper';
import { itemVariants } from '@/lib/motions';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { AlertTriangleIcon } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

interface MessageInterface {
	title: string;
	description: string;
}

const PaymentAlert = () => {
	const searchParams = useSearchParams();
	const { user, isLoaded } = useUser();
	const [message, setMessage] = useState<MessageInterface>();

	const paymentsuccess = searchParams.get('paymentsuccess');

	useEffect(() => {
      // Only proceed if paymentsuccess is in the URL and user data is loaded
		if (paymentsuccess && isLoaded) {
			if (user?.id) {
				setMessage({
					title: 'Payment Success',
					description:
						'Your payment has been successfully processed. Thank you for your purchase!'
				});
			} else {
				setMessage({
					title: 'Payment Success',
					description:
						'Your payment has been successfully processed. To begin uploading your PDFs, please sign in or sign up using the email address you provided for this purchase.'
				});
			}
		}
	}, [paymentsuccess, isLoaded, user?.id]);

	if (!message) return null; // Only render if a message is set

	return (
		<MotionDiv
			variants={itemVariants}
			initial="hidden"
			animate="visible"
			className="w-full mt-6 mb-2"
		>
			<Alert className="border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950/30 dark:text-yellow-200 [&>svg]:text-yellow-600 dark:[&>svg]:text-yellow-400">
				<AlertTriangleIcon />
				<AlertTitle>{message?.title}</AlertTitle>
				<AlertDescription className="text-yellow-700 dark:text-yellow-300">
					{message?.description}
				</AlertDescription>
			</Alert>
		</MotionDiv>
	);
};

export default PaymentAlert;
