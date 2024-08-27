export interface DocumentProps {
	title: string;
	points: string;
	url: string;
	isPlayable?: boolean;
}

export interface AdvancedLessonBlock {
	title: string;
	lessons: AdvancedLesson[];
	sectionXp: number;
	total: number;
	done: number;
}

export interface AdvancedLesson {
	title: string;
	xp: number;
	done: boolean;
	src: string;
}
