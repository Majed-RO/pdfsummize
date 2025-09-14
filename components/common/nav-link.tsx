'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface NavLinkProps {
	href: string;
	children: React.ReactNode;
	className?: string;
	label?: string; // descriptive label for accessibility
}

function NavLink({ href, children, className, label }: NavLinkProps) {
	const pathname = usePathname();
	const isActive =
		pathname === href ||
		(href !== '/' && pathname.startsWith(href));

	// If no explicit label is passed, fallback to href
	const accessibleLabel = label || href.replace('/', '') || 'Home';

	return (
		<Link
			href={href}
      aria-label={accessibleLabel}
      title={accessibleLabel}
			className={cn(
				'transition-colors text-sm duration-200 text-gray-600 hover:text-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-50',
				className,
				isActive && 'text-rose-500'
			)}
		>
			{children}
		</Link>
	);
}

export default NavLink;
