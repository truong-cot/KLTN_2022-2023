import {ReactElement} from 'react';
import BaseLayout from '~/components/layout/BaseLayout';
import Page from '~/components/layout/Page';
import MainDetailProduct from '~/components/pages/ManageProduct/MainDetailProduct';

export default function DetailProduct() {
	return (
		<Page title='Chi tiết sản phẩm'>
			<MainDetailProduct />;
		</Page>
	);
}

DetailProduct.getLayout = function (page: ReactElement) {
	return <BaseLayout title='Chi tiết sản phẩm'>{page}</BaseLayout>;
};
