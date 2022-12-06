import {ReactElement} from 'react';
import BaseLayout from '~/components/layout/BaseLayout';
import Page from '~/components/layout/Page';
import MainListProduct from '~/components/pages/ManageProduct/MainListProduct';

export default function ListProduct() {
	return (
		<Page title='Danh sách sản phẩm'>
			<MainListProduct />;
		</Page>
	);
}

ListProduct.getLayout = function (page: ReactElement) {
	return <BaseLayout title='Quản lý sản phẩm'>{page}</BaseLayout>;
};
