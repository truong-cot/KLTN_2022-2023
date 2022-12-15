import {ReactElement} from 'react';
import BaseLayout from '~/components/layout/BaseLayout';
import Page from '~/components/layout/Page';
import MainManageOrder from '~/components/pages/ManageOrder/MainManageOrder';
import RequireAuth from '~/components/protected/RequiredAuth';

export default function Profile() {
	return (
		<RequireAuth>
			<Page title='Quản lý đơn hàng'>
				<MainManageOrder />
			</Page>
		</RequireAuth>
	);
}

Profile.getLayout = function (page: ReactElement) {
	return <BaseLayout title='Quản lý đơn hàng'>{page}</BaseLayout>;
};
