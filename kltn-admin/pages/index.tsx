import {ReactElement} from 'react';
import BaseLayout from '~/components/layout/BaseLayout';
import Page from '~/components/layout/Page';
import MainHome from '~/components/pages/Home/MainHome';
import RequireAuth from '~/components/protected/RequiredAuth';

export default function Home() {
	return (
		<RequireAuth>
			<Page title='Trang chủ'>
				<MainHome />
			</Page>
		</RequireAuth>
	);
}

Home.getLayout = function (page: ReactElement) {
	return <BaseLayout title='Trang chủ'>{page}</BaseLayout>;
};
