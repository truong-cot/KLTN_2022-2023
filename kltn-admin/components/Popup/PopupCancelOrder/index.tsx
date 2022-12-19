import {Warning2} from 'iconsax-react';
import React from 'react';
import Button from '~/components/controls/Button';

import styles from './PopupCancelOrder.module.scss';

interface TypePopup {
	onClose: () => void;
	handleSumit: () => void;
}

function PopupCancelOrder({onClose, handleSumit}: TypePopup) {
	return (
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
	);
}

export default PopupCancelOrder;
