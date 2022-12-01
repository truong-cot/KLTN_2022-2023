import {useRouter} from 'next/router';
import React, {useState} from 'react';
import Pagination from '~/components/controls/Pagination';
import TabNavLink from '~/components/controls/TabNavLink';
import LayoutGrid from '~/components/layout/LayoutGrid';
import BoxFilterProduct from '../components/BoxFilterProduct';

import styles from './TrendyProducts.module.scss';

function TrendyProducts() {
	const router = useRouter();

	const pageSize = 10;
	const [page, setPage] = useState<number>(1);
	const [total, setTotal] = useState<number>(200);

	const _type = router.query._type;

	const listHref: Array<any> = [
		{
			title: 'Tất cả',
			pathname: '/',
			query: null,
		},
		{
			title: 'Áo len',
			pathname: '/',
			query: 'ao-len',
		},
		{
			title: 'Quần jeans',
			pathname: '/',
			query: 'quan-jeans',
		},
		{
			title: 'Áo phông',
			pathname: '/',
			query: 'ao-phong',
		},
	];

	const listProduct: Array<any> = [
		{
			id: 'product_1',
			image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
			type: 'type_1',
			name: 'Áo khoác gió',
			price_sale: 2000000,
			price: 3000000,
			star: 4.5,
		},
		{
			id: 'product_1',
			image: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
			type: 'type_1',
			name: 'Áo khoác gió',
			price_sale: 2000000,
			price: 3000000,
			star: 4.5,
		},
		{
			id: 'product_1',
			image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
			type: 'type_1',
			name: 'Áo khoác gió',
			price_sale: 2000000,
			price: 3000000,
			star: 4.5,
		},
		{
			id: 'product_1',
			image: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
			type: 'type_1',
			name: 'Áo khoác gió',
			price_sale: 2000000,
			price: 3000000,
			star: 4.5,
		},
	];

	const listProduct_2: Array<any> = [
		{
			id: 'product_1',
			image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
			type: 'type_1',
			name: 'Áo khoác gió',
			price_sale: 2000000,
			price: 3000000,
			star: 4.5,
		},
		{
			id: 'product_1',
			image: 'https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg',
			type: 'type_1',
			name: 'Áo khoác gió',
			price_sale: 2000000,
			price: 3000000,
			star: 4.5,
		},

		{
			id: 'product_1',
			image: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
			type: 'type_1',
			name: 'Áo khoác gió',
			price_sale: 2000000,
			price: 3000000,
			star: 4.5,
		},
		{
			id: 'product_1',
			image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
			type: 'type_1',
			name: 'Áo khoác gió',
			price_sale: 2000000,
			price: 3000000,
			star: 4.5,
		},
	];

	return (
		<LayoutGrid>
			<div className={styles.container}>
				<h4 className={styles.title}>Trendy products</h4>
				<div className={styles.tab}>
					<TabNavLink query='_type' listHref={listHref} />
				</div>

				{!_type && <BoxFilterProduct listProduct={listProduct} />}
				{_type && <BoxFilterProduct listProduct={listProduct_2} />}

				<div className={styles.pagination}>
					<Pagination
						total={total}
						onSetPage={setPage}
						pageSize={pageSize}
						currentPage={page}
					/>
				</div>
			</div>
		</LayoutGrid>
	);
}

export default TrendyProducts;
