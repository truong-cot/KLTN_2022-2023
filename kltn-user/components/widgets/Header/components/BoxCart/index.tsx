import React from 'react';

import styles from './BoxCart.module.scss';
import Button from '~/components/controls/Button';
import {convertCoin} from '~/common/func/convertCoin';
import ItemCart from '../ItemCart';
import {TypeBoxCart} from './interfaces';
import {useRouter} from 'next/router';
import {useMemo} from 'react';

function BoxCart({onClose, carts}: TypeBoxCart) {
	const router = useRouter();

	const handleShowCart = () => {
		onClose();
		router.push('/cart');
	};

	// Tính tổng tiền giỏ hàng
	const totalPriceCart = useMemo(() => {
		return carts.reduce(
			(accumulator, currentValue) => accumulator + Number(currentValue.totalPrice),
			0
		);
	}, [carts]);

	return (
		<div className={styles.conatiner}>
			<div className={styles.list_product}>
				{carts.map((v, i) => (
					<ItemCart key={i} data={v} onClose={onClose} />
				))}
			</div>
			<div className={styles.bottom}>
				<div className={styles.total_price}>
					<p className={styles.text}>Thành tiền:</p>
					<p className={styles.price}>{convertCoin(totalPriceCart)}đ</p>
				</div>
			</div>
			<div className={styles.control}>
				{/* <Button className={styles.add} onClick={handleShowCart}>
					Thông tin giỏ hàng
				</Button> */}
				<Button className={styles.buy} onClick={handleShowCart}>
					Thông tin giỏ hàng
				</Button>
			</div>
		</div>
	);
}

export default BoxCart;
