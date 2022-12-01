import React, {ReactElement, useState} from 'react';
import Pagination from '~/components/controls/Pagination';
import TagPage from '~/components/controls/TagPage';
import BaseLayout from '~/components/layout/BaseLayout';
import LayoutGrid from '~/components/layout/LayoutGrid';
import Page from '~/components/layout/Page';
import MainShop from '~/components/pages/shop/MainShop';

import styles from './Shop.module.scss';

function Shop() {
	return (
		<Page title='Trang chủ'>
			<div className={styles.header}>
				<h4 className={styles.title_header}>Chào mừng bạn đến với MOLLA</h4>
				<p className={styles.text_header}>Shop</p>
			</div>
			<LayoutGrid>
				<div className={styles.container}>
					<TagPage
						text_1='Home'
						href_1='/'
						text_2='Shop'
						href_2='/shop?type=all&status=all'
						text_3='List'
					/>
					<MainShop />
				</div>
			</LayoutGrid>
		</Page>
	);
}

export default Shop;

Shop.getLayout = function (page: ReactElement) {
	return <BaseLayout>{page}</BaseLayout>;
};
