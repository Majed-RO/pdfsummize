import { GoogleGenAI } from '@google/genai';

/**
 * @file This file contains a function to generate a summary of a document
 * using the Google Gemini API.
 */
import { SUMMARY_SYSTEM_PROMPT } from './prompts';
import { AppError } from './utils';

const apiKey: string = process.env.GEMINI_API_KEY || '';
if (!apiKey) {
	throw new Error(
		'API key not found. Please set GEMINI_API_KEY in your environment variables.'
	);
}

const genAI = new GoogleGenAI({ apiKey });

/**
 * Generates a concise summary from a given PDF text using the Gemini API.
 * This version uses the official @google/genai package.
 * @param {string} pdfText The text content of the PDF to summarize.
 * @returns {Promise<string>} A promise that resolves with the generated summary string.
 * @throws {Error} If the API call fails or a rate limit is exceeded.
 */
export async function generateSummaryFromGemini(pdfText: string) {
	try {
		const result = await genAI.models.generateContent({
			model: 'gemini-2.5-flash',
			contents: [
				{
					role: 'user',
					parts: [{ text: SUMMARY_SYSTEM_PROMPT }]
				},
				{
					role: 'user',
					parts: [
						{
							text: `Here is the content of a document:\n\n${pdfText}\n\nPlease provide a concise, easy to read and engaging summary following the specified format with contextually relevant emojis and proper markdown formatting.`
						}
					]
				}
			],
			config: {
				temperature: 0.7,
				maxOutputTokens: 2500
			}
		});

		// Check if result object itself is somehow null/undefined (highly unlikely after successful await but good for extreme robustness)
		if (!result) {
			console.error(
				'API call returned no GenerateContentResponse object.'
			);
			return null;
		}

		// Check for safety stop (no content generated due to safety filters)
		if (
			result.candidates &&
			result.candidates[0] &&
			result.candidates[0].finishReason === 'SAFETY'
		) {
			console.warn(
				'Warning: Content generation was stopped due to safety filters. No text will be returned.'
			);
			return null; // Or return an empty string if that's preferred for safety reasons
		}

		// Check if generation was cut short due to token limit
		if (
			result.candidates &&
			result.candidates[0] &&
			result.candidates[0].finishReason === 'MAX_TOKENS'
		) {
			console.warn(
				'Warning: Summary generation was truncated because it hit maxOutputTokens.'
			);
			console.warn(
				'Consider increasing maxOutputTokens if you expect longer summaries, or refine your prompt.'
			);
		}

		// Now, access the 'text' property and handle if it's null/undefined
		const generatedSummaryText: string | undefined = result.text; // It might be undefined based on API response

		if (
			generatedSummaryText === undefined ||
			generatedSummaryText === null
		) {
			console.warn(
				"The 'text' property of the response was undefined or null. Model may have generated no output."
			);
			throw new Error('API response was malformed or empty.'); // Indicate that no valid summary text was retrieved
		}

		console.log('Generated Summary:');
		console.log(generatedSummaryText);

		return generatedSummaryText;
	} catch (error: any) {
		// The library handles different error statuses. We check for common ones.
		if (error?.response?.status === 429) {
			console.error(
				'Rate limit exceeded. Please try again later.'
			);

			throw new AppError(
				'Rate limit exceeded. Try again later.',
				'RATE_LIMIT_EXCEEDED'
			);
		}

		console.error('Error generating summary:', error);
		throw error;
	}
}
