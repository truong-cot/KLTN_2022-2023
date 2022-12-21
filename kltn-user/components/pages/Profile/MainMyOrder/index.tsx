import {useRouter} from 'next/router';
import React from 'react';
import TabNavLinkActive from '~/components/controls/TabNavLinkActive';

import styles from './MainMyOrder.module.scss';
import MainOrderPendding from '../MainOrderPendding';
import MainOrderDelivering from '../MainOrderDelivering';
import MainOrderAccomplished from '../MainOrderAccomplished';
import MainOrderCancelled from '../MainOrderCancelled';

function MainMyOrder() {
	const router = useRouter();
	const {_type} = router.query;

	const listTab: Array<any> = [
		{
			title: 'Đang xử lý',
			query: null,
			pathname: '/profile/my-order',
		},
		{
			title: 'Đang giao',
			query: 'delivering',
			pathname: '/profile/my-order',
		},
		{
			title: 'Đã hoàn thành',
			query: 'accomplished',
			pathname: '/profile/my-order',
		},
		{
			title: 'Đã hủy',
			query: 'cancelled',
			pathname: '/profile/my-order',
		},
	];
	return (
		<div className={styles.container}>
			<div className={styles.main}>
				<p className={styles.title}>Quản lý đơn hàng</p>
				<TabNavLinkActive listHref={listTab} query='_type' />

				<div className={styles.wrapper}>
					{!_type && <MainOrderPendding />}
					{_type === 'delivering' && <MainOrderDelivering />}
					{_type === 'accomplished' && <MainOrderAccomplished />}
					{_type === 'cancelled' && <MainOrderCancelled />}
				</div>
			</div>
		</div>
	);
}

export default MainMyOrder;
