import React, {Fragment} from 'react';

import styles from './ChangeAddress.module.scss';
import Button from '~/components/controls/Button';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import clsx from 'clsx';

interface Type {
	setShow: () => void;
	setShowPopup: () => void;
	onSetDefaultAddress: (v: any) => void;
	addressDefault: any;
}

function ChangeAddress({setShow, setShowPopup, onSetDefaultAddress, addressDefault}: Type) {
	const {userData} = useSelector((state: RootState) => state.user);

	return (
		<Fragment>
			<div className={styles.top}>
				<h4>Địa chỉ nhận hàng</h4>
				<p
					onClick={() => {
						setShow();
						setShowPopup();
					}}
					className={styles.add_address}
				>
					Thêm địa chỉ nhận hàng
				</p>
			</div>

			{userData?.address.map((v: any) => (
				<div
					className={clsx(styles.item, {[styles.active]: v?.id === addressDefault?.id})}
					onClick={() => {
						onSetDefaultAddress(v);
					}}
				>
					<div className={styles.box_change}>
						<div className={styles.top}>
							<p className={styles.name}>{v?.name}</p>
							<p className={styles.phone}>0{Number(v?.phone)}</p>
						</div>
						<div className={styles.bottom}>
							<p className={styles.address}>
								{v?.specifically}, Xã <span>{v?.ward}</span>, Huyện{' '}
								<span>{v?.district}</span>, Tỉnh <span>{v?.city}</span>
							</p>
						</div>
					</div>
				</div>
			))}

			<div className={styles.group_btn}>
				<Button onClick={() => setShow()}>HỦY</Button>
				<Button className={styles.save} onClick={() => setShow()}>
					LƯU
				</Button>
			</div>
		</Fragment>
	);
}

export default ChangeAddress;
