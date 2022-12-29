import {ReactElement} from 'react';
import BaseLayout from '~/components/layout/BaseLayout';
import Page from '~/components/layout/Page';
import MainProductAmount from '~/components/pages/ManageProduct/MainProductAmount';

export default function ProductAmount() {
	return (
		<Page title='Quản lý số lượng sản phẩm'>
			<MainProductAmount />;
		</Page>
	);
}

ProductAmount.getLayout = function (page: ReactElement) {
	return <BaseLayout title='Quản lý số lượng sản phẩm'>{page}</BaseLayout>;
};
