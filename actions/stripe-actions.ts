'use server';

import Stripe from 'stripe';
import { isDev } from '../lib/helpers';
import { revalidatePath } from 'next/cache';
import { currentUser } from '@clerk/nextjs/server';


const stripe = new Stripe(
	isDev
		? process.env.STRIPE_SECRET_KEY_TEST!
		: process.env.STRIPE_SECRET_KEY_LIVE!
);

export async function createCheckoutSession(customerId: string) {
	try {
		// Get customerId from the form data or other context
		// const customerId = formData.get('customerId');

		// {CHECKOUT_SESSION_ID} is inside a string, so TypeScript won’t look for a variable with that name.
		//Stripe will replace it at runtime with the real session ID, like cs_test_1234.

		const session: Stripe.Checkout.Session =
			await stripe.checkout.sessions.create({
				mode: 'subscription',
				payment_method_types: ['card'],
				line_items: [
					{
						price: 'price_123...', // Your Price ID
						quantity: 1
					}
				],
				customer: customerId,
				success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
				cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/`
			});

		return { sessionId: session.id };
	} catch (error: any) {
		return { error: error.message };
	}
}


export async function createStripePortalSession(customerId:string) {
	 
  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
    });

    // You might want to revalidate a path to update the UI after the action
    // revalidatePath('/dashboard');

    return { url: session.url };
  } catch (error) {
    console.error('Error creating Stripe portal session:', error);
    return { error: 'Failed to create session' };
  }
}

/* 
Call the Server Action from a Client Component: In your client-side component, you can call this createCheckoutSession function. Since Server Actions can be called from client components, the flow is much cleaner.

JavaScript

// components/CheckoutButton.js
'use client';

import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { createCheckoutSession } from './actions'; // Import the server action

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function CheckoutButton({ customerId }) {
    const handleClick = async () => {
        const formData = new FormData();
        formData.append('customerId', customerId);

        const { sessionId, error } = await createCheckoutSession(formData);

        if (error) {
            console.error(error);
            return;
        }

        const stripe = await stripePromise;
        const { error: redirectToError } = await stripe.redirectToCheckout({
            sessionId,
        });

        if (redirectToError) {
            console.error(redirectToError);
        }
    };

    return (
        <button onClick={handleClick}>
            Subscribe with Server Action
        </button>
    );
}
*/
