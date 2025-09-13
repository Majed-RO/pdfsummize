import Stripe from 'stripe';
import getDbConnection from './db';

export async function handleCheckoutSessionCompleted({
	session,
	stripe
}: {
	session: Stripe.Checkout.Session;
	stripe: Stripe;
}) {
	const sql = await getDbConnection();

	const customerId = session.customer as string;
	const priceId = session.line_items?.data[0]?.price?.id;

	const customer = await stripe.customers.retrieve(customerId);

	if ('email' in customer && priceId) {
		const { email, name } = customer;

		await createOrUpdateUser({
			sql,
			email: email as string,
			fullName: name as string,
			customerId,
			priceId: priceId as string,
			status: 'active'
		});

		await createPayment({
			sql,
			session,
			priceId: priceId as string,
			userEmail: email as string
		});
	}
}

async function createOrUpdateUser({
	sql,
	email,
	fullName,
	customerId,
	priceId,
	status
}: {
	sql: any;
	email: string;
	fullName: string;
	customerId: string;
	priceId: string;
	status: string;
}) {
	try {
		const user =
			await sql`SELECT * FROM users WHERE email = ${email}`;
		if (user.length === 0) {
			//if there is no user with this email, then create new user
			await sql`INSERT INTO users (email, full_name, customer_id, price_id, status) VALUES (${email}, ${fullName}, ${customerId}, ${priceId}, ${status})`;
		} else {
			// there is a user with this email, then update customer id,  status and price_id
			const updatedUser =
				await sql`UPDATE users SET status = 'active', customer_id = ${customerId}, price_id = ${priceId} WHERE email = ${email}`;
		}
	} catch (error) {
		console.error('Error creating or updating user', error);
	}
}

async function createPayment({
	sql,
	session,
	priceId,
	userEmail
}: {
	sql: any;
	session: Stripe.Checkout.Session;
	priceId: string;
	userEmail: string;
}) {
	try {
		const { amount_total, id, customer_email, status } = session;

		await sql`INSERT INTO payments (amount, status, stripe_payment_id, price_id, user_email) VALUES (${amount_total}, ${status}, ${id}, ${priceId}, ${userEmail})`;
	} catch (error) {
		console.error('Error creating payment', error);
	}
}

export async function handleSubscriptionDeleted({
	subscriptionId,
	stripe
}: {
	subscriptionId: string;
	stripe: Stripe;
}) {
	try {
		const subscription = await stripe.subscriptions.retrieve(
			subscriptionId
		);

		const sql = await getDbConnection();

		const updatedUser =
			await sql`UPDATE users SET status = 'cancelled', price_id = '' WHERE customer_id = ${subscription.customer}`;

		console.log('Subscription canceled successfully');
	} catch (error) {
		console.error('Error handling subscription deleted', error);
		throw error;
	}
}
