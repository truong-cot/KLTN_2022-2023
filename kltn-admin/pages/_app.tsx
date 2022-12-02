import '~/styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';

import type {AppProps} from 'next/app';
import {NextPage} from 'next';
import {Fragment, ReactElement, ReactNode} from 'react';
import {ToastContainer} from 'react-toastify';
import LoadingTopBar from '~/components/common/LoadingTopBar';

type NextPageWithLayout = NextPage & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

export default function App({Component, pageProps}: AppPropsWithLayout) {
	const getLayout = Component.getLayout ?? ((page: any) => page);

	return (
		<Fragment>
			<ToastContainer autoClose={2000} />
			<LoadingTopBar />
			{getLayout(<Component {...pageProps} />)}
		</Fragment>
	);
}
