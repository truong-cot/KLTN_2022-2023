import React, {useState} from 'react';
import TabNavLink from '~/components/controls/TabNavLink';
import styles from './MainListProductStatus.module.scss';
import {useRouter} from 'next/router';
import TableProductHot from '../TableProductHot';
import TableProductSale from '../TableProductSale';
import TableProductTrending from '../TableProductTrending';
import TableAllProductStatus from '../TableAllProductStatus';

function MainListProductStatus() {
	const router = useRouter();
	const _type = router.query._type;

	const listTab: Array<any> = [
		{
			title: 'Tất cả sản phẩm',
			query: null,
			pathname: '/manage-product/list-product-status',
		},
		{
			title: 'Sản phẩm hot',
			query: 'hot',
			pathname: '/manage-product/list-product-status',
		},
		{
			title: 'Sản phẩm được sale',
			query: 'sale',
			pathname: '/manage-product/list-product-status',
		},
		{
			title: 'Sản phẩm trending',
			query: 'trending',
			pathname: '/manage-product/list-product-status',
		},
	];

	return (
		<div className={styles.container}>
			<h4 className={styles.title}>Danh sách sản phẩm theo trạng thái</h4>
			<TabNavLink listHref={listTab} query='_type' />
			<div className={styles.main}>
				{!_type && <TableAllProductStatus />}
				{_type === 'hot' && <TableProductHot />}
				{_type === 'sale' && <TableProductSale />}
				{_type === 'trending' && <TableProductTrending />}
			</div>
		</div>
	);
}

export default MainListProductStatus;
