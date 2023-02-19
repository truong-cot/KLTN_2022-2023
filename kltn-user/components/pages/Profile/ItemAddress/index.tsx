import React, {Fragment, useState} from 'react';
import {BsCheckCircle} from 'react-icons/bs';
import Button from '~/components/controls/Button';
import {TypeItemAddress} from './interfaces';

import styles from './ItemAddress.module.scss';
import Popup from '~/components/common/Popup';
import PopupDeleteAddress from '~/components/Popup/PopupDeleteAddress';
import PopupChangeDefaultAddress from '~/components/Popup/PopupChangeDefaultAddress';

function ItemAddress({data}: TypeItemAddress) {
	const [show, setShow] = useState<boolean>(false);
	const [showChange, setShowChange] = useState<boolean>(false);
	const [idAddress, setIdAddress] = useState<string>('');

	return (
		<Fragment>
			<div className={styles.container}>
				<div className={styles.top}>
					<div className={styles.box_1}>
						<p>{data.name}</p>
						{data.isDefault && (
							<div className={styles.right}>
								<BsCheckCircle className={styles.icon} />
								<p>Địa chỉ mặc định</p>
							</div>
						)}
					</div>
					<div className={styles.box_2}>
						{data.isDefault === false && (
							<Button
								outline_1
								href=''
								className={styles.btn_edit}
								onClick={() => {
									setShowChange(true);
									setIdAddress(data.id);
								}}
							>
								Đặt làm địa chỉ mặc định
							</Button>
						)}
						<Button
							outline_1
							className={styles.btn_delete}
							onClick={() => {
								setShow(true);
								setIdAddress(data.id);
							}}
						>
							Xóa
						</Button>
					</div>
				</div>
				<div className={styles.bottom}>
					<p className={styles.text_1}>Địa chỉ: </p>
					<p className={styles.text_2}>
						<span>{data.specifically}</span>, Xã <span>{data.ward}</span>, Huyện{' '}
						<span>{data.district}</span>, Tỉnh <span>{data.city}</span>
					</p>
				</div>

				<div className={styles.bottom}>
					<p className={styles.text_1}>Số điện thoại: </p>
					<p className={styles.text_2}>0{Number(data.phone)}</p>
				</div>
			</div>
			{/* Popup */}
			<Popup open={show} onClose={() => setShow(false)}>
				<PopupDeleteAddress idAddress={idAddress} onClose={() => setShow(false)} />
			</Popup>
			<Popup open={showChange} onClose={() => setShowChange(false)}>
				<PopupChangeDefaultAddress
					idAddress={idAddress}
					onClose={() => setShowChange(false)}
				/>
			</Popup>
		</Fragment>
	);
}

export default ItemAddress;
