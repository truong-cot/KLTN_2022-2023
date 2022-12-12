import React from 'react';

import styles from './BoxCart.module.scss';
import Button from '~/components/controls/Button';
import {convertCoin} from '~/common/func/convertCoin';
import ItemCart from '../ItemCart';
import {TypeBoxCart} from './interfaces';
import {useRouter} from 'next/router';

function BoxCart({onClose}: TypeBoxCart) {
	const router = useRouter();

	const handleBuy = () => {
		onClose();
	};
	const handleShowCart = () => {
		onClose();
		router.push('/cart');
	};

	return (
		<div className={styles.conatiner}>
			<div className={styles.list_product}>
				<ItemCart
					_id={'6393f80d0dc71b36fa47b98a'}
					image='https://res.cloudinary.com/dwdpobmqg/image/upload/v1670641710/tbyjlwsejv5ldhnmycos.jpg'
					amount={3}
					name='Quần jean nam TMJ08'
					price={125000}
					onClose={onClose}
				/>
				<ItemCart
					_id={'6393f80d0dc71b36fa47b98a'}
					image='https://res.cloudinary.com/dwdpobmqg/image/upload/v1670641710/tbyjlwsejv5ldhnmycos.jpg'
					amount={3}
					name='Quần jean nam TMJ08'
					price={125000}
					onClose={onClose}
				/>
				<ItemCart
					_id={'6393f80d0dc71b36fa47b98a'}
					image='https://res.cloudinary.com/dwdpobmqg/image/upload/v1670641710/tbyjlwsejv5ldhnmycos.jpg'
					amount={3}
					name='Quần jean nam TMJ08'
					price={125000}
					onClose={onClose}
				/>
				<ItemCart
					_id={'6393f80d0dc71b36fa47b98a'}
					image='https://res.cloudinary.com/dwdpobmqg/image/upload/v1670641710/tbyjlwsejv5ldhnmycos.jpg'
					amount={3}
					name='Quần jean nam TMJ08'
					price={125000}
					onClose={onClose}
				/>
			</div>
			<div className={styles.bottom}>
				<div className={styles.total_price}>
					<p className={styles.text}>Thành tiền:</p>
					<p className={styles.price}>{convertCoin(7990000)}đ</p>
				</div>
			</div>
			<div className={styles.control}>
				<Button className={styles.buy} onClick={handleBuy}>
					Thanh toán giỏ hàng
				</Button>
				<Button className={styles.add} onClick={handleShowCart}>
					Thông tin giỏ hàng
				</Button>
			</div>
		</div>
	);
}

export default BoxCart;
