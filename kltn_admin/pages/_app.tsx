import React, {Fragment, ReactNode} from 'react';

import '../styles/globals.scss';
import {NextPage} from 'next';
import {AppProps} from 'next/app';
import {Provider} from 'react-redux';
import {store} from '~/redux/store';

type Page<P = {}> = NextPage<P> & {
	getLayout?: (page: ReactNode) => ReactNode;
};

type Props = AppProps & {
	Component: Page;
};

function MyApp({Component, pageProps}: Props) {
	const getLayout = Component.getLayout ?? ((page: ReactNode) => page);

	return (
		<Provider store={store}>
			<meta
				name='viewport'
				content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'
			/>
			{getLayout(<Component {...pageProps} />)}
		</Provider>
	);
}

export default MyApp;
