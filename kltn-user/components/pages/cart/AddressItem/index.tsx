import clsx from 'clsx';
import React from 'react';

import styles from './AddressItem.module.scss';

interface TypeItemAddress {
	data: {
		_id: String;
		name: String;
		phone: String;
		address: String;
	};
	active?: boolean;
}

function AddressItem({data, active}: TypeItemAddress) {
	return (
		<div className={clsx(styles.item, {[styles.active]: active})}>
			<div className={styles.box_change}>
				<div className={styles.top}>
					<p className={styles.name}>{data.name}</p>
					<p className={styles.phone}>{data.phone}</p>
				</div>
				<div className={styles.bottom}>
					<p className={styles.address}>{data.address}</p>
				</div>
			</div>
		</div>
	);
}

export default AddressItem;
