import Link from 'next/link';
import React, {Fragment, useState} from 'react';

import styles from './MainAddress.module.scss';
import {GrAdd} from 'react-icons/gr';
import ItemAddress from '../ItemAddress';
import Popup from '~/components/common/Popup';
import PopupAddAddress from '~/components/controls/PopupAddAddress';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';

function MainAddress() {
	const [show, setShow] = useState<boolean>(false);
	const {userData} = useSelector((state: RootState) => state.user);

	return (
		<Fragment>
			<div className={styles.container}>
				<div className={styles.main}>
					<p className={styles.title}>Sổ địa chỉ</p>
					<div className={styles.top} onClick={() => setShow(true)}>
						<div className={styles.icon}>
							<GrAdd />
						</div>
						<p className={styles.text}>Thêm địa chỉ mới</p>
					</div>

					<div className={styles.list_address}>
						{userData.address.map((v: any, i: Number) => (
							<ItemAddress key={v.id} data={v} />
						))}
					</div>
				</div>
			</div>
			{/* Popup */}
			<Popup open={show} onClose={() => setShow(false)}>
				<PopupAddAddress onClose={() => setShow(false)} />
			</Popup>
		</Fragment>
	);
}

export default MainAddress;
