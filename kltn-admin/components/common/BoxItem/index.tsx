import React from 'react';

import styles from './BoxItem.module.scss';

function BoxItem() {
	return (
		<div className={styles.container}>
			<p className={styles.name}>Tất cả tài khoản</p>
			<p className={styles.des}>12345</p>
		</div>
	);
}

export default BoxItem;
