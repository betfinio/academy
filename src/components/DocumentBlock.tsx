import type { DocumentProps } from '@/src/lib/types.ts';
import { Button } from 'betfinio_app/button';
import { Separator } from 'betfinio_app/separator';
import { BookIcon } from 'lucide-react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

const DocumentBlock: FC<DocumentProps> = ({ isPlayable = false, title = 'Placeholder', points = '', url = '/' }) => {
	const { t } = useTranslation('', { keyPrefix: 'academy.document' });
	return (
		<div className={'border border-gray-800 bg-primaryLighter aspect-video rounded-lg flex flex-col'}>
			<div className={'flex-grow p-4'}>
				<div className={'flex flex-row gap-2 items-center'}>
					<BookIcon className={'w-8 h-8 text-gray-400'} />
					<div className={'text-xl'}>{title}</div>
				</div>
				<ul className={'ml-16 text-gray-400 list-disc'}>
					{points.split('\n').map((point, index) => (
						<li key={index}>{point}</li>
					))}
				</ul>
			</div>
			<Separator />
			<div className={'grid grid-cols-2 p-4 gap-2 md:gap-3 lg:gap-4'}>
				<a href={url}>
					<Button variant={'outline'} className={'w-full border-yellow-400 text-yellow-400'}>
						{t('visit')}{' '}
					</Button>
				</a>

				{isPlayable && <Button>Play</Button>}
			</div>
		</div>
	);
};

export default DocumentBlock;
