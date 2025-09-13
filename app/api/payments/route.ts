import { isDev } from '@/lib/helpers';
import {
	handleCheckoutSessionCompleted,
	handleSubscriptionDeleted
} from '@/lib/payments';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(
	isDev
		? process.env.STRIPE_SECRET_KEY_TEST!
		: process.env.STRIPE_SECRET_KEY_LIVE!
);

export const POST = async (req: NextRequest) => {
	const payload = await req.text();
	const sig = req.headers.get('stripe-signature');

	let event;

	const endpointSecret = isDev
		? process.env.STRIPE_WEBHOOK_SECRET_TEST!
		: process.env.STRIPE_WEBHOOK_SECRET_LIVE!;

	try {
		event = stripe.webhooks.constructEvent(
			payload,
			sig!,
			endpointSecret
		);

		switch (event.type) {
			case 'checkout.session.completed':
				console.log('Checkout Session Completed');
				const sessionId = event.data.object.id;

				const session =
					await stripe.checkout.sessions.retrieve(
						sessionId,
						{
							expand: ['line_items']
						}
					);

				await handleCheckoutSessionCompleted({
					session,
					stripe
				});

				break;
			case 'customer.subscription.deleted':
				console.log('Customer Subscription Deleted');

				const subscriptionId = event.data.object.id;

				await handleSubscriptionDeleted({
					subscriptionId,
					stripe
				});

				break;
			default:
				console.log(
					`Unhandled event type ${event.type}`
				);
		}
	} catch (err) {
		return NextResponse.json(
			{ error: 'Failed to trigger webhook', err },
			{ status: 400 }
		);
	}

	return NextResponse.json({
		status: 'success'
		// message: 'Hello from Stripe API',
	});
};
