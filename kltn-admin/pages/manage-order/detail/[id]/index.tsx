import {ReactElement} from 'react';
import BaseLayout from '~/components/layout/BaseLayout';
import Page from '~/components/layout/Page';
import MainDetailOrder from '~/components/pages/ManageOrder/MainDetailOrder';

function DetailOrder() {
	return (
		<Page title='Chi tiết đơn hàng'>
			<MainDetailOrder />;
		</Page>
	);
}

export default DetailOrder;

DetailOrder.getLayout = function (page: ReactElement) {
	return <BaseLayout title='Chi tiết đơn hàng'>{page}</BaseLayout>;
};
