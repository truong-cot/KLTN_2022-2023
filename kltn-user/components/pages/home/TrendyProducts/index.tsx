import Link from 'next/link';
import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import productService from '~/api/product';
import TabNavLink from '~/components/controls/TabNavLink';
import LayoutGrid from '~/components/layout/LayoutGrid';
import {RootState} from '~/redux/store';
import BoxFilterProduct from '../components/BoxFilterProduct';

import styles from './TrendyProducts.module.scss';

function TrendyProducts() {
	const router = useRouter();

	const _type = router.query._type;
	const [data, setData] = useState<Array<any>>([]);
	const [data_1, setData_1] = useState<Array<any>>([]);
	const [data_2, setData_2] = useState<Array<any>>([]);
	const [data_3, setData_3] = useState<Array<any>>([]);

	const {token} = useSelector((state: RootState) => state.auth);

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

	const [isloading, setIsloading] = useState<boolean>(false);

	// call api
	useEffect(() => {
		(async () => {
			try {
				setIsloading(true);
				const res: any = await productService.getAllProduct({
					token: String(token),
					category: 0,
					status: 0,
					priceMin: 0,
					priceMax: 1000000000,
					keyword: '',
					limit: 8,
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
	}, [token]);

	useEffect(() => {
		(async () => {
			try {
				setIsloading(true);
				const res: any = await productService.getAllProduct({
					token: String(token),
					category: 1,
					status: 0,
					priceMin: 0,
					priceMax: 1000000000,
					keyword: '',
					limit: 4,
					page: 1,
				});

				if (res.status === 1) {
					setData_1(res.data);
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
	}, [token]);

	useEffect(() => {
		(async () => {
			try {
				setIsloading(true);
				const res: any = await productService.getAllProduct({
					token: String(token),
					category: 2,
					status: 0,
					priceMin: 0,
					priceMax: 1000000000,
					keyword: '',
					limit: 4,
					page: 1,
				});

				if (res.status === 1) {
					setData_2(res.data);
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
	}, [token]);

	useEffect(() => {
		(async () => {
			try {
				setIsloading(true);
				const res: any = await productService.getAllProduct({
					token: String(token),
					category: 3,
					status: 0,
					priceMin: 0,
					priceMax: 1000000000,
					keyword: '',
					limit: 4,
					page: 1,
				});

				if (res.status === 1) {
					setData_3(res.data);
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
	}, [token]);

	return (
		<LayoutGrid>
			<div className={styles.container}>
				<h4 className={styles.title}>Trendy products</h4>
				<div className={styles.tab}>
					<TabNavLink query='_type' listHref={listHref} />
				</div>
				{!_type && <BoxFilterProduct listProduct={data} />}
				{_type === 'ao-len' && <BoxFilterProduct listProduct={data_1} />}
				{_type === 'quan-jeans' && <BoxFilterProduct listProduct={data_2} />}
				{_type === 'ao-phong' && <BoxFilterProduct listProduct={data_3} />}

				<Link className={styles.href} href='/shop?type=all&status=all'>
					Xem thêm ...
				</Link>
			</div>
		</LayoutGrid>
	);
}

export default TrendyProducts;
