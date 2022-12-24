import React, {Fragment, useEffect, useState} from 'react';

import orderService from '~/api/order';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import {TypeOrder} from './interfaces';
import {toast} from 'react-toastify';
import RequireAuth from '~/components/protected/RequiredAuth';
import LoadingData from '~/components/common/LoadingData';
import ItemOrder from '../ItemOrder';
import styles from './MainOrderCancelled.module.scss';

import Image from 'next/image';
import icons from '~/constants/images/icons';
import {useRouter} from 'next/router';

function MainOrderCancelled() {
	const router = useRouter();

	const {token} = useSelector((state: RootState) => state.auth);
	const {userData} = useSelector((state: RootState) => state.user);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [data, setData] = useState<Array<TypeOrder>>([]);

	var listData: Array<TypeOrder> = [];

	// Lấy danh sách đơn hàng
	useEffect(() => {
		(async () => {
			try {
				setIsLoading(true);
				const res: any = await orderService.getOrderUser({
					token: String(token),
					idUser: userData._id,
				});

				if (res.status === 1) {
					setData(res.data);
					setIsLoading(false);
				} else {
					setIsLoading(false);
				}
			} catch (error) {
				setIsLoading(false);
				console.log(error);
				toast.error('Có lỗi xảy ra!');
			}
		})();
	}, [token]);

	//
	for (var item of data) {
		if (item.statusOrder === 3) {
			listData.push(item);
		}
	}

	const handleBack = () => {
		router.push('/shop?type=all&status=all');
	};

	return (
		<RequireAuth>
			<LoadingData isLoading={isLoading}>
				{listData.length <= 0 ? (
					<div className={styles.main_empty}>
						<Image src={icons.emptyCart} alt='cart empty' />
						<p className={styles.text_empty}>
							Bạn chưa thêm sản phẩm nào vào giỏ hàng!
						</p>
						<div className={styles.btn_empty} onClick={handleBack}>
							<p>Mua hàng</p>
						</div>
					</div>
				) : (
					<Fragment>
						{listData.map((v, i) => (
							<div key={i} className={styles.main}>
								{v.products.map((v, i) => (
									<ItemOrder data={v} key={i} />
								))}
								{/* <div className={styles.btn}>
								<Button bg_red p_4_24 rounded_6>
									Hủy đơn hàng
								</Button>
							</div> */}
							</div>
						))}
					</Fragment>
				)}
			</LoadingData>
		</RequireAuth>
	);
}

export default MainOrderCancelled;
