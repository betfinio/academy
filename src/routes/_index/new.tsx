import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Loader } from 'lucide-react';
import { useEffect } from 'react';

/**
 * Ref link formats
 * old(by address):
 * ?code=0x000...000 - just inviter
 * ?code=0x000...000&type=line - inviter with line
 * ?code=0x000...0000x000..000 - inviter with parent
 * ?code=0x000...0000x000..000&type=line - inviter with parent and line
 *
 * new(by id):
 * ?ref=777 - just inviter
 * ?ref=777L - inviter
 * ?ref=777L  - inviter with line to left
 * ?ref=777RS - inviter with line to right
 * ?ref=777P888 - inviter with parent
 * ?ref=777P888LS - inviter with parent and line to left
 * ?ref=777P888RS - inviter with parent and line to right
 *
 * format of new:
 * ([0-9]+)(P([0-9]+))?(L|R)?(S)?
 */
export const Route = createFileRoute('/_index/new')({
	component: NewPage,
	validateSearch: (search) => {
		// check if old
		if (search.code) {
			const inviter = search.code.toString().slice(0, 42);
			const parent = search.code.toString().slice(42);
			const type = search.type || 'normal';
			localStorage.setItem('code', JSON.stringify({ inviter, parent, type }));
			localStorage.removeItem('ref');
			return { inviter, parent, type };
		}
		// check if new
		if (search.ref) {
			const reg = /^([0-9]+)(P([0-9]+))?([LR])?(S)?$/;
			const match = search.ref.toString().match(reg);
			if (match) {
				const inviter = match[1];
				const parent = match[3];
				const type = match[5] || 'N';
				const side = match[4] || 'L';
				localStorage.setItem('ref', JSON.stringify({ inviter, parent, type, side }));
				localStorage.removeItem('code');
				return { inviter, parent, type, side };
			}
			return {};
		}
		return {};
	},
});

function NewPage() {
	const navigate = useNavigate();
	useEffect(() => {
		navigate({ to: '/lesson/$section/$lesson', params: { section: '1', lesson: '1' } });
	}, []);
	return (
		<div className={'w-full h-full flex items-center justify-center'}>
			<Loader className={'w-10 h-10 animate-spin'} />
		</div>
	);
}
