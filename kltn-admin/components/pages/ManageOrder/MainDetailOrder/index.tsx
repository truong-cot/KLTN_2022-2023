import {useRouter} from 'next/router';
import React, {useState, Fragment, useEffect} from 'react';
import {convertCoin} from '~/common/func/convertCoin';
import DataTable from '~/components/common/DataTable';
import Popup from '~/components/common/Popup';
import Button from '~/components/controls/Button';
import PopupConfirmOrder from '~/components/Popup/PopupConfirmOrder';

import styles from './MainDetailOrder.module.scss';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import orderService from '~/api/order';
import {toast} from 'react-toastify';
import RequireAuth from '~/components/protected/RequiredAuth';
import LoadingData from '~/components/common/LoadingData';
import {TypeOrder, TypeProductOrder} from './interfaces';
import convertDate from '~/common/func/convertDate';
import PopupConfirmationDelivery from '~/components/Popup/PopupConfirmationDelivery';
import PopupCancelOrder from '~/components/Popup/PopupCancelOrder';

function MainDetailOrder() {
	const router = useRouter();

	const idOrder = router.asPath.split('/')[3];
	const {token} = useSelector((state: RootState) => state.auth);

	const [show, setShow] = useState<boolean>(false);
	const [showPopupDelivery, setShowPopupDelivery] = useState<boolean>(false);
	const [showPopupCancel, setShowPopupCancel] = useState<boolean>(false);

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [data, setData] = useState<TypeOrder>();

	const [products, setProducts] = useState<Array<TypeProductOrder>>([]);

	// Lấy chi tiết đơn hàng
	useEffect(() => {
		(async () => {
			try {
				setIsLoading(true);
				const res: any = await orderService.getDetailOrder({
					token: String(token),
					idOrder: String(idOrder),
				});

				if (res.status === 1) {
					setData(res.data);
					setProducts(res.data.products);
					setIsLoading(false);
				} else {
					setIsLoading(false);
				}
			} catch (error) {
				setIsLoading(false);
				console.log(error);
				toast.error('Có lỗi xảy ra!');
			}
		})();
	}, [idOrder]);

	// Xác nhận đơn hàng cho đơn hàng có trạng thái === 0
	const handleConfirmationOrder = async () => {
		try {
			const res: any = await orderService.confirmationOrder({
				token: String(token),
				idOrder: idOrder,
			});

			if (res.status === 1) {
				setIsLoading(false);
				toast.success(res.message || 'Xác nhận đơn hàng thành công!');
				setShow(false);
				router.push('/manage-order?_type=delivering');
			} else if (res.status === 0) {
				setIsLoading(false);
				toast.warn(res.message || 'Xác nhận đơn hàng không thành công!');
				setShow(false);
			}
		} catch (error) {
			setIsLoading(false);
			console.log(error);
			toast.error('Có lỗi xảy ra!');
			setShow(false);
		}
	};

	// Xác nhận đã nhận hàng cho đơn hàng có trạng thái === 1
	const handleConfirmationDelivery = async () => {
		try {
			const res: any = await orderService.confirmationDelivery({
				token: String(token),
				idOrder: idOrder,
			});

			if (res.status === 1) {
				setShowPopupDelivery(false);
				toast.success(res.message || 'Xác nhận đơn hàng đã nhận thành công!');
				router.push('/manage-order?_type=complete');
			} else if (res.status === 0) {
				setIsLoading(false);
				toast.warn(res.message || 'Xác nhận đơn hàng đã nhận không thành công!');
				setShowPopupDelivery(false);
			}
		} catch (error) {
			setIsLoading(false);
			console.log(error);
			toast.error('Có lỗi xảy ra!');
			setShowPopupDelivery(false);
		}
	};

	// Hủy đơn hàng
	const handleCancelOrder = async () => {
		try {
			const res: any = await orderService.cancelOrder({
				token: String(token),
				idOrder: idOrder,
			});

			if (res.status === 1) {
				toast.success(res.message || 'Hủy đơn hàng đã nhận thành công!');
				setShowPopupCancel(false);
				router.push('/manage-order?_type=cancelled');
			} else if (res.status === 0) {
				setIsLoading(false);
				toast.warn(res.message || 'Hủy đơn hàng đã nhận không thành công!');
				setShowPopupCancel(false);
			}
		} catch (error) {
			setIsLoading(false);
			console.log(error);
			toast.error('Có lỗi xảy ra!');
			setShowPopupCancel(false);
		}
	};

	return (
		<RequireAuth>
			<LoadingData isLoading={isLoading}>
				<div className={styles.container}>
					<h4 className={styles.title}>Chi tiết đơn hàng</h4>
					<div className={styles.main}>
						<div className={styles.left}>
							<div className={styles.item}>
								<p className={styles.text_1}>Tên người dùng :</p>
								<p className={styles.text_2}>{data?.nameUser}</p>
							</div>
							<div className={styles.item}>
								<p className={styles.text_1}>Tên người nhận :</p>
								<p className={styles.text_2}>{data?.nameReceiver}</p>
							</div>

							<div className={styles.item}>
								<p className={styles.text_1}>Số điện thoại :</p>
								<p className={styles.text_2}>{Number(data?.phone)}</p>
							</div>
							<div className={styles.item}>
								<p className={styles.text_1}>Địa chị giao hàng :</p>
								<p className={styles.text_2}>{data?.address}</p>
							</div>
							<div className={styles.item}>
								<p className={styles.text_1}>Phương thức giao hàng</p>
								<p className={styles.text_2}>
									{Number(data?.shippingMethod) === 1
										? 'Giao hàng tiết kiệm'
										: Number(data?.shippingMethod) === 2
										? 'Giao hàng nhanh'
										: 'Giao hàng tận nơi'}
								</p>
							</div>
							<div className={styles.item}>
								<p className={styles.text_1}>Tổng giá trị đơn hàng :</p>
								<p className={styles.text_2}>
									{convertCoin(Number(data?.totalPrice))}đ
								</p>
							</div>
							<div className={styles.item}>
								<p className={styles.text_1}>Số lượng sản phẩm :</p>
								<p className={styles.text_2}>{products.length}</p>
							</div>
							<div className={styles.item}>
								<p className={styles.text_1}>Ngày đặt hàng :</p>
								<p className={styles.text_2}>
									{convertDate(String(data?.createdAt)).getFullDateTime()}
								</p>
							</div>
							<div className={styles.item}>
								<p className={styles.text_1}>Ngày cập nhật :</p>
								<p className={styles.text_2}>
									{convertDate(String(data?.updatedAt)).getFullDateTime()}
								</p>
							</div>
							<div className={styles.item}>
								<p className={styles.text_1}>Ghi chú :</p>
								<p className={styles.text_2}>
									{data?.note ? data.note : 'Đơn hàng không có ghi chú!'}
								</p>
							</div>
							<div className={styles.item}>
								<p className={styles.text_1}>Trạng thái đơn hàng :</p>
								<p className={styles.text_2}>
									{data?.statusOrder === 0
										? 'Đơn hàng đang chờ xác nhận'
										: data?.statusOrder === 1
										? 'Đơn hàng đang được giao'
										: data?.statusOrder === 2
										? 'Đơn hàng giao thành công'
										: 'Đơn hàng đã hủy'}
								</p>
							</div>
						</div>
						<div className={styles.list_product}>
							<p className={styles.text_1}>Danh sách sản phẩm :</p>
							<div className={styles.table}>
								<DataTable
									data={products}
									columns={[
										{
											title: 'Tên sản phẩm',
											template: (data: TypeProductOrder) => (
												<p>{data.nameProduct || 'Chưa cập nhật'}</p>
											),
										},

										{
											title: 'Đơn giá',
											template: (data: TypeProductOrder) => (
												<p>{convertCoin(Number(data.price))}đ</p>
											),
										},
										{
											title: 'Giảm giá',
											template: (data: TypeProductOrder) => (
												<p>{convertCoin(Number(data.sale))}%</p>
											),
										},
										{
											title: 'Số lượng',
											template: (data: TypeProductOrder) => (
												<p>{Number(data.amount) || 'Chưa cập nhật'}</p>
											),
										},
										{
											title: 'Thành tiền',
											template: (data: TypeProductOrder) => (
												<p>
													{convertCoin(
														(Number(data.price) -
															(Number(data.price) *
																Number(data.sale)) /
																100) *
															Number(data.amount)
													)}
													đ
												</p>
											),
										},
									]}
								></DataTable>
							</div>
						</div>

						<div className={styles.group_btn}>
							<Button bg_gray p_8_24 rounded_6 onClick={() => router.back()}>
								Quay lại
							</Button>
							{(data?.statusOrder === 1 || data?.statusOrder === 0) && (
								<Button
									bg_red
									p_8_24
									rounded_6
									onClick={() => setShowPopupCancel(true)}
								>
									Hủy đơn hàng
								</Button>
							)}

							{data?.statusOrder === 1 && (
								<Button
									primary4
									p_8_24
									rounded_6
									onClick={() => setShowPopupDelivery(true)}
								>
									Xác nhận đã nhận hàng
								</Button>
							)}

							{data?.statusOrder === 0 && (
								<Button primary4 p_8_24 rounded_6 onClick={() => setShow(true)}>
									Xác nhận đơn
								</Button>
							)}
						</div>
					</div>
				</div>
			</LoadingData>
			{/* Popup */}
			<Popup open={show} onClose={() => setShow(false)}>
				<PopupConfirmOrder
					handleSumit={handleConfirmationOrder}
					onClose={() => setShow(false)}
				/>
			</Popup>
			<Popup open={showPopupDelivery} onClose={() => setShowPopupDelivery(false)}>
				<PopupConfirmationDelivery
					handleSumit={handleConfirmationDelivery}
					onClose={() => setShowPopupDelivery(false)}
				/>
			</Popup>
			<Popup open={showPopupCancel} onClose={() => setShowPopupCancel(false)}>
				<PopupCancelOrder
					handleSumit={handleCancelOrder}
					onClose={() => setShowPopupCancel(false)}
				/>
			</Popup>
		</RequireAuth>
	);
}

export default MainDetailOrder;
