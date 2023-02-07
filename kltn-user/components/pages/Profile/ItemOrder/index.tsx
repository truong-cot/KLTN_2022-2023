import React, {Fragment, useState} from 'react';

import styles from './ItemOrder.module.scss';
import Image from 'next/image';
import {convertCoin} from '~/common/func/convertCoin';
import {TypeProductOrder} from './interfaces';
import Button from '~/components/controls/Button';
import Popup from '~/components/common/Popup';
import PopupEvaluate from '~/components/Popup/PopupEvaluate';
import RequireAuth from '~/components/protected/RequiredAuth';

function ItemOrder({data, check}: TypeProductOrder) {
	const [show, setShow] = useState<boolean>(false);
	const [idProduct, setIdProduct] = useState<String>('');

	return (
		<RequireAuth>
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
						<p className={styles.category}>Thành tiền:</p>
						<p className={styles.type}>
							{convertCoin(
								(Number(data.price) -
									(Number(data.price) * Number(data.sale)) / 100) *
									Number(data.amount)
							)}
						</p>
					</div>
					{/* <div className={styles.item}>
						<p className={styles.category}>Đơn giá:</p>
						<p className={styles.type}>{convertCoin(Number(data.totalPrice))}đ</p>
					</div> */}
				</div>
				{check && (
					<div className={styles.btn}>
						<Button
							bg_green
							p_4_24
							rounded_6
							onClick={() => {
								setShow(true);
								setIdProduct(data.idProduct);
							}}
						>
							Đánh giá sản phẩm
						</Button>
					</div>
				)}
			</div>
			{/* Popup */}
			<Popup open={show} onClose={() => setShow(false)}>
				<PopupEvaluate idProduct={idProduct} onClose={() => setShow(false)} />
			</Popup>
		</RequireAuth>
	);
}

export default ItemOrder;
