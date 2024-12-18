export interface Document {
	title: string;
	points: string;
	url: string;
	isPlayable?: boolean;
}

export interface AdvancedLessonSection {
	id: number;
	title: string;
	xp: number;
}

export interface AdvancedLesson {
	id: number;
	title: string;
	xp: number;
	section: number;
	content: string;
	video: string;
	quiz: Record<string, QuizQuestion[]>;
}

export interface Status {
	xp: number;
	done: boolean;
}

export const initialStatus: Status = {
	xp: 0,
	done: false,
};

export type QuizOption = {
	content: string;
	is_right: boolean;
	id: number;
};

export type QuizQuestion = {
	question: string;
	exp: number;
	options: QuizOption[];
};

export type LessonValidation = {
	key: string;
	value?: unknown;
};

export interface Localized {
	[key: string]: string;
}

export interface Event {
	id: number;
	timestamp: number;
	title: Localized;
	language: string;
	url: string;
	link: string;
	minToStake: number;
}
