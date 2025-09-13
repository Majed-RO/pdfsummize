import type { Metadata } from 'next';
import { Source_Sans_3 as FontSans } from 'next/font/google';
import './globals.css';
import Header from '@/components/common/header';
import Footer from '@/components/common/footer';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'sonner';
import { ORIGIN_URL } from '@/lib/helpers';
import PaymentAlert from '@/components/common/payment-alert';
import { Suspense } from 'react';

/* import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin';
import { extractRouterConfig } from 'uploadthing/server';
import { ourFileRouter } from './api/uploadthing/core'; */

const fontSans = FontSans({
	variable: '--font-sans',
	subsets: ['latin'],
	weight: ['200', '300', '400', '500', '600', '700', '800', '900']
});

export const metadata: Metadata = {
	title: 'PDFSummize',
	description:
		'Save hours of reading time. Transform lengthy PDFs into clear, accurate summaries in seconds with our advanced AI technology',
	openGraph: {
		images: [
			{
				url: '/opengraph-image.png'
			}
		]
	},
	metadataBase: new URL(ORIGIN_URL!),
	alternates: {
		canonical: ORIGIN_URL
	}
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body
					className={`${fontSans.variable} font-sans antialiased`}
				>
					<div className="relative flex flex-col min-h-screen">
						<Header />
						<main className="flex-1">
							<div className="container">
                {/* wrap the component in a Suspense boundary. This tells Next.js to delay the rendering of this component until the browser is ready, preventing the server from trying to prerender it.  */}
								<Suspense
									fallback={
										null
									}
								>
									<PaymentAlert />
								</Suspense>
							</div>
							{/* <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} /> */}
							{children}
						</main>
						<Footer />
					</div>
					<Toaster
						richColors
						position="top-right"
						toastOptions={{
							classNames: {
								toast: 'gap-3' // or add this in ToastViewport
							}
						}}
					/>
				</body>
			</html>
		</ClerkProvider>
	);
}
