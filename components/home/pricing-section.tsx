import { plans } from '@/lib/constants';
import { cn } from '@/lib/utils';
import {  CheckIcon } from 'lucide-react';
import React from 'react';
import { MotionDiv, MotionSection } from '../common/motion-wrapper';
import { containerVariants, itemVariants } from '@/lib/motions';
import { Variants } from 'motion/react';
import SubscriptionButton from '../common/subscription-button';

type PricingPlan = {
	name: string;
	price: number;
	description: string;
	items: string[];
	id: string;
	paymentLink: string;
	priceId: string;
};

const PricingSection = () => {
	return (
		<MotionSection
			variants={containerVariants}
			initial="hidden"
      animate={'visible'}
			// whileInView="visible"
			viewport={{ once: true, margin: '-100px' }}
			className="relative overflow-hidden"
			id="pricing"
		>
			<div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
				<MotionDiv
					variants={itemVariants}
					className="flex items-center justify-center w-full pb-12"
				>
					<h2 className="uppercase font-bold text-xl mb-8 text-rose-500">
						Pricing
					</h2>
				</MotionDiv>
				<div className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8">
					{plans.map(plan => (
						<PricingCard
							key={plan.id}
							{...plan}
						/>
					))}
				</div>
			</div>
		</MotionSection>
	);
};

export default PricingSection;

const PricingCard = ({
	name,
	price,
	description,
	items,
	id,
	paymentLink,
	priceId
}: PricingPlan) => {
	const listVariant: Variants = {
		hidden: { opacity: 0, x: -20 },
		visible: {
			opacity: 1,
			x: 0,
			transition: {
				type: 'spring',
				damping: 20,
				stiffness: 100
			}
		}
	};

	return (
		<MotionDiv
			variants={listVariant}
			whileHover={{ scale: 1.02 }}
			className="relative w-full max-w-lg hover:scale-105 hover:transition-all duration-300"
		>
			<div
				className={cn(
					'relative flex flex-col h-full gap-4 lg:gap-8 z-10 p-8 border-[1px] border-gray-500/20 rounded-2xl',
					id === 'pro' &&
						'border-rose-500 gap-5 border-2'
				)}
			>
				<MotionDiv
					variants={listVariant}
					className="flex justify-between items-center gap-4"
				>
					<div>
						<p className="text-lg lg:text-xl font-bold capitalize">
							{name}
						</p>
						<p className="text-base-content/80 mt-2">
							{description}
						</p>
					</div>
				</MotionDiv>

				<MotionDiv
					variants={listVariant}
					className="flex gap-2"
				>
					<p className="text-5xl tracking-tight font-extrabold">
						${price}
					</p>
					<div className="flex flex-col justify-end mb-[4px]">
						<p className="text-xs uppercase font-semibold">
							USD
						</p>
						<p className="text-xs">
							/month
						</p>
					</div>
				</MotionDiv>

				<MotionDiv
					variants={listVariant}
					className="space-y-2.5 leading-relaxed text-base flex-1"
				>
					{items.map((item, idx) => (
						<li
							key={idx}
							className="flex items-center gap-2"
						>
							<CheckIcon size={18} />
							<span>{item}</span>
						</li>
					))}
				</MotionDiv>

				<MotionDiv
					variants={listVariant}
					className="space-y-2 flex justify-center w-full"
				>
					<SubscriptionButton
						planPaymentLink={paymentLink}
            planPriceId={priceId}
						planId={id}
					/>
				</MotionDiv>
			</div>
		</MotionDiv>
	);
};
