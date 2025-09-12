import { User } from '@clerk/nextjs/server';
import { plans } from './constants';
import getDbConnection from './db';
import { getUserUploadCount } from './summaries';

export async function getPriceIdForActiveUser(email: string) {
	const sql = await getDbConnection();

	const query =
		await sql`SELECT price_id FROM users where email = ${email} AND status = 'active'`;

	return query?.[0]?.price_id || null;
}

export async function hasReachedUploadLimit(userId: string, email: string) {
	const uploadCount = await getUserUploadCount(userId);

	const priceId = await getPriceIdForActiveUser(email);

	/* const isPro =
		plans.find(plan => plan.priceId === priceId)?.id === 'pro';

  const uploadLimit: number = isPro ? 1000 : 5; */

	const uploadLimit: number =
		plans.find(plan => plan.priceId === priceId)?.uploadLimit || 0;

	return { hasReachedLimit: uploadCount >= uploadLimit, uploadLimit };
}

export async function hasActivePlan(email: string) {
	/* const sql = await getDbConnection();

	const query = await sql`SELECT price_id, status FROM users where email = ${email} AND status = 'active' AND price_id IS NOT NULL`;
 */
	return true;
}

export async function getSubscriptionStatus(user: User) {
	// if the user has price_id and status == active, then he/she has an active subscription!
	const hasActiveSubscription = await hasActivePlan(
		user.emailAddresses[0].emailAddress
	);

	return hasActiveSubscription;
}
