import type { Document } from '@/src/lib/types.ts';
import { Button, Separator } from '@betfinio/components/ui';
import { BookIcon } from 'lucide-react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

const DocumentBlock: FC<Document> = ({ isPlayable = false, title = 'Placeholder', points = '', url = '/' }) => {
	const { t } = useTranslation('academy', { keyPrefix: 'document' });
	return (
		<div className={'border border-gray-800 bg-primary-lighter  rounded-lg flex flex-col h-full'}>
			<div className={'flex-grow p-4'}>
				<div className={'flex flex-row gap-2 items-center'}>
					<BookIcon className={'w-8 h-8 text-purple-box'} />
					<div className={'text-xl font-semibold'}>{title}</div>
				</div>
				<ul className={'ml-16 text-gray-400 list-disc'}>
					{points.split('\n').map((point, index) => (
						<li key={index}>{point}</li>
					))}
				</ul>
			</div>
			<Separator />
			<div className={'grid grid-cols-2 p-4 gap-2 md:gap-3 lg:gap-4'}>
				<a target={'_blank'} rel={'noreferrer'} href={url}>
					<Button variant={'outline'} className={'w-full text-base border-yellow-400 text-secondary-foreground'}>
						{t('visit')}
					</Button>
				</a>

				{isPlayable && <Button>{t('play')}</Button>}
			</div>
		</div>
	);
};

export default DocumentBlock;
