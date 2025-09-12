import type { Metadata } from 'next';
import { Source_Sans_3 as FontSans } from 'next/font/google';
import './globals.css';
import Header from '@/components/common/header';
import Footer from '@/components/common/footer';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'sonner';

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
	description: 'AI-Powered Document Clarity'
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
