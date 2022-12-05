import {ReactElement} from 'react';
import BaseLayout from '~/components/layout/BaseLayout';
import Page from '~/components/layout/Page';
import MainAddProduct from '~/components/pages/ManageProduct/MainAddProduct';

export default function AddProduct() {
	return (
		<Page title='Thêm sản phẩm'>
			<MainAddProduct />;
		</Page>
	);
}

AddProduct.getLayout = function (page: ReactElement) {
	return <BaseLayout title='Thêm sản phẩm'>{page}</BaseLayout>;
};
