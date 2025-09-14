'use client';

import React from 'react';
import NavLink from './nav-link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Crown, DollarSign, Files, Upload } from 'lucide-react';
// import PlanBadge from './plan-badge';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';

const HeaderNav = ({
	priceId,
	planName
}: {
	priceId: string;
	planName: string;
}) => {
	return (
		<div className="flex items-center justify-between gap-4 lg:gap-12 overflow-hidden">
			{/* <div className="hidden sm:flex lg:justify-center gap-4 lg:gap-12 lg:items-center"> */}
			{/* <div> */}
			<NavLink href="/#pricing" className="flex items-center">
				<SignedIn>
					<span className="hidden sm:inline-block">
						Pricing
					</span>
					<DollarSign
						className="ml-1 w-4 h-4 sm:hidden"
						// strokeWidth={2}
					/>
				</SignedIn>
				<SignedOut>
					<span className="">Pricing</span>
				</SignedOut>
			</NavLink>
			<SignedIn>
				<NavLink
					href="/dashboard"
					className="flex items-center "
				>
					<span className="hidden sm:inline-block">
						Your Summaries
					</span>
					<Files
						className="ml-1 w-4 h-4 sm:hidden"
						// strokeWidth={2}
					/>
				</NavLink>
			</SignedIn>
			{/* </div> */}

			{/* <div className="flex lg:justify-end lg:flex-1"> */}
			<SignedIn>
				<div className="flex items-center gap-4 lg:gap-12">
					<NavLink href="/upload">
						<div className="flex items-center">
							<span className="text-sm hidden sm:inline-block">
								Upload PDF
							</span>{' '}
							<Upload
								className="ml-1 w-4 h-4 sm:hidden"
								// strokeWidth={2}
							/>
						</div>
					</NavLink>
					{/* <PlanBadge /> */}
					<div className="flex items-center gap-4">
						<Badge
							variant="outline"
							className={cn(
								'ml-2 bg-linear-to-r from-amber-100 to-amber-200 border-amber-300 hidden lg:flex flex-row items-center',
								priceId &&
									'from-red-100 to-red-200 border-red-300'
							)}
						>
							<Crown
								className={cn(
									'w-3 h-3 mr-1 text-amber-600',
									priceId &&
										'text-red-600'
								)}
							/>
							{planName}
						</Badge>
						<UserButton />
					</div>
				</div>
			</SignedIn>

			<SignedOut>
				<NavLink href="/sign-in">Sign In</NavLink>
			</SignedOut>
			{/* </div> */}
		</div>
	);
};

export default HeaderNav;
