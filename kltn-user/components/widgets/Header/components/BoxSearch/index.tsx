import React, {Fragment, useEffect, useState} from 'react';

import styles from './BoxSearch.module.scss';
import ItemSearchProduct from '../ItemSearchProduct';
import useDebounce from '~/common/hooks/useDebounce';
import productService from '~/api/product';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import {toast} from 'react-toastify';
import LoadingData from '~/components/common/LoadingData';
import {useRouter} from 'next/router';
import icons from '~/constants/images/icons';
import Image from 'next/image';

interface Type {
	value: String;
	hide: () => void;
}

function BoxSearch({value, hide}: Type) {
	const router = useRouter();
	const [data, setData] = useState<any>([]);
	const [isLoading, setIsloading] = useState<boolean>(false);

	const {token} = useSelector((state: RootState) => state.auth);

	const valueDebounce = useDebounce(value, 500);

	useEffect(() => {
		(async () => {
			try {
				setIsloading(true);
				const res: any = await productService.getAllProduct({
					token: String(token),
					category: 0,
					status: 0,
					priceMin: 0,
					priceMax: 10000000,
					keyword: valueDebounce,
					limit: 100,
					page: 1,
				});

				if (res.status === 1) {
					setData(res.data.listProduct);
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
	}, [valueDebounce]);

	const handleBack = () => {
		router.push('/shop?type=all&status=all');
		hide();
	};

	return (
		<LoadingData isLoading={isLoading}>
			<div className={styles.container}>
				{data.length <= 0 ? (
					<div className={styles.main_empty}>
						<Image src={icons.emptyCart} alt='cart empty' />
						<p className={styles.text_empty}>Sản phẩm bạn tìm kiếm không có!</p>
						<div className={styles.btn_empty} onClick={handleBack}>
							<p>Tất cả sản phẩm</p>
						</div>
					</div>
				) : (
					<Fragment>
						{data.map((v: any, i: any) => (
							<ItemSearchProduct hide={hide} key={i} data={v} />
						))}
					</Fragment>
				)}
			</div>
		</LoadingData>
	);
}

export default BoxSearch;
