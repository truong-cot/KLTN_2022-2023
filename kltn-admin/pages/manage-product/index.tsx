import {ReactElement} from 'react';
import BaseLayout from '~/components/layout/BaseLayout';
import Page from '~/components/layout/Page';
import MainManageProduct from '~/components/pages/ManageProduct/MainManageProduct';

export default function ManageProduct() {
	return (
		<Page title='Quản lý sản phẩm'>
			<MainManageProduct />;
		</Page>
	);
}

ManageProduct.getLayout = function (page: ReactElement) {
	return <BaseLayout title='Quản lý sản phẩm'>{page}</BaseLayout>;
};
