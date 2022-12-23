import React, {useEffect, useState} from 'react';

import orderService from '~/api/order';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import {TypeOrder} from './interfaces';
import {toast} from 'react-toastify';
import RequireAuth from '~/components/protected/RequiredAuth';
import LoadingData from '~/components/common/LoadingData';
import CheckDataEmpty from '~/components/common/CheckDataEmpty';
import ItemOrder from '../ItemOrder';
import styles from './MainOrderAccomplished.module.scss';
import Button from '~/components/controls/Button';

function MainOrderAccomplished() {
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
		if (item.statusOrder === 2) {
			listData.push(item);
		}
	}

	return (
		<RequireAuth>
			<LoadingData isLoading={isLoading}>
				<CheckDataEmpty isEmpty={listData?.length <= 0}>
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
				</CheckDataEmpty>
			</LoadingData>
		</RequireAuth>
	);
}

export default MainOrderAccomplished;
