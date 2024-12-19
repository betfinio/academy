import 'betfinio_app/style';
import { VersionValidation } from '@/src/components/VersionValidation.tsx';
import instance from '@/src/i18n.ts';
import { Toaster } from '@betfinio/components/ui';
import { createRootRouteWithContext } from '@tanstack/react-router';
import type { queryClient, wagmiConfig } from 'betfinio_app/config';
import { Root } from 'betfinio_app/root';

interface IRootRouteContext {
	queryClient: typeof queryClient;
	wagmiConfig: typeof wagmiConfig;
}
export const Route = createRootRouteWithContext<IRootRouteContext>()({
	component: () => (
		<Root id={'academy'} instance={instance}>
			<Toaster />
			<VersionValidation repository={'academy'} branch={import.meta.env.PUBLIC_BRANCH} current={import.meta.env.PUBLIC_DEPLOYED} />
		</Root>
	),
});
