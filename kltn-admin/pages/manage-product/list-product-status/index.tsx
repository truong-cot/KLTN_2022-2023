import {ReactElement} from 'react';
import BaseLayout from '~/components/layout/BaseLayout';
import Page from '~/components/layout/Page';
import MainListProductStatus from '~/components/pages/ManageProduct/ProductStatus/MainListProductStatus';

export default function ListProductStatus() {
	return (
		<Page title='Danh sách sản phẩm theo trạng thái'>
			<MainListProductStatus />;
		</Page>
	);
}

ListProductStatus.getLayout = function (page: ReactElement) {
	return <BaseLayout title='Quản lý sản phẩm theo trạng thái'>{page}</BaseLayout>;
};
