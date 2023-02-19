import {Warning2} from 'iconsax-react';
import React, {useState} from 'react';
import Button from '~/components/controls/Button';

import styles from './PopupCancelOrder.module.scss';
import orderService from '~/api/order';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import {useRouter} from 'next/router';
import LoadingData from '~/components/common/LoadingData';

interface TypePopup {
	onClose: () => void;
	idOrder: string;
}

function PopupCancelOrder({onClose, idOrder}: TypePopup) {
	const router = useRouter();

	const {token} = useSelector((state: RootState) => state.auth);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	// Hủy đơn hàng
	const handleSumit = async () => {
		try {
			const res: any = await orderService.cancelOrder({
				token: String(token),
				idOrder: idOrder,
			});
			if (res.status === 1) {
				toast.success(res.message || 'Hủy đơn hàng đã nhận thành công!');
				onClose();
				router.push('/profile/my-order?_type=cancelled');
			} else if (res.status === 0) {
				setIsLoading(false);
				toast.warn(res.message || 'Hủy đơn hàng đã nhận không thành công!');
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
				<Warning2 size={54} color='red' />
				<p className={styles.text}>Bạn có chắc chắn muốn hủy đơn hàng này?</p>
				<p className={styles.des}>Hủy đơn hàng sẽ không được khôi phục lại!</p>
				<div className={styles.group}>
					<Button bg_gray p_8_24 rounded_6 onClick={onClose}>
						Hủy
					</Button>
					<Button primary4 p_8_24 rounded_6 onClick={handleSumit}>
						Hủy đơn hàng
					</Button>
				</div>
			</div>
		</LoadingData>
	);
}

export default PopupCancelOrder;
