import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import BgGradient from './bg-gradient';
import { Button } from '../ui/button';

export default function UpgradeRequired() {
	return (
		<div className="relative min-h-[50vh]">
			<BgGradient className="from-rose-400 via-rose-300 to-orange-200" />
			<div className="container px-8 py-16">
				<div className="flex flex-col items-center justify-center gap-8 text-center mx-auto max-w-2xl">
					<div className="flex items-center gap-2 text-rose-500">
						<Sparkles className="w-6 h-6" />
						<span className="text-sm font-medium uppercase tracking-wider">
							Premium Feature
						</span>
					</div>
					<h1>
						<p className="text-lg leading-8 text-gray-600 border-2 border-rose-200 bg-white/50 backdrop-blur-xs rounded-lg p-6 border-dashed max-w-xl">
							You need to upgrade to
							the Basic Plan or the
							Pro Plan to access this
							feature ❤️
						</p>
					</h1>
					<Button asChild>
						<Link
							href="/#pricing"
							className="flex gap-2 items-center"
						>
							View Pricing Plans{' '}
							<ArrowRight className="w-4 h-4" />
						</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}
