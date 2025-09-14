import { FileText } from 'lucide-react';
import NavLink from './nav-link';
import { plans, SITE_PREFIX, SITE_SUFFIX } from '@/lib/constants';
// import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
// import PlanBadge from './plan-badge';
import HeaderNav from './header-nav';
import { currentUser } from '@clerk/nextjs/server';
import { getPriceIdForActiveUser } from '@/lib/user';

export default async function Header() {
	const user = await currentUser();

	const email = user?.emailAddresses?.[0]?.emailAddress;

	let priceId: string | null = null;

	if (email) {
		priceId = await getPriceIdForActiveUser(email);
	}

	let planName = 'Buy a plan';

	const plan = plans.find(plan => plan.priceId === priceId);

	if (plan) {
		planName = plan.name;
	}
	return (
		<nav className="container flex items-center justify-between py-4 lg:px-8 px-2 mx-auto">
			<div className="flex lg:flex-1">
				<NavLink
					href="/"
					className="flex items-center gap-1 lg:gap-2 shrink-0"
				>
					<FileText className="hidden sm:inline-block size-5 lg:size-8 text-gray-900 hover:rotate-12 transform transition  duration-200 ease-in-out" />
					<span className=" text-xl lg:text-2xl font-extrabold text-gray-900">
						{SITE_PREFIX}
						<span className="inline-block text-rose-500 hover:translate-x-1 transform transition  duration-200 ease-in-out">
							{SITE_SUFFIX}
						</span>
					</span>
				</NavLink>
			</div>

			<HeaderNav priceId={priceId!} planName={planName} />
		</nav>
	);
}
