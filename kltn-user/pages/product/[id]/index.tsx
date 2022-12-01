import React, {ReactElement} from 'react';
import TagPage from '~/components/controls/TagPage';
import BaseLayout from '~/components/layout/BaseLayout';
import LayoutGrid from '~/components/layout/LayoutGrid';
import Page from '~/components/layout/Page';
import MainProduct from '~/components/pages/products/MainProduct';

import styles from './ProductDetail.module.scss';

function ProductDetail() {
	return (
		<Page title='Trang chủ'>
			<div className={styles.header}>
				<h4 className={styles.title_header}>Chào mừng bạn đến với MOLLA</h4>
				<p className={styles.text_header}>Chi tiết sản phẩm</p>
			</div>
			<LayoutGrid>
				<div className={styles.container}>
					<TagPage
						text_1='Home'
						href_1='/'
						text_2='Shop'
						href_2='/shop'
						text_3='Chi tiết sản phẩm'
					/>
					<MainProduct />
				</div>
			</LayoutGrid>
		</Page>
	);
}

export default ProductDetail;

ProductDetail.getLayout = function (page: ReactElement) {
	return <BaseLayout>{page}</BaseLayout>;
};
