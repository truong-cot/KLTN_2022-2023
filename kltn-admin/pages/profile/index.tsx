import {ReactElement} from 'react';
import BaseLayout from '~/components/layout/BaseLayout';
import Page from '~/components/layout/Page';
import MainProfile from '~/components/pages/Profile/MainProfile';
import RequireAuth from '~/components/protected/RequiredAuth';

export default function Profile() {
	return (
		<RequireAuth>
			<Page title='Thông tin tài khoản'>
				<MainProfile />
			</Page>
		</RequireAuth>
	);
}

Profile.getLayout = function (page: ReactElement) {
	return <BaseLayout title='Thông tin tài khoản'>{page}</BaseLayout>;
};
