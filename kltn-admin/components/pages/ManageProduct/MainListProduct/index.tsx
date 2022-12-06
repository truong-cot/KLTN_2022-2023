import React, {useState} from 'react';
import TabNavLink from '~/components/controls/TabNavLink';
import styles from './MainListProduct.module.scss';
import {useRouter} from 'next/router';
// import TableUserAll from '../TableUserAll';
// import TableAdmin from '../TableAdmin';
// import TableUser from '../TableUser';

function MainListProduct() {
	const listTab: Array<any> = [
		{
			title: 'Tất cả sản phẩm',
			query: null,
			pathname: '/manage-product/list-product',
		},
		{
			title: 'Sản phẩm hot',
			query: 'hot',
			pathname: '/manage-product/list-product',
		},
		{
			title: 'Sản phẩm được sale',
			query: 'sale',
			pathname: '/manage-product/list-product',
		},
		{
			title: 'Sản phẩm trending',
			query: 'trending',
			pathname: '/manage-product/list-product',
		},
	];

	return (
		<div className={styles.container}>
			<h4 className={styles.title}>Danh sách sản phẩm</h4>
			<TabNavLink listHref={listTab} query='_type' />
			<div className={styles.main}>
				{/* {!_type && <TableUserAll />}
				{_type === 'admin' && <TableAdmin />}
				{_type === 'user' && <TableUser />} */}
			</div>
		</div>
	);
}

export default MainListProduct;
