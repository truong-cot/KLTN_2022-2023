import {GiConfirmed} from 'react-icons/gi';
import React from 'react';
import Button from '~/components/controls/Button';

import styles from './PopupConfirmationDelivery.module.scss';

interface TypePopup {
	handleSumit: () => void;
	onClose: () => void;
}

function PopupConfirmationDelivery({handleSumit, onClose}: TypePopup) {
	return (
		<div className={styles.container}>
			<GiConfirmed size={54} color='green' />
			<p className={styles.text}>Bạn có chắc chắn muốn xác nhận đơn hàng này đã nhận?</p>
			<p className={styles.des}>Xác nhận đơn hàng đã nhận!</p>
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

export default PopupConfirmationDelivery;
