import {useRouter} from 'next/router';
import React from 'react';
import TabNavLink from '~/components/controls/TabNavLink';
import TableCancelled from '../TableCancelled';
import TableComplete from '../TableComplete';
import TableDelivering from '../TableDelivering';
import TablePending from '../TablePending';

import styles from './MainManageOrder.module.scss';

function MainManageOrder() {
	const router = useRouter();
	const _type = router.query._type;

	const listTab: Array<any> = [
		{
			title: 'Đơn hàng chờ duyệt',
			query: null,
			pathname: '/manage-order',
		},
		{
			title: 'Đơn hàng đang giao',
			query: 'delivering',
			pathname: '/manage-order',
		},
		{
			title: 'Đơn hàng hoàn thành',
			query: 'complete',
			pathname: '/manage-order',
		},
		{
			title: 'Đơn hàng đã hủy',
			query: 'cancelled',
			pathname: '/manage-order',
		},
	];
	return (
		<div className={styles.container}>
			<h4 className={styles.title}>Quản lý đơn hàng</h4>
			<TabNavLink listHref={listTab} query='_type' />
			<div className={styles.main}>
				{!_type && <TablePending />}
				{_type === 'delivering' && <TableDelivering />}
				{_type === 'complete' && <TableComplete />}
				{_type === 'cancelled' && <TableCancelled />}
			</div>
		</div>
	);
}

export default MainManageOrder;
