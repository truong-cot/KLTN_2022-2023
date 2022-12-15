import Link from 'next/link';
import React from 'react';

import styles from './MainAddress.module.scss';
import {GrAdd} from 'react-icons/gr';
import ItemAddress from '../ItemAddress';

function MainAddress() {
	return (
		<div className={styles.container}>
			<div className={styles.main}>
				<p className={styles.title}>Sổ địa chỉ</p>
				<Link href='' className={styles.top}>
					<div className={styles.icon}>
						<GrAdd />
					</div>
					<p className={styles.text}>Thêm địa chỉ mới</p>
				</Link>

				<div className={styles.list_address}>
					<ItemAddress main={true} />
					<ItemAddress />
				</div>
			</div>
		</div>
	);
}

export default MainAddress;
