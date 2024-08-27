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
}

export interface Status {
	xp: number;
	done: boolean;
}

export const initialStatus: Status = {
	xp: 0,
	done: false,
};
