import {useRouter} from 'next/router';
import React from 'react';
import TabNavLinkActive from '~/components/controls/TabNavLinkActive';

import styles from './MainMyOrder.module.scss';

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
					{!_type && <p>Đang xử lý</p>}
					{_type === 'delivering' && <p>Đang giao</p>}
					{_type === 'accomplished' && <p>Đã hoàn thành</p>}
					{_type === 'cancelled' && <p>Đã hủy</p>}
				</div>
			</div>
		</div>
	);
}

export default MainMyOrder;
