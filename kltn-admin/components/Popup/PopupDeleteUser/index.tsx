import {Warning2} from 'iconsax-react';
import React from 'react';
import Button from '~/components/controls/Button';

import styles from './PopupDeleteUser.module.scss';

interface TypePopup {
	onClose: () => void;
	handleSumit: () => void;
}

function PopupDeleteUser({onClose, handleSumit}: TypePopup) {
	return (
		<div className={styles.container}>
			<Warning2 size={54} color='red' />
			<p className={styles.text}>Bạn có chắc chắn muốn xóa tài khoản này?</p>
			<p className={styles.des}>Xóa tài khoản sẽ không được khôi phục lại!</p>
			<div className={styles.group}>
				<Button bg_gray p_8_24 rounded_6 onClick={onClose}>
					Hủy
				</Button>
				<Button primary4 p_8_24 rounded_6 onClick={handleSumit}>
					Xóa
				</Button>
			</div>
		</div>
	);
}

export default PopupDeleteUser;
