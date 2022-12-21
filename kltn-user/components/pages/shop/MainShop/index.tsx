import clsx from 'clsx';
import Image from 'next/image';
import React, {useEffect, useState} from 'react';
import Select, {Option} from '~/components/controls/Select';
import GridColumn from '~/components/layout/GridColumn';
import LayoutGrid from '~/components/layout/LayoutGrid';
import ShopLayout from '~/components/layout/ShopLayout';
import icons from '~/constants/images/icons';
import InfoProduct from '../../home/components/InfoProduct';

import styles from './MainShop.module.scss';
import Pagination from '~/components/controls/Pagination';
import productService from '~/api/product';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import {toast} from 'react-toastify';
import {useRouter} from 'next/router';
import LoadingData from '~/components/common/LoadingData';

function MainShop() {
	const pageSize = 10;
	const [page, setPage] = useState<number>(1);
	const [total, setTotal] = useState<number>(200);
	const [activeLayout, setActiveLayout] = useState<number>(1);

	const [data, setData] = useState<Array<any>>([]);
	const [isLoading, setIsloading] = useState<boolean>(false);
	const {token} = useSelector((state: RootState) => state.auth);

	const [category, setCategory] = useState<Number>(0);
	const [statusFilter, setStatusFilter] = useState<Number>(0);

	const router = useRouter();

	const {type, status, priceMin, priceMax} = router.query;

	useEffect(() => {
		if (type === 'all') {
			setCategory(0);
		} else if (type === 'ao-len') {
			setCategory(1);
		} else if (type === 'quan-jeans') {
			setCategory(2);
		} else if (type === 'ao-phong') {
			setCategory(3);
		}
	}, [type]);

	useEffect(() => {
		if (status === 'all') {
			setStatusFilter(0);
		} else if (status === 'hot') {
			setStatusFilter(1);
		} else if (status === 'sale') {
			setStatusFilter(2);
		} else if (status === 'trending') {
			setStatusFilter(3);
		}
	}, [status]);

	useEffect(() => {
		(async () => {
			try {
				setIsloading(true);
				const res: any = await productService.getAllProduct({
					token: String(token),
					category: category,
					status: statusFilter,
					priceMin: priceMin ? Number(priceMin) : 0,
					priceMax: priceMax ? Number(priceMax) : 10000000,
					keyword: '',
					limit: 10,
					page: 1,
				});

				if (res.status === 1) {
					setData(res.data);
					setIsloading(false);
				} else {
					setIsloading(false);
				}
			} catch (error) {
				setIsloading(false);
				console.log(error);
				toast.error('Có lỗi xảy ra!');
			}
		})();
	}, [token, category, statusFilter, priceMin, priceMax]);

	return (
		<LoadingData isLoading={isLoading}>
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
									className={clsx(styles.icon, {
										[styles.active]: activeLayout === 1,
									})}
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
									className={clsx(styles.icon, {
										[styles.active]: activeLayout === 2,
									})}
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
							{data?.map((product: any, index: any) => (
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
		</LoadingData>
	);
}

export default MainShop;
