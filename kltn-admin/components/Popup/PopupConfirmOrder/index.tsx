import {GiConfirmed} from 'react-icons/gi';
import React from 'react';
import Button from '~/components/controls/Button';

import styles from './PopupConfirmOrder.module.scss';

interface TypePopup {
	handleSumit: () => void;
	onClose: () => void;
}

function PopupConfirmOrder({handleSumit, onClose}: TypePopup) {
	return (
		<div className={styles.container}>
			<GiConfirmed size={54} color='green' />
			<p className={styles.text}>Bạn có chắc chắn muốn xác nhận cho đơn hàng này?</p>
			<p className={styles.des}>Xác nhận cho đơn hàng này?</p>
			<div className={styles.group}>
				<Button bg_gray p_8_24 rounded_6 onClick={onClose}>
					Hủy
				</Button>
				<Button primary4 p_8_24 rounded_6 onClick={handleSumit}>
					Xác nhận
				</Button>
			</div>
		</div>
	);
}

export default PopupConfirmOrder;
