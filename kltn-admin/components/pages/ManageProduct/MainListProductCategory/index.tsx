import React, {useState} from 'react';
import TabNavLink from '~/components/controls/TabNavLink';
import styles from './MainListProductCategory.module.scss';
import {useRouter} from 'next/router';
import TableProductHot from '../TableProductHot';
import TableProductSale from '../TableProductSale';
import TableProductTrending from '../TableProductTrending';
import TableAllProductStatus from '../TableAllProductStatus';
import TableAllProductCategory from '../TableAllProductCategory';
import TableProductSweater from '../TableProductSweater';
import TableProductJeans from '../TableProductJeans';
import TableProductTshirt from '../TableProductTshirt';

function MainListProductCategory() {
	const router = useRouter();
	const _type = router.query._type;

	const listTab: Array<any> = [
		{
			title: 'Tất cả sản phẩm',
			query: null,
			pathname: '/manage-product/list-product-category',
		},
		{
			title: 'Áo len',
			query: 'ao-len',
			pathname: '/manage-product/list-product-category',
		},
		{
			title: 'Quần Jeans',
			query: 'quan-jeans',
			pathname: '/manage-product/list-product-category',
		},
		{
			title: 'Áo Phông',
			query: 'ao-phong',
			pathname: '/manage-product/list-product-category',
		},
	];

	return (
		<div className={styles.container}>
			<h4 className={styles.title}>Danh sách sản phẩm theo loại sản phẩm</h4>
			<TabNavLink listHref={listTab} query='_type' />
			<div className={styles.main}>
				{!_type && <TableAllProductCategory />}
				{_type === 'ao-len' && <TableProductSweater />}
				{_type === 'quan-jeans' && <TableProductJeans />}
				{_type === 'ao-phong' && <TableProductTshirt />}
			</div>
		</div>
	);
}

export default MainListProductCategory;
