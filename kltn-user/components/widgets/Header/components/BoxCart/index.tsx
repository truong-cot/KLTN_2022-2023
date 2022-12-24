import React, {Fragment} from 'react';

import styles from './BoxCart.module.scss';
import Button from '~/components/controls/Button';
import {convertCoin} from '~/common/func/convertCoin';
import ItemCart from '../ItemCart';
import {TypeBoxCart} from './interfaces';
import {useRouter} from 'next/router';
import {useMemo} from 'react';
import CheckDataEmpty from '~/components/common/CheckDataEmpty';
import Image from 'next/image';
import icons from '~/constants/images/icons';

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

	//
	const handleBack = () => {
		router.push('/shop?type=all&status=all');
		onClose();
	};

	return (
		<div className={styles.conatiner}>
			{carts.length <= 0 ? (
				<div className={styles.main_empty}>
					<Image src={icons.emptyCart} alt='cart empty' />
					<p className={styles.text_empty}>Bạn chưa thêm sản phẩm nào vào giỏ hàng!</p>
					<div className={styles.btn_empty} onClick={handleBack}>
						<p>Mua hàng</p>
					</div>
				</div>
			) : (
				<Fragment>
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
				</Fragment>
			)}
		</div>
	);
}

export default BoxCart;
