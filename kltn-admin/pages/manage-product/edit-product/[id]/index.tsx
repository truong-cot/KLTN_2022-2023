import {ReactElement} from 'react';
import BaseLayout from '~/components/layout/BaseLayout';
import Page from '~/components/layout/Page';
import MainEditProduct from '~/components/pages/ManageProduct/MainEditProduct';

export default function EditProduct() {
	return (
		<Page title='Chỉnh sửa sản phẩm'>
			<MainEditProduct />;
		</Page>
	);
}

EditProduct.getLayout = function (page: ReactElement) {
	return <BaseLayout title='Chỉnh sửa sản phẩm'>{page}</BaseLayout>;
};
