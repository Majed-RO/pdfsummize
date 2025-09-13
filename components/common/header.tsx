import { FileText, Upload } from 'lucide-react';
import { Button } from '../ui/button';
import NavLink from './nav-link';
import { SITE_PREFIX, SITE_SUFFIX } from '@/lib/constants';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import PlanBadge from './plan-badge';

export default function Header() {
	return (
		<nav className="container flex items-center justify-between py-4 lg:px-8 px-2 mx-auto">
			<div className="flex lg:flex-1">
				<NavLink
					href="/"
					className="flex items-center gap-1 lg:gap-2 shrink-0"
				>
					<FileText className="size-5 lg:size-8 text-gray-900 hover:rotate-12 transform transition  duration-200 ease-in-out" />
					<span className="text-xl lg:text-2xl font-extrabold text-gray-900">
						{SITE_PREFIX}
						<span className="inline-block text-rose-500 hover:translate-x-1 transform transition  duration-200 ease-in-out">
							{SITE_SUFFIX}
						</span>
					</span>
				</NavLink>
			</div>

			<div className="hidden sm:flex lg:justify-center gap-4 lg:gap-12 lg:items-center">
				<NavLink
					href="/#pricing"
					className="hidden sm:block"
				>
					Pricing
				</NavLink>
				<SignedIn>
					<NavLink href="/dashboard">
						Your Summaries
					</NavLink>
				</SignedIn>
			</div>

			<div className="flex lg:justify-end lg:flex-1">
				<SignedIn>
					<div className="flex gap-2 items-center">
						<NavLink href="/upload">
							<div className="flex items-center">
								<span className="text-sm hidden sm:inline-block">
									Upload
									PDF
								</span>{' '}
								<Upload
									className="ml-1 w-4 h-4"
									color="red"
									strokeWidth={
										2
									}
								/>
							</div>
						</NavLink>
						<PlanBadge />
						<UserButton />
					</div>
				</SignedIn>

				<SignedOut>
					<NavLink href="/sign-in">
						Sign In
					</NavLink>
				</SignedOut>

				<div></div>
			</div>
		</nav>
	);
}
