import {Warning2} from 'iconsax-react';
import React, {useState} from 'react';
import Button from '~/components/controls/Button';

import styles from './PopupDeleteCart.module.scss';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import LoadingData from '~/components/common/LoadingData';
import cartService from '~/api/cart';
import {useRouter} from 'next/router';

interface TypePopup {
	onClose: () => void;
	idCart: String;
}

function PopupDeleteCart({onClose, idCart}: TypePopup) {
	const router = useRouter();

	const {token} = useSelector((state: RootState) => state.auth);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const deleteCart = async () => {
		setIsLoading(true);
		const res: any = await cartService.deleteCart({
			token: String(token),
			idCart: String(idCart),
		});

		if (res.status === 1) {
			setIsLoading(false);
			toast.success('Xóa giỏ hàng thành công!');
			router.reload();
			onClose();
		} else {
			toast.warn('Có lỗi xảy ra!');
			setIsLoading(false);
			onClose();
		}
	};

	return (
		<LoadingData isLoading={isLoading}>
			<div className={styles.container}>
				<Warning2 size={54} color='red' />
				<p className={styles.text}>Bạn có chắc chắn muốn đơn hàng ra khỏi giỏ hàng?</p>
				<p className={styles.des}>Xóa giỏ hàng sẽ không được khôi phục lại!</p>
				<div className={styles.group}>
					<Button bg_gray p_8_24 rounded_6 onClick={onClose}>
						Hủy
					</Button>
					<Button primary4 p_8_24 rounded_6 onClick={deleteCart}>
						Xóa giỏ hàng
					</Button>
				</div>
			</div>
		</LoadingData>
	);
}

export default PopupDeleteCart;
