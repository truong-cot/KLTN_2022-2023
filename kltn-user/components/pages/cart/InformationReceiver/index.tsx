import React from 'react';

import styles from './InformationReceiver.module.scss';

interface Type {
	show: () => void;
}

function InformationReceiver({show}: Type) {
	return (
		<div className={styles.container}>
			<div className={styles.change}>
				<h4>THÔNG TIN NGƯỜI NHẬN</h4>
				<p onClick={show}>Chỉnh sửa</p>
			</div>
			<div className={styles.top}>
				<p className={styles.name}>Đặng Bá Trường</p>
				<p className={styles.phone}>0339940200</p>
			</div>
			<div className={styles.bottom}>
				<p className={styles.address}>
					Thôn Khánh Sơn, Xã <span>Sơn Lộc</span>, Huyện <span>Can Lộc</span>, Tỉnh{' '}
					<span>Hà Tĩnh</span>
				</p>
			</div>
		</div>
	);
}

export default InformationReceiver;
