import '~/styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';

import type {AppProps} from 'next/app';
import {NextPage} from 'next';
import {ReactElement, ReactNode} from 'react';
import {ToastContainer} from 'react-toastify';
import LoadingTopBar from '~/components/common/LoadingTopBar';
import {persistor, store} from '~/redux/store';
import {Provider} from 'react-redux';
import SplashScreen from '~/components/protected/SplashScreen';
import {PersistGate} from 'redux-persist/integration/react';

type NextPageWithLayout = NextPage & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

export default function App({Component, pageProps}: AppPropsWithLayout) {
	const getLayout = Component.getLayout ?? ((page: any) => page);

	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<ToastContainer autoClose={2000} />
				<LoadingTopBar />
				<SplashScreen>{getLayout(<Component {...pageProps} />)}</SplashScreen>
			</PersistGate>
		</Provider>
	);
}
