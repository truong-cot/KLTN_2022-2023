import React from 'react';
import Image from 'next/image';

import styles from './MainCart.module.scss';
import {AiFillStar} from 'react-icons/ai';
import {convertCoin} from '~/common/func/convertCoin';
import {IoMdClose} from 'react-icons/io';
import Button from '~/components/controls/Button';

function MainCart() {
	const data: Array<any> = [
		{
			id: 'th012312',
			name: 'Chain bucket bag Chain bucket bag Chain bucket bag Chain bucket bag Chain bucket bag Chain bucket bag',
			image: 'https://res.cloudinary.com/dwdpobmqg/image/upload/v1670641710/tbyjlwsejv5ldhnmycos.jpg',
			quantily: 3,
			price: 7900000,
			total: 790000,
		},
		{
			id: 'th012312',
			name: 'Chain bucket bag Chain bucket bag',
			image: 'https://res.cloudinary.com/dwdpobmqg/image/upload/v1670641710/tbyjlwsejv5ldhnmycos.jpg',
			quantily: 3,
			price: 7900000,
			total: 790000,
		},
		{
			id: 'th012312',
			name: 'Chain bucket bag Chain bucket bag',
			image: 'https://res.cloudinary.com/dwdpobmqg/image/upload/v1670641710/tbyjlwsejv5ldhnmycos.jpg',
			quantily: 3,
			price: 7900000,
			total: 790000,
		},
	];

	// Function handle
	const reduceQuantily = () => {};

	const increasingQuantily = () => {};
	return (
		<div className={styles.container}>
			<div className={styles.box_table}>
				<div>
					<table>
						<thead>
							<tr>
								<th>SẢN PHẨM</th>
								<th>ĐƠN GIÁ</th>
								<th>SỐ LƯỢNG</th>
								<th>THÀNH TIỀN</th>
								<th>THAO TÁC</th>
							</tr>
						</thead>

						<tbody>
							{data.map((item, index) => (
								<tr key={index}>
									<td>
										<div className={styles.box_image}>
											<Image
												objectFit='cover'
												className={styles.image}
												src={item.image}
												alt='image'
												layout='fill'
											/>
										</div>
										<div className={styles.info}>
											<h4>{item.name}</h4>
										</div>
									</td>
									<td>{convertCoin(item.price)} VND</td>
									<td>
										<p className={styles.qlt}>3</p>
									</td>
									<td>{convertCoin(item.price)} VND</td>
									<td>
										<div className={styles.box_icon}>
											<div className={styles.box}>
												<IoMdClose className={styles.icon} />
											</div>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				<div className={styles.main}>
					<h3 className={styles.title}>Giỏ hàng của bạn</h3>
					<div className={styles.cart_sub}>
						<p className={styles.text_sub}>Tổng tiền:</p>
						<p className={styles.price_sub}>{convertCoin(125000)}đ</p>
					</div>
					<div className={styles.shipping}>
						<p className={styles.text_sub}>Phương thức vận chuyển:</p>
						<div className={styles.item_method}>
							<div className={styles.input}>
								<input type='radio' id='ghn' name='method_transport' />
								<label htmlFor='ghn'>Giao hàng nhanh</label>
							</div>
							<p className={styles.text_method}>{convertCoin(30000)}đ</p>
						</div>
						<div className={styles.item_method}>
							<div className={styles.input}>
								<input type='radio' id='ghtk' name='method_transport' />
								<label htmlFor='ghtk'>Giao hàng tiết kiệm</label>
							</div>
							<p className={styles.text_method}>{convertCoin(30000)}đ</p>
						</div>
						<div className={styles.item_method}>
							<div className={styles.input}>
								<input type='radio' id='ghtn' name='method_transport' />
								<label htmlFor='ghtn'>Giao hàng tận nơi</label>
							</div>
							<p className={styles.text_method}>{convertCoin(30000)}đ</p>
						</div>
					</div>
					<div className={styles.total_payment}>
						<p className={styles.text_sub}>Tổng thanh toán:</p>
						<p className={styles.price_payment}>{convertCoin(125000)}đ</p>
					</div>
					<div className={styles.group_btn}>
						<Button href='/shop?type=all&status=all' className={styles.btn_2} p_10_32>
							Tiếp tục mua hàng
						</Button>
						<Button href='/payment' className={styles.btn_1} p_10_32>
							Thanh toán giỏ hàng
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default MainCart;
