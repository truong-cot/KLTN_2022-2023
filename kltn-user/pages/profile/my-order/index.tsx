import React, {ReactElement} from 'react';

import {useRouter} from 'next/router';

import styles from './MyOrder.module.scss';
import Page from '~/components/layout/Page';
import LayoutGrid from '~/components/layout/LayoutGrid';
import TagPage from '~/components/controls/TagPage';
import ProfileLayout from '~/components/layout/ProfileLayout';
import MainMyOrder from '~/components/pages/Profile/MainMyOrder';
import BaseLayout from '~/components/layout/BaseLayout';

function MyOrder() {
	return (
		<Page title='Đơn hàng của bạn'>
			<div className={styles.header}>
				<h4 className={styles.title_header}>Chào mừng bạn đến với MOLLA</h4>
				<p className={styles.text_header}>Đơn hàng của bạn</p>
			</div>
			<LayoutGrid>
				<div className={styles.container}>
					<TagPage
						text_1='Home'
						href_1='/'
						text_2='Trang cá nhân'
						text_3='Đơn hàng của bạn'
						href_2='/profile'
					/>
					<ProfileLayout>
						<MainMyOrder />
					</ProfileLayout>
				</div>
			</LayoutGrid>
		</Page>
	);
}

export default MyOrder;

MyOrder.getLayout = function (page: ReactElement) {
	return <BaseLayout>{page}</BaseLayout>;
};
