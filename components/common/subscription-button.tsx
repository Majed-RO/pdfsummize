import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { createStripePortalSession } from '@/actions/stripe-actions';
import { getCustomerForActiveUser } from '@/lib/user';
import { currentUser } from '@clerk/nextjs/server';
import { Button } from '../ui/button';

const SubscriptionButton = async ({
	planPaymentLink,
	planPriceId,
	planId
}: {
	planPaymentLink: string;
	planPriceId: string;
	planId: string;
}) => {
	const user = await currentUser();

	// If the user is not logged in, they can only "Buy Now"
	if (!user) {
		return (
			<Link
				href={planPaymentLink}
				className={cn(
					// Base styling for the button
					'w-full rounded-full flex items-center justify-center gap-2 py-2 border-2 text-white',
					// Pro plan specific colors
					planId === 'pro'
						? 'bg-gradient-to-r from-rose-800 to-rose-500 hover:from-rose-500 hover:to-rose-800 border-rose-900'
						: // Standard plan colors
						  'bg-gradient-to-r from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-400 border-rose-100'
				)}
			>
				Buy Now <ArrowRight size={18} />
			</Link>
		);
	}

	// Ensure a valid email exists before proceeding
	const email = user.emailAddresses?.[0]?.emailAddress;
	if (!email) {
		console.error('User has no primary email address.');
		// Handle this case gracefully, maybe return a disabled button or a link to a profile page.
		return <Button disabled>Error: No email found.</Button>;
	}

	const { customerId, priceId } = await getCustomerForActiveUser(email);

	const isCurrentPlan = planPriceId === priceId;

	const getButtonContent = () => {
		if (isCurrentPlan) {
			return 'Current Plan';
		}
		return 'Buy Now';
	};

	const getButtonHref = async () => {
		// If the user is on the current plan, the link should be inactive
		if (isCurrentPlan) {
			// The user is already subscribed, so we should allow them to manage their subscription
			// via the Stripe Portal, regardless of the 'Current Plan' status.
			if (customerId) {
				const result = await createStripePortalSession(
					customerId
				);
				return result?.url || '#';
			}
			return '#';
		}

		// If the user is logged in but not on the current plan,
		// they can either be buying a new plan or changing their plan.
		if (customerId) {
			// User is an existing customer but not on the current plan, redirect to the portal
			const result = await createStripePortalSession(
				customerId
			);
			return result?.url || planPaymentLink;
		}

		// User is logged in but has no customerId, redirect to the payment link
		return planPaymentLink;
	};

	// Define a single set of classes that can be reused
	const buttonClasses = cn(
		'w-full rounded-full flex items-center justify-center gap-2 py-2 border-2 text-white',
		isCurrentPlan
			? 'bg-gray-400! cursor-not-allowed pointer-events-none'
			: planId === 'pro'
			? 'bg-gradient-to-r from-rose-800 to-rose-500 hover:from-rose-500 hover:to-rose-800 border-rose-900'
			: 'bg-gradient-to-r from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-400 border-rose-100'
	);

	const href = await getButtonHref();

	return (
		<Button asChild disabled={isCurrentPlan}>
			<a href={href} className={buttonClasses}>
				{getButtonContent()} <ArrowRight size={18} />
			</a>
		</Button>
	);
};

export default SubscriptionButton;
