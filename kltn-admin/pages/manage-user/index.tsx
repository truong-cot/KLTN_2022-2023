import {ReactElement} from 'react';
import BaseLayout from '~/components/layout/BaseLayout';
import MainManageUser from '~/components/pages/ManageUser/MainManageUser';

export default function ManageUser() {
	return <MainManageUser />;
}

ManageUser.getLayout = function (page: ReactElement) {
	return <BaseLayout title='Quản lý tài khoản'>{page}</BaseLayout>;
};
