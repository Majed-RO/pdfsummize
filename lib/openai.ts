import OpenAI from 'openai';
import { SUMMARY_SYSTEM_PROMPT } from './prompts';
import { AppError } from './utils';
const client = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY
});

export async function generateSummaryFromOpenAI(pdfText: string) {
	try {
		//	model: 'gpt-5-mini',
		//
		const response = await client.responses.create({
			model: 'gpt-5-mini',
			reasoning: { effort: 'low' },
			input: [
				{
					role: 'system',
					content: SUMMARY_SYSTEM_PROMPT
				},
				{
					role: 'user',
					content: `Here is the content of a document:\n\n${pdfText}\n\nPlease provide a concise, easy to read and engaging summary following the specified format with contextually relevant emojis and proper markdown formatting`
				}
			],
			// temperature: 0.7,
			max_output_tokens: 1500
		});

		console.log(response.output_text);
		return response.output_text;
	} catch (error: any) {
		// 429 == too many requests
		if (error?.status === 429) {
			console.error(
				'Rate limit exceeded. Please try again later.'
			);

      throw new AppError('Rate limit exceeded. Try again later.', 'RATE_LIMIT_EXCEEDED');
			
		}
		console.error('Error generating summary:', error);
		throw error;
	}
}
