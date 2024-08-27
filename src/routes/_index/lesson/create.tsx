import { createFileRoute } from '@tanstack/react-router';
import SunEditor, { buttonList } from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { useState } from 'react'; // Import Sun Editor's CSS File

export const Route = createFileRoute('/_index/lesson/create')({
	component: CreateLessonPage,
});

function CreateLessonPage() {
	const [content, setContent] = useState<string>('');

	const handleChange = (content: string) => {
		setContent(content);
	};
	return (
		<div className={'border border-red-500 p-4 flex flex-col gap-4'}>
			<div className={'uppercase text-xl'}>Create new lesson</div>
			<SunEditor setAllPlugins={true} setOptions={{ buttonList: buttonList.complex }} height={'500px'} onChange={handleChange} />
			<textarea value={btoa(encodeURIComponent(content))} className={'text-black'} />
			<div className={''} dangerouslySetInnerHTML={{ __html: decodeURIComponent(atob(btoa(encodeURIComponent(content)))) }} />
		</div>
	);
}
