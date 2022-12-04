import {ReactElement} from 'react';
import BaseLayout from '~/components/layout/BaseLayout';
import Page from '~/components/layout/Page';
import MainManageUser from '~/components/pages/ManageUser/MainManageUser';

export default function ManageUser() {
	return (
		<Page title='Quản lý user'>
			<MainManageUser />;
		</Page>
	);
}

ManageUser.getLayout = function (page: ReactElement) {
	return <BaseLayout title='Quản lý tài khoản'>{page}</BaseLayout>;
};
