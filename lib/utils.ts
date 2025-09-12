import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export class AppError extends Error {
	public readonly code: string;

	constructor(message: string, code: string) {
		super(message);
		this.name = 'AppError';
		this.code = code;
		Object.setPrototypeOf(this, new.target.prototype);
	}
}

export function isAppError(err: unknown, code?: string): err is AppError {
	return (
		err instanceof AppError &&
		(code === undefined || err.code === code)
	);
}

export function formatFileNameToTitle(fileName: string): string {
	// Remove file extension and replace special characters with spaces
	const withoutExtension = fileName.replace(/\.[^/.]+$/, '');
	const withSpaces = withoutExtension
		.replace(/[-_]+/g, ' ') // Replace dashes and underscores with spaces
		.replace(/([a-z])([A-Z])/g, '$1 $2'); // Add space between camelCase

	// Convert to title case (capitalize first letter of each word)
	return withSpaces
		.split(' ')
		.map(
			word =>
				word.charAt(0).toUpperCase() +
				word.slice(1).toLowerCase()
		)
		.join(' ')
		.trim();
}

export function formatFileName(url: string): string {
	const fileName = url.split('/').pop() || '';
	return fileName
		.replace(/\.[^/.]+$/, '')
		.replace(/[-_]/g, ' ')
		.split(' ')
		.map(
			word =>
				word.charAt(0).toUpperCase() +
				word.slice(1).toLowerCase()
		)
		.join(' ');
}

type Section = {
  title: string;
  content: string[];
};

export function extractSections(text: string): Section[] {
  const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
  const sections: Section[] = [];

  let currentSection: Section | null = null;

  for (const line of lines) {
    if (line.startsWith("#")) {
      // Save previous section
      if (currentSection) {
        sections.push(currentSection);
      }
      // Start a new section
      currentSection = {
        title: line.replace(/^#\s*/, ""), // Remove "# "
        content: [],
      };
    } else if (currentSection) {
      // Clean leading • or - or whitespace
      const cleanedLine = line.replace(/^•\s*|^-+\s*/, "").trim();
      currentSection.content.push(cleanedLine);
    }
  }

  // Push last section
  if (currentSection) {
    sections.push(currentSection);
  }

  return sections;
}

export async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
