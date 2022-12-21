import React from 'react';

import styles from './ItemOrder.module.scss';
import Image from 'next/image';
import backgrounds from '~/constants/images/backgrounds';
import {convertCoin} from '~/common/func/convertCoin';
import {TypeProductOrder} from './interfaces';

function ItemOrder({data}: TypeProductOrder) {
	return (
		<div className={styles.container}>
			<div className={styles.box_image}>
				<Image
					className={styles.image}
					src={String(data.image)}
					alt='image product'
					objectFit='cover'
					layout='fill'
				/>
			</div>
			<div className={styles.info}>
				<p className={styles.name}>{data.nameProduct}</p>
				<div className={styles.item}>
					<p className={styles.category}>Size:</p>
					<p className={styles.type}>{data.size}</p>
				</div>

				<div className={styles.item}>
					<p className={styles.category}>Số lượng:</p>
					<p className={styles.type}>{Number(data.amount)}</p>
				</div>
				<div className={styles.item}>
					<p className={styles.category}>Đơn giá:</p>
					<p className={styles.type}>{convertCoin(Number(data.price))}đ</p>
				</div>
				<div className={styles.item}>
					<p className={styles.category}>Thành tiền:</p>
					<p className={styles.type}>
						{convertCoin(
							(Number(data.price) - (Number(data.price) * Number(data.sale)) / 100) *
								Number(data.amount)
						)}
					</p>
				</div>
			</div>
		</div>
	);
}

export default ItemOrder;
