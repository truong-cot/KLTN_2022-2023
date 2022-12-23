import React, {useEffect, useMemo, useState} from 'react';
import Image from 'next/image';

import styles from './MainCart.module.scss';
import {convertCoin} from '~/common/func/convertCoin';
import {IoMdClose} from 'react-icons/io';
import Button from '~/components/controls/Button';
import {RootState} from '~/redux/store';
import {useSelector} from 'react-redux';
import cartService from '~/api/cart';
import {toast} from 'react-toastify';
import {useRouter} from 'next/router';
import RequireAuth from '~/components/protected/RequiredAuth';
import {setItemStorage} from '~/common/func/localStorage';
import LoadingData from '~/components/common/LoadingData';

function MainCart() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const {token} = useSelector((state: RootState) => state.auth);

	const [shippingMethod, setShippingMethod] = useState<Number>(1);
	const [priceShipping, setpriceShipping] = useState<Number>(30000);

	const {carts} = useSelector((state: RootState) => state.cart);

	const deleteCart = async (id: String) => {
		setIsLoading(true);

		const res: any = await cartService.deleteCart({
			token: String(token),
			idCart: String(id),
		});

		if (res.status === 1) {
			setIsLoading(false);
			toast.success('Xóa giỏ hàng thành công!');
			router.reload(); // reload page
		} else {
			toast.warn('Có lỗi xảy ra!');
			setIsLoading(false);
		}
	};

	// Tính tổng tiền giỏ hàng
	const totalPriceCart = useMemo(() => {
		return carts.reduce(
			(accumulator, currentValue) => accumulator + Number(currentValue.totalPrice),
			0
		);
	}, [carts, router]);

	// Tính tổng tiền
	const totalPrice = useMemo(() => {
		return Number(totalPriceCart) + Number(priceShipping);
	}, [priceShipping, totalPriceCart, carts]);

	// Gửi data qua trang thanh toán
	const handlePayment = () => {
		if (shippingMethod === 1) {
			setItemStorage('moneyShipping', 30000);
			setItemStorage('shippingMethod', 1);
		} else if (shippingMethod === 2) {
			setItemStorage('moneyShipping', 40000);
			setItemStorage('shippingMethod', 2);
		} else if (shippingMethod === 3) {
			setItemStorage('moneyShipping', 50000);
			setItemStorage('shippingMethod', 3);
		}

		router.push('/payment');
	};

	useEffect(() => {
		if (carts.length <= 0) {
			router.push('/shop?type=all&status=all');
		}
	}, [router, carts]);

	return (
		<RequireAuth>
			<LoadingData isLoading={isLoading}>
				<div className={styles.container}>
					<div className={styles.box_table}>
						<div>
							<table>
								<thead>
									<tr>
										<th>SẢN PHẨM</th>
										<th>SIZE</th>
										<th>ĐƠN GIÁ</th>
										<th>SỐ LƯỢNG</th>
										<th>THÀNH TIỀN</th>
										<th>THAO TÁC</th>
									</tr>
								</thead>

								<tbody>
									{carts.map((v, i) => (
										<tr key={String(v._id)}>
											<td>
												<div className={styles.box_image}>
													<Image
														objectFit='cover'
														className={styles.image}
														src={String(v.image)}
														alt='image'
														layout='fill'
													/>
												</div>
												<div className={styles.info}>
													<h4>{v.nameProduct}</h4>
												</div>
											</td>
											<td>{v.size}</td>
											<td>{convertCoin(Number(v.price))} VND</td>
											<td>
												<div className={styles.box_quantity}>
													<div className={styles.box}>
														{/* <span
															onClick={() => reduceQuantily(v._id)}
															className={styles.text_ff}
														>
															-
														</span> */}
														<span className={styles.text_qlt}>
															{v.amount}
														</span>
														{/* <span
															onClick={() =>
																increasingQuantily(v._id)
															}
															className={styles.text_ff}
														>
															+
														</span> */}
													</div>
												</div>
											</td>
											<td>{convertCoin(Number(v.totalPrice))} VND</td>
											<td>
												<div
													className={styles.box_icon}
													onClick={() => deleteCart(String(v._id))}
												>
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
								<p className={styles.price_sub}>
									{convertCoin(Number(totalPriceCart))}đ
								</p>
							</div>
							<div className={styles.shipping}>
								<p className={styles.text_sub}>Phương thức vận chuyển:</p>
								<div className={styles.item_method}>
									<div
										className={styles.input}
										onClick={() => setpriceShipping(30000)}
									>
										<input
											type='radio'
											id='ghn'
											name='method_transport'
											value={1}
											onChange={(e) =>
												setShippingMethod(Number(e.target.value))
											}
											checked={shippingMethod === 1}
										/>
										<label htmlFor='ghn'>Giao tiết kiệm</label>
									</div>
									<p className={styles.text_method}>{convertCoin(30000)}đ</p>
								</div>
								<div className={styles.item_method}>
									<div
										className={styles.input}
										onClick={() => setpriceShipping(40000)}
									>
										<input
											type='radio'
											id='ghtk'
											name='method_transport'
											value={2}
											onChange={(e) =>
												setShippingMethod(Number(e.target.value))
											}
											checked={shippingMethod === 2}
										/>
										<label htmlFor='ghtk'>Giao hàng nhanh</label>
									</div>
									<p className={styles.text_method}>{convertCoin(40000)}đ</p>
								</div>
								<div className={styles.item_method}>
									<div
										className={styles.input}
										onClick={() => setpriceShipping(50000)}
									>
										<input
											type='radio'
											id='ghtn'
											name='method_transport'
											value={3}
											onChange={(e) =>
												setShippingMethod(Number(e.target.value))
											}
											checked={shippingMethod === 3}
										/>
										<label htmlFor='ghtn'>Giao hàng tận nơi</label>
									</div>
									<p className={styles.text_method}>{convertCoin(50000)}đ</p>
								</div>
							</div>
							<div className={styles.total_payment}>
								<p className={styles.text_sub}>Tổng thanh toán:</p>
								<p className={styles.price_payment}>
									{convertCoin(Number(totalPrice))}đ
								</p>
							</div>
							<div className={styles.group_btn}>
								<Button
									href='/shop?type=all&status=all'
									className={styles.btn_2}
									p_10_32
								>
									Tiếp tục mua hàng
								</Button>
								<Button onClick={handlePayment} className={styles.btn_1} p_10_32>
									Thanh toán giỏ hàng
								</Button>
							</div>
						</div>
					</div>
				</div>
			</LoadingData>
		</RequireAuth>
	);
}

export default MainCart;
