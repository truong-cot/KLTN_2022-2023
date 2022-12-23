import React, {ReactElement} from 'react';
import TagPage from '~/components/controls/TagPage';
import BaseLayout from '~/components/layout/BaseLayout';
import LayoutGrid from '~/components/layout/LayoutGrid';
import Page from '~/components/layout/Page';
import MainPayment from '~/components/pages/cart/MainPayment';

import styles from './Payment.module.scss';
import RequireAuth from '~/components/protected/RequiredAuth';

function Payment() {
	return (
		<RequireAuth>
			<Page title='Thanh toán'>
				<div className={styles.header}>
					<h4 className={styles.title_header}>Chào mừng bạn đến với MOLLA</h4>
					<p className={styles.text_header}>Thanh toán đơn hàng</p>
				</div>
				<LayoutGrid>
					<div className={styles.container}>
						<TagPage text_1='Home' href_1='/' text_2='Thanh toán đơn hàng' />
						<MainPayment />
					</div>
				</LayoutGrid>
			</Page>
		</RequireAuth>
	);
}

export default Payment;

Payment.getLayout = function (page: ReactElement) {
	return <BaseLayout>{page}</BaseLayout>;
};
