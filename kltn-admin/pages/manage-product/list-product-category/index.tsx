import {ReactElement} from 'react';
import BaseLayout from '~/components/layout/BaseLayout';
import Page from '~/components/layout/Page';
import MainListProductCategory from '~/components/pages/ManageProduct/MainListProductCategory';

export default function ListProduct() {
	return (
		<Page title='Danh sách sản phẩm theo thể loại'>
			<MainListProductCategory />;
		</Page>
	);
}

ListProduct.getLayout = function (page: ReactElement) {
	return <BaseLayout title='Quản lý sản phẩm theo thể loại'>{page}</BaseLayout>;
};
