import React from 'react';
import {BsCheckCircle} from 'react-icons/bs';
import Button from '~/components/controls/Button';
import {TypeItemAddress} from './interfaces';

import styles from './ItemAddress.module.scss';

function ItemAddress({main}: TypeItemAddress) {
	return (
		<div className={styles.container}>
			<div className={styles.top}>
				<div className={styles.box_1}>
					<p>Đặng Bá Trường</p>
					{main && (
						<div className={styles.right}>
							<BsCheckCircle className={styles.icon} />
							<p>Địa chỉ mặc định</p>
						</div>
					)}
				</div>
				<div className={styles.box_2}>
					<Button outline_1 className={styles.btn_delete}>
						Xóa
					</Button>
					<Button outline_1 href='' className={styles.btn_edit}>
						Chỉnh sửa
					</Button>
				</div>
			</div>
			<div className={styles.bottom}>
				<p className={styles.text_1}>Địa chỉ: </p>
				<p className={styles.text_2}>
					<span>Can Lộc</span>, Xã <span>Bình Chánh</span>, Huyện <span>Châu Phú</span>,
					Tỉnh <span>An Giang</span>
				</p>
			</div>

			<div className={styles.bottom}>
				<p className={styles.text_1}>Số điện thoại: </p>
				<p className={styles.text_2}>0123456789</p>
			</div>
		</div>
	);
}

export default ItemAddress;
