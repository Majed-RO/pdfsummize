import { isDev } from './helpers';

export const SITE_PREFIX = 'PDF';
export const SITE_SUFFIX = 'Summize';
export const SITE_NAME = `${SITE_PREFIX}${SITE_SUFFIX}`;

export const plans = [
	{
		name: 'Basic',
		price: 10,
		uploadLimit: 5,
		description: 'Perfect for occasional use',
		items: [
			'5 PDF summaries per month',
			'Standard processing speed',
			'Email support'
		],
		id: 'basic',
		paymentLink: isDev
			? process.env.STRIPE_BASIC_PLAN_PAYMENT_LINK_TEST!
			: process.env.STRIPE_BASIC_PLAN_PAYMENT_LINK_LIVE!,
		priceId: isDev
			? process.env.STRIPE_BASIC_PLAN_PRICE_ID_TEST!
			: process.env.STRIPE_BASIC_PLAN_PRICE_ID_LIVE!
	},
	{
		name: 'Pro',
		price: 24,
		uploadLimit: 1000,
		description: 'For professionals and teams',
		items: [
			'Unlimited PDF summaries',
			'Priority processing',
			'24/7 priority support',
			'Markdown Export'
		],
		id: 'pro',
		paymentLink: isDev
			? process.env.STRIPE_PRO_PLAN_PAYMENT_LINK_TEST!
			: process.env.STRIPE_PRO_PLAN_PAYMENT_LINK_LIVE!,
		priceId: isDev
			? process.env.STRIPE_PRO_PLAN_PRICE_ID_TEST!
			: process.env.STRIPE_PRO_PLAN_PRICE_ID_LIVE!
	}
];

export const DEMO_SUMMARY = `
# 📚✏️ Your 5th Grade Learning Map: Subjects Unpacked!
🥇 A comprehensive guide to every topic, unit, and assessment for 5th graders across all major subjects!
🚀 This document is your ultimate roadmap to academic success, making complex curricula easy to navigate.

# Document Details
• 📄 Type: Curriculum Overview / Study Plan
• 👥 For: 5th Grade Students, Parents, and Educators

# Key Highlights
• 📚 Covers core subjects: Arabic Language, Mathematics, Science, and English.
• 🧩 Detailed breakdown by unit, specific topic, and corresponding page numbers.
• ✅ Clearly distinguishes between training/practice sessions and assessment sections in Arabic.
• 🗓️ Organized by week for some subjects, providing a structured learning timeline.

# Why It Matters
• 💡 This document provides a clear roadmap for the entire academic year, allowing students, parents, and teachers to understand the full scope of learning. It helps in planning study schedules, tracking progress effectively, and ensures everyone is on the same page regarding curriculum expectations across all core subjects.

# Main Points
• 📖 Comprehensive curriculum details for Arabic, Math, Science, and English.
• 🔬 Each subject is meticulously broken down into units and specific learning topics.
• 🔢 Includes precise page references for quick and easy topic location within textbooks.
• ⚖️ The Arabic language curriculum clearly separates dedicated training and evaluation components.

# Pro Tips
• 🗓️ Use this guide to plan your weekly study schedule and prioritize learning goals.
• 🎯 Focus on understanding both the training objectives and assessment expectations for each unit.
• 🧭 Refer to the provided page numbers for quick navigation and efficient study.
• 📈 Track your progress through each unit and subject to stay motivated and on track.

# Key Terms to Know
• 📦 الوحدة (Al-Wahda): A major section or chapter in a subject.
• 📝 المبحث (Al-Mabhat): Refers to the specific academic subject being studied.
• 💪 التدريب (Al-Tadreeb): Practical exercises or activities to reinforce learning.
• ✨ التقييم (Al-Taqyeem): Evaluation or assessment sections to test understanding.

# Bottom Line
• 🌟 This document is your essential tool for a successful and organized 5th-grade academic journey!
`;
