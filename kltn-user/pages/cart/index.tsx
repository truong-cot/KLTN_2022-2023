import React, {ReactElement} from 'react';
import TagPage from '~/components/controls/TagPage';
import BaseLayout from '~/components/layout/BaseLayout';
import LayoutGrid from '~/components/layout/LayoutGrid';
import Page from '~/components/layout/Page';
import MainCart from '~/components/pages/cart/MainCart';

import styles from './Cart.module.scss';

function Cart() {
	return (
		<Page title='Giỏ hàng'>
			<div className={styles.header}>
				<h4 className={styles.title_header}>Chào mừng bạn đến với MOLLA</h4>
				<p className={styles.text_header}>Giỏ hàng</p>
			</div>
			<LayoutGrid>
				<div className={styles.container}>
					<TagPage text_1='Home' href_1='/' text_2='Cart' />
					<MainCart />
				</div>
			</LayoutGrid>
		</Page>
	);
}

export default Cart;

Cart.getLayout = function (page: ReactElement) {
	return <BaseLayout>{page}</BaseLayout>;
};
