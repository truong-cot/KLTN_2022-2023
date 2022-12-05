import {Warning2} from 'iconsax-react';
import React from 'react';
import Button from '~/components/controls/Button';

import styles from './PopupChangeRole.module.scss';

interface TypePopup {
	handleSumit: () => void;
	onClose: () => void;
}

function PopupChangeRole({handleSumit, onClose}: TypePopup) {
	return (
		<div className={styles.container}>
			<Warning2 size={54} color='red' />
			<p className={styles.text}>Bạn có chắc chắn muốn thay đổi quyền cho tài khoản này?</p>
			<p className={styles.des}>Thay đổi quyền cho tài khoản này?</p>
			<div className={styles.group}>
				<Button bg_gray p_8_24 rounded_6 onClick={onClose}>
					Hủy
				</Button>
				<Button primary4 p_8_24 rounded_6 onClick={handleSumit}>
					Thay đổi
				</Button>
			</div>
		</div>
	);
}

export default PopupChangeRole;
