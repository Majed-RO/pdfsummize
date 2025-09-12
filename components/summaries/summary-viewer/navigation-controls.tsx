import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';

interface NavigationControlsProps {
	contentItems: any;
	prevItem: () => void;
	currentIndex: number;
	nextItem: () => void;
	setCurrentIndex: (index: number) => void;
}

const NavigationControls = ({
	contentItems,
	prevItem,
	currentIndex,
	nextItem,
	setCurrentIndex
}: NavigationControlsProps) => {
	return (
		<div className="flex items-center justify-between mt-6 ">
			<NavigationButton
				direction="left"
				onClick={prevItem}
				disabled={currentIndex === 0}
			/>
			<div className="flex space-x-2 [&>button]:bg-transparent">
				{contentItems.map((_: any, index: number) => (
					<Dot
						key={index}
						active={index === currentIndex}
						onClick={() =>
							setCurrentIndex(index)
						}
					/>
				))}
			</div>
			<NavigationButton
				direction="right"
				onClick={nextItem}
				disabled={
					currentIndex === contentItems.length - 1
				}
			/>
		</div>
	);
};

interface NavigationButtonProps {
	direction: string;
	onClick: React.MouseEventHandler<HTMLButtonElement>;
	disabled: boolean;
}

const NavigationButton = ({
	direction,
	onClick,
	disabled
}: NavigationButtonProps) => (
	<button
		className={`p-2 rounded-full shadow-lg transition-all duration-300
      ${
		direction === 'left'
			? 'bg-rose-500 hover:bg-rose-600'
			: 'bg-rose-500 hover:bg-rose-600'
      }
      ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
		onClick={onClick}
		disabled={disabled}
	>
		{direction === 'left' ? (
			<ChevronLeft className="h-5 w-5 text-white" />
		) : (
			<ChevronRight className="h-5 w-5 text-white" />
		)}
	</button>
);

interface DotProps {
	active: boolean;
	onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const Dot = ({ active, onClick }: DotProps) => (
	<button onClick={onClick} className="p-1">
		<div
			className={`h-2 w-2 rounded-full transition-all duration-300 ${
				active ? 'bg-rose-500' : 'bg-rose-200'
			}`}
		/>
	</button>
);

export default NavigationControls;
