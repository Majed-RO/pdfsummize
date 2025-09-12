import React, { useRef, useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';
import { MotionDiv } from '@/components/common/motion-wrapper';

// Define the props for the reusable component.
// The `children` prop allows you to pass any React content.
interface ScrollableSectionProps {
	children: React.ReactNode;
	maxHeight?: string;
}

// The reusable ScrollableSection component
export default function ScrollableSection({
	children,
	maxHeight = 'h-[60vh] sm:h-[70vh] md:h-[80vh]'
}: ScrollableSectionProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [showScrollArrow, setShowScrollArrow] = useState(false);

	const checkScroll = () => {
		const container = containerRef.current;
		if (container) {
			// Use Math.round to make the "at bottom" check more robust against floating point issues.
			const isAtBottom =
				Math.round(
					container.scrollTop +
						container.clientHeight
				) >= container.scrollHeight;
			setShowScrollArrow(!isAtBottom);
		}
	};

	const handleArrowClick = () => {
		const container = containerRef.current;
		if (container) {
			// Change to scroll by a fixed, smaller amount (200px) to prevent reaching the end too quickly
			const scrollAmount = Math.min(
				200,
				container.scrollHeight -
					container.scrollTop -
					container.clientHeight
			);

			container.scrollBy({
				top: scrollAmount,
				behavior: 'smooth'
			});
		}
	};

	useEffect(() => {
		checkScroll();
	}, [children]); // Re-check scroll when content changes

	return (
		<div
			ref={containerRef}
			onScroll={checkScroll}
			className={`${maxHeight} overflow-y-auto scrollbar-hide relative transition-all duration-300`}
		>
			{/*
        This is where the passed-in content will be rendered.
      */}
			{children}

			{/* The scroll arrow, conditionally rendered based on the state. */}
			<MotionDiv
				initial={{ opacity: 0 }}
				animate={{
					opacity: 1,
					transition: {
						duration: 0.2,
						delay: 0.5
					}
				}}
			>
				<div
					onClick={handleArrowClick}
					className={`
          absolute bottom-2 right-1
          bg-gray-200/10 rounded-full p-2.5 shadow-lg transition-opacity duration-300 cursor-pointer
          ${
			showScrollArrow
				? 'opacity-90 animate-bounce-slow'
				: 'opacity-0 pointer-events-none'
		}
        `}
				>
					<ArrowDown
						className="w-3 h-3"
						color="red"
					/>
				</div>
			</MotionDiv>
			{/* Inline CSS for the bounce animation */}
			<style>
				{`
          @keyframes bounce-slow {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(2px);
            }
          }
          .animate-bounce-slow {
            animation: bounce-slow 2s infinite;
          }
        `}
			</style>
		</div>
	);
}
