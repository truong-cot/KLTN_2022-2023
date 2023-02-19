import {GiConfirmed} from 'react-icons/gi';
import React, {useState} from 'react';
import Button from '~/components/controls/Button';

import styles from './PopupConfirmationDelivery.module.scss';
import orderService from '~/api/order';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import {toast} from 'react-toastify';
import {useRouter} from 'next/router';
import LoadingData from '~/components/common/LoadingData';

interface TypePopup {
	onClose: () => void;
	idOrder: string;
}

function PopupConfirmationDelivery({onClose, idOrder}: TypePopup) {
	const router = useRouter();
	const {token} = useSelector((state: RootState) => state.auth);

	const [isLoading, setIsLoading] = useState<boolean>(false);

	// Xác nhận đã nhận hàng cho đơn hàng có trạng thái === 1
	const handleConfirmationDelivery = async () => {
		try {
			const res: any = await orderService.confirmationDelivery({
				token: String(token),
				idOrder: idOrder,
			});

			if (res.status === 1) {
				onClose();
				toast.success(res.message || 'Xác nhận đơn hàng đã nhận thành công!');
				router.push('/profile/my-order?_type=accomplished');
			} else if (res.status === 0) {
				setIsLoading(false);
				toast.warn(res.message || 'Xác nhận đơn hàng đã nhận không thành công!');
				onClose();
			}
		} catch (error) {
			setIsLoading(false);
			console.log(error);
			toast.error('Có lỗi xảy ra!');
			onClose();
		}
	};

	return (
		<LoadingData isLoading={isLoading}>
			<div className={styles.container}>
				<GiConfirmed size={54} color='green' />
				<p className={styles.text}>Bạn có chắc chắn muốn xác nhận đơn hàng này đã nhận?</p>
				<p className={styles.des}>Xác nhận đơn hàng đã nhận!</p>
				<div className={styles.group}>
					<Button bg_gray p_8_24 rounded_6 onClick={onClose}>
						Hủy
					</Button>
					<Button primary4 p_8_24 rounded_6 onClick={handleConfirmationDelivery}>
						Xác nhận
					</Button>
				</div>
			</div>
		</LoadingData>
	);
}

export default PopupConfirmationDelivery;
