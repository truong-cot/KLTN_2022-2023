import clsx from 'clsx';
import Image from 'next/image';
import React, {useState} from 'react';
import Select, {Option} from '~/components/controls/Select';
import GridColumn from '~/components/layout/GridColumn';
import LayoutGrid from '~/components/layout/LayoutGrid';
import ShopLayout from '~/components/layout/ShopLayout';
import icons from '~/constants/images/icons';
import InfoProduct from '../../home/components/InfoProduct';

import styles from './MainShop.module.scss';
import Pagination from '~/components/controls/Pagination';

function MainShop() {
	const pageSize = 10;
	const [page, setPage] = useState<number>(1);
	const [total, setTotal] = useState<number>(200);
	const [activeLayout, setActiveLayout] = useState<number>(1);

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
			image: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
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

	return (
		<div className={styles.container}>
			<LayoutGrid>
				<div className={styles.top}>
					<div className={styles.left}>
						<p className={styles.text_1}>Bộ lọc:</p>
						<p className={styles.delete}>Xóa bộ lọc</p>
					</div>
					<div className={styles.right}>
						{/* <p className={styles.text_right}>
							<span>Tổng</span> 10 <span>sản phẩm trên</span> 100{' '}
							<span>sản phẩm</span>
						</p> */}
						<div></div>
						<div className={styles.filter_right}>
							<span>Sắp xếp theo: </span>
							<Select placeholder='Sắp xếp theo'>
								<Option title='Sắp xếp theo tên' value='1' />
								<Option title='Sắp xếp theo ngày' value='2' />
								<Option title='Sắp xếp theo giá' value='3' />
							</Select>
							<span
								onClick={() => setActiveLayout(1)}
								className={clsx(styles.icon, {[styles.active]: activeLayout === 1})}
							>
								<svg width='16' height='10'>
									<rect x='0' y='0' width='4' height='4'></rect>
									<rect x='6' y='0' width='10' height='4'></rect>
									<rect x='0' y='6' width='4' height='4'></rect>
									<rect x='6' y='6' width='10' height='4'></rect>
								</svg>
							</span>
							<span
								onClick={() => setActiveLayout(2)}
								className={clsx(styles.icon, {[styles.active]: activeLayout === 2})}
							>
								<svg width='16' height='10'>
									<rect x='0' y='0' width='4' height='4'></rect>
									<rect x='6' y='0' width='4' height='4'></rect>
									<rect x='12' y='0' width='4' height='4'></rect>
									<rect x='0' y='6' width='4' height='4'></rect>
									<rect x='6' y='6' width='4' height='4'></rect>
									<rect x='12' y='6' width='4' height='4'></rect>
								</svg>
							</span>
						</div>
					</div>
				</div>
				<ShopLayout>
					<GridColumn col_3>
						{listProduct.map((product: any, index: any) => (
							<InfoProduct key={product.id} product={product} />
						))}
					</GridColumn>
				</ShopLayout>
				<div className={styles.pagination}>
					<Pagination
						total={total}
						onSetPage={setPage}
						pageSize={pageSize}
						currentPage={page}
					/>
				</div>
			</LayoutGrid>
		</div>
	);
}

export default MainShop;
