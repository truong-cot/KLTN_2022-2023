import React from 'react';

import styles from './InformationReceiver.module.scss';
import {TypeInformationReceiver} from './interfaces';

function InformationReceiver({show, data}: TypeInformationReceiver) {
	return (
		<div className={styles.container}>
			<div className={styles.change}>
				<h4>THÔNG TIN NGƯỜI NHẬN</h4>
				<p onClick={show}>Chỉnh sửa</p>
			</div>
			<div className={styles.top}>
				<p className={styles.name}>{data?.name}</p>
				<p className={styles.phone}>0{data?.phone}</p>
			</div>
			<div className={styles.bottom}>
				<p className={styles.address}>
					{data?.specifically}, Xã <span>{data?.ward}</span>, Huyện{' '}
					<span>{data?.district}</span>, Tỉnh <span>{data?.city}</span>
				</p>
			</div>
		</div>
	);
}

export default InformationReceiver;
