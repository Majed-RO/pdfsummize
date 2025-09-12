import { SITE_NAME } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
	return (
		<footer className="bg-white border-t border-gray-100 py-8">
			<div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row md:justify-between items-center md:items-start">
				{/* Left: Avatar and Author */}
				<div className="flex flex-col items-center md:items-start mb-8 md:mb-0">
					{/*  <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-purple-200 mb-2">
            <Image
              src="/path/to/avatar.jpg" // Replace with your avatar path
              alt="Ankita"
              width={64}
              height={64}
              className="object-cover"
            />
          </div> */}
					<p className="text-gray-700 text-sm">
						Made by{' '}
						<span className="font-semibold underline">
							Majed
						</span>{' '}
						<span className="text-orange-500">
							🧡
						</span>
					</p>
					<p className="text-xs text-gray-500 mt-2">
						© 2025 {SITE_NAME}. All Rights
						Reserved.
					</p>
				</div>
				{/* Right: Links */}
				<div className="flex flex-col sm:flex-row gap-12 w-full md:w-auto justify-center">
					<div>
						<h4 className="font-semibold text-gray-700 mb-2 uppercase text-sm">
							About
						</h4>
						<ul>
							<li>
								<Link
									href="#"
									className="text-gray-600 hover:underline text-sm"
								>
									Contact
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h4 className="font-semibold text-gray-700 mb-2 uppercase text-sm">
							Resources
						</h4>
						<ul className="space-y-1">
							<li>
								<Link
									href="#hero-section"
									className="text-gray-600 hover:underline text-sm"
								>
									Try{' '}
									{
										SITE_NAME
									}
								</Link>
							</li>
							<li>
								<Link
									href="#how-it-works"
									className="text-gray-600 hover:underline text-sm"
								>
									How it
									works
								</Link>
							</li>
							<li>
								<Link
									href="#pricing"
									className="text-gray-600 hover:underline text-sm"
								>
									Pricing
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
}
