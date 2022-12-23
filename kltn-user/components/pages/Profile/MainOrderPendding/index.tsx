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
import styles from './MainOrderPendding.module.scss';
import Button from '~/components/controls/Button';
import Popup from '~/components/common/Popup';
import PopupCancelOrder from '~/components/Popup/PopupCancelOrder';
import {useRouter} from 'next/router';

function MainOrderPendding() {
	const {token} = useSelector((state: RootState) => state.auth);
	const {userData} = useSelector((state: RootState) => state.user);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [data, setData] = useState<Array<TypeOrder>>([]);
	const [showPopupCancel, setShowPopupCancel] = useState<boolean>(false);

	const [idOrder, setIdOrder] = useState<String>('');

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

	// Lấy những đơn hàng có trạng thái bằng 0 (đang chờ được xác nhận)
	for (var item of data) {
		if (item.statusOrder === 0) {
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
							<div className={styles.btn}>
								<Button
									bg_red
									p_4_24
									rounded_6
									onClick={() => {
										setShowPopupCancel(true);
										setIdOrder(v._id);
									}}
								>
									Hủy đơn hàng
								</Button>
							</div>
						</div>
					))}
				</CheckDataEmpty>
			</LoadingData>
			{/* Popup */}
			<Popup open={showPopupCancel} onClose={() => setShowPopupCancel(false)}>
				<PopupCancelOrder idOrder={idOrder} onClose={() => setShowPopupCancel(false)} />
			</Popup>
		</RequireAuth>
	);
}

export default MainOrderPendding;
