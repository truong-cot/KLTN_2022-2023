import React, {useMemo} from 'react';
import Image from 'next/image';

import styles from './ItemCart.module.scss';
import Link from 'next/link';
import {convertCoin} from '~/common/func/convertCoin';
import {RiDeleteBin5Line} from 'react-icons/ri';
import {TypeItemCart} from './interfaces';

function ItemCart({_id, name, image, amount, price, onClose}: TypeItemCart) {
	const lastPrice = useMemo(() => {
		return Number(amount) * Number(price);
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.box_image}>
				<Image
					className={styles.image}
					objectFit='cover'
					src={String(image)}
					alt='day la anh san pham'
					layout='fill'
				/>
			</div>
			<div className={styles.info}>
				<Link href={`/product/${_id}`} className={styles.name} onClick={onClose}>
					{String(name)}
				</Link>
				<div className={styles.total_price}>
					<span className={styles.qlt}>{Number(amount)}</span>
					<span className={styles.x}>x</span>
					<span className={styles.price}>{convertCoin(Number(price))}đ</span>
				</div>
				<div className={styles.des}>
					<p>Tạm tính: </p>
					<p className={styles.price}>{convertCoin(lastPrice)}đ</p>
				</div>
			</div>
			<div className={styles.delete} onClick={() => console.log('00')}>
				<RiDeleteBin5Line />
			</div>
		</div>
	);
}

export default ItemCart;
