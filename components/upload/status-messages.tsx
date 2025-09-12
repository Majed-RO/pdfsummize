import { Terminal } from 'lucide-react';
import { useEffect, useRef } from 'react';
import {
	MotionDiv,
	MotionLi,
	MotionP,
	MotionSpan,
	MotionUl
} from '../common/motion-wrapper';
import {
	characterVariants,
	containerVariants,
	itemVariants
} from '@/lib/motions';
import { AnimatePresence } from 'motion/react';

// --- Type Definitions ---
export type MessageType = 'info' | 'success' | 'error';

export interface Message {
	id: number;
	text: string;
	type: MessageType;
}

export interface StatusOptions {
	icon?: string | React.ComponentType<{ className?: string }>;
	className?: string;
	type?: MessageType;
  showToast?: Boolean
}

// --- Standalone Status Messages Component ---
const StatusMessages = ({ messages }: { messages: Message[] }) => {
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	const getMessageColor = (type: MessageType) => {
		switch (type) {
			case 'success':
				return 'text-emerald-700';
			case 'error':
				return 'text-red-400';
			default:
				return 'text-gray-500';
		}
	};

	const messagesMock: Message[] = [
		{
			id: Date.now(),
			text: 'Something went wrong',
			type: 'error'
		},
		{
			id: Date.now(),
			text: 'Good, we have saved your file!',
			type: 'success'
		},
		{
			id: Date.now(),
			text: 'We could not upload file for some reason',
			type: 'error'
		},
		{
			id: Date.now(),
			text: 'We are processing the summary, please be patient',
			type: 'info'
		},
		{
			id: Date.now(),
			text: 'Congratulations, Every thing has saved!',
			type: 'success'
		}
	];

	if (messages.length === 0) {
		return null;
	}
	// messages = messagesMock;

	return (
		<MotionDiv
			variants={itemVariants}
			className="my-6 w-full  rounded-lg border border-gray-700/50 shadow-inner"
		>
			<div className="flex items-center gap-2 p-3 border-b border-gray-700/50">
				<Terminal className="w-5 h-5 text-gray-400" />
				<h3 className="text-sm font-semibold text-gray-600">
					Processing Log
				</h3>
			</div>
			<MotionUl
				/* variants={containerVariants}
				initial='hidden'
				animate="visible" */
				className="p-4 h-48 overflow-y-auto text-sm font-mono text-left"
			>
				{messages.map((msg: Message, index) => (
					<MotionLi
						key={msg.id + index}
						variants={itemVariants}
						initial={{ opacity: 0 }}
						whileInView={{
							opacity: 1,
							transition: {
								duration: 0.8,
								delay:
									0.2 *
									index
							}
						}}
						className={`whitespace-pre-wrap ${getMessageColor(
							msg.type
						)}`}
					>
						<span className="text-gray-500 mr-2">
							{`[${new Date(
								msg.id
							).toLocaleTimeString()}]>`}
						</span>
						{msg.text}
					</MotionLi>
				))}
				<div ref={messagesEndRef} />
			</MotionUl>
		</MotionDiv>
	);
};

interface TypewriterProps {
	text: string;
}

export const Typewriter: React.FC<TypewriterProps> = ({ text }) => {
	const characters = text.split('');

	return (
		<MotionSpan
			variants={containerVariants}
			initial="hidden"
			animate="visible"
			// className="font-mono text-xl md:text-3xl lg:text-5xl text-gray-800 p-4 rounded-xl"
		>
			<AnimatePresence>
				{characters.map((char, index) => (
					<MotionSpan
						key={index}
						variants={characterVariants}
						className="inline-block" // Ensures each character can be animated individually
					>
						{char}
					</MotionSpan>
				))}
			</AnimatePresence>
		</MotionSpan>
	);
};

export default StatusMessages;
