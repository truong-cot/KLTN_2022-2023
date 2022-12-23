import React, {Fragment, useEffect, useMemo, useState} from 'react';
import {convertCoin} from '~/common/func/convertCoin';

import styles from './MainPayment.module.scss';
import Button from '~/components/controls/Button';
import clsx from 'clsx';
import InputLight from '~/components/controls/InputLight';
import Popup from '~/components/common/Popup';
import {deleteItemStorage, getItemStorage} from '~/common/func/localStorage';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import {TypeFrom, TypeItemAddress} from './interfaces';
import cartService from '~/api/cart';
import {toast} from 'react-toastify';
import {useRouter} from 'next/router';
import useLocationForm from '~/common/hooks/useLocationForm';
import Select from 'react-select';
import orderService from '~/api/order';
import InformationReceiver from '../InformationReceiver';
import PopupAddAddress from '~/components/controls/PopupAddAddress';
import ChangeAddress from '../ChangeAddress';

function MainPayment() {
	const router = useRouter();
	const moneyShipping = getItemStorage('moneyShipping');
	const shippingMethod = getItemStorage('shippingMethod');
	const {token} = useSelector((state: RootState) => state.auth);
	const {userData} = useSelector((state: RootState) => state.user);

	const [show, setShow] = useState<boolean>(false);
	const [showPopup, setShowPopup] = useState<boolean>(false);

	const [city, setCity] = useState<any>('');
	const [district, setDistrict] = useState<any>('');
	const [ward, setWard] = useState<any>('');

	const [addressDefault, setAddressDefault] = useState<TypeItemAddress>();
	const [attention, setAttention] = useState<String>('');

	const {state, onCitySelect, onDistrictSelect, onWardSelect} = useLocationForm(true);
	const {
		cityOptions,
		districtOptions,
		wardOptions,
		selectedCity,
		selectedDistrict,
		selectedWard,
	} = state;

	// tạo state để lưu giá trị của form
	const [valueForm, setValueForm] = useState<TypeFrom>({
		name: '',
		phone: '',
		city: '',
		district: '',
		ward: '',
		specific: '',
		note: '',
	});

	// Style react-select
	const customStyles = {
		control: (base: any) => ({
			...base,
			margin: '0px',
		}),

		valueContainer: (provided: any, state: any) => ({
			...provided,
			margin: '0px',
			padding: '13px',
		}),

		input: (provided: any, state: any) => ({
			...provided,
			margin: '0px',
			padding: '0',
		}),
	};

	// Lấy danh sách giỏ hàng
	const {carts} = useSelector((state: RootState) => state.cart);

	// Tính tổng tiền giỏ hàng
	const totalPriceCart = useMemo(() => {
		return carts.reduce(
			(accumulator, currentValue) => accumulator + Number(currentValue.totalPrice),
			0
		);
	}, [carts, router]);

	// lấy dữ liệu từ input
	const handleChangeInput = (e: any) => {
		const {name, value} = e.target;

		setValueForm((prev) => {
			return {
				...prev,
				[name]: value,
			};
		});
	};

	// Lấy value form
	const getCity = (option: any) => {
		onCitySelect(option);
		setCity(option);
	};

	const getDistrict = (option: any) => {
		onDistrictSelect(option);
		setDistrict(option);
	};
	const getWard = (option: any) => {
		onWardSelect(option);
		setWard(option);
	};

	// Set value form
	valueForm.city = city.label;
	valueForm.district = district.label;
	valueForm.ward = ward.label;

	// Function callback
	const callbackSetAddress = (address: any) => {
		setAddressDefault(address);
	};

	// Lấy địa chỉ mặc định
	useEffect(() => {
		for (var address of userData.address) {
			if (address.isDefault) {
				callbackSetAddress(address);
			} else {
				callbackSetAddress(userData.address[0]);
			}
		}
	}, [userData]);

	// Function delete cart
	const deleteCart = async (id: String) => {
		const res: any = await cartService.deleteCart({
			token: String(token),
			idCart: String(id),
		});

		if (res.status === 1) {
			// toast.success('Xóa giỏ hàng thành công!');
			router.reload(); // reload page
		} else {
			toast.warn('Có lỗi xảy ra!');
		}
	};

	// Xử lý thành toán
	const handlePayment = async () => {
		if (addressDefault) {
			const address_1 = `${addressDefault.specifically}, ${addressDefault.ward}, ${addressDefault.district}, ${addressDefault.city}`;

			const res: any = await orderService.createOrder({
				token: String(token),
				idUser: String(userData._id),
				nameUser: String(userData.name),
				nameReceiver: String(addressDefault.name),
				phone: Number(addressDefault.phone),
				address: address_1,
				shippingMethod: Number(shippingMethod),
				note: attention,
				products: carts,
			});

			if (res.status === 1) {
				toast.success(res.message || 'Đặt hàng thành công');

				// Router my-order
				router.push('/profile/my-order');

				// Xóa hết sản phẩm trong giỏ hàng
				for (var cart of carts) {
					deleteCart(cart._id);
				}

				// Xóa localStorage
				deleteItemStorage('moneyShipping');
				deleteItemStorage('shippingMethod');

				//
			} else if (res.status === 0) {
				toast.warn(res.message || 'Đặt hàng không thành công!');
			}
		} else {
			if (
				valueForm.name &&
				valueForm.phone &&
				valueForm.city &&
				valueForm.district &&
				valueForm.ward &&
				valueForm.specific
			) {
				const address = `${valueForm.specific}, ${valueForm.ward}, ${valueForm.district}, ${valueForm.city}`;

				const res: any = await orderService.createOrder({
					token: String(token),
					idUser: String(userData._id),
					nameUser: String(userData.name),
					nameReceiver: String(valueForm.name),
					phone: Number(valueForm.phone),
					address: address,
					shippingMethod: Number(shippingMethod),
					note: valueForm.note,
					products: carts,
				});

				if (res.status === 1) {
					toast.success(res.message || 'Đặt hàng thành công');

					// Router my-order
					router.push('/profile/my-order');

					// Xóa hết sản phẩm trong giỏ hàng
					for (var cart of carts) {
						deleteCart(cart._id);
					}

					// Xóa localStorage
					deleteItemStorage('moneyShipping');
					deleteItemStorage('shippingMethod');

					//
				} else if (res.status === 0) {
					toast.warn(res.message || 'Đặt hàng không thành công!');
				}
			} else {
				toast.warn('Vui lòng nhập đầy đủ thông tin!');
			}
		}
	};

	return (
		<Fragment>
			<div className={styles.container}>
				{show && <div onClick={() => setShow(false)} className='overlay'></div>}
				<div className={clsx(styles.box_position, {[styles.active]: show})}>
					<ChangeAddress
						addressDefault={addressDefault}
						onSetDefaultAddress={(v) => callbackSetAddress(v)}
						setShow={() => setShow(false)}
						setShowPopup={() => setShowPopup(true)}
					/>
				</div>

				<div className={styles.wapper}>
					{/* Kiểm tra trường hợp chưa cập nhật thông tin cá nhân */}
					{userData?.address.length > 0 ? (
						<div className={styles.box_des}>
							<InformationReceiver data={addressDefault} show={() => setShow(true)} />
							<div className={styles.box_specific}>
								<InputLight
									name='attention'
									onChange={(e: any) => setAttention(e.target.value)}
									type='text'
									placeholder='Nhập chú ý về giao hàng (nếu có)...'
									label='Ghi chú:'
								/>
							</div>
						</div>
					) : (
						<div className={styles.box_1}>
							<Fragment>
								<h4 className={styles.title}>THÔNG TIN NGƯỜI NHẬN</h4>
								<div className={styles.form_1}>
									<InputLight
										value={valueForm.name}
										name='name'
										onChange={handleChangeInput}
										type='text'
										placeholder='Nhập vào họ tên...'
										label='Họ tên người nhân:'
									/>
									<InputLight
										value={valueForm.phone}
										name='phone'
										onChange={handleChangeInput}
										type='number'
										placeholder='Nhập vào số điện thoại...'
										label='Số điện thoại người nhân:'
									/>
								</div>

								<div className={styles.selection}>
									<div className={styles.text}>
										<p>Tỉnh/ Thành phố:</p>
									</div>
									<Select
										styles={customStyles}
										className={styles.select}
										name='cityId'
										isDisabled={cityOptions.length === 0}
										options={cityOptions}
										onChange={getCity}
										placeholder='Tỉnh/Thành'
										defaultValue={selectedCity}
									/>
								</div>

								<div className={styles.selection}>
									<div className={styles.text}>
										<p>Quận/ Huyện:</p>
									</div>
									<Select
										styles={customStyles}
										className={styles.select}
										name='districtId'
										isDisabled={districtOptions.length === 0}
										options={districtOptions}
										onChange={getDistrict}
										placeholder='Quận/Huyện'
										defaultValue={selectedDistrict}
									/>
								</div>

								<div className={styles.selection}>
									<div className={styles.text}>
										<p>Xã/ Phường:</p>
									</div>
									<Select
										styles={customStyles}
										className={styles.select}
										name='wardId'
										isDisabled={wardOptions.length === 0}
										options={wardOptions}
										placeholder='Phường/Xã'
										onChange={getWard}
										defaultValue={selectedWard}
									/>
								</div>

								<div className={styles.box_specific}>
									<InputLight
										name='specific'
										onChange={handleChangeInput}
										type='text'
										placeholder='Nhập vào địa chỉ cụ thể...'
										label='Địa chỉ cụ thể:'
										value={valueForm.specific}
									/>
								</div>

								<div className={styles.box_specific}>
									<InputLight
										name='note'
										onChange={handleChangeInput}
										type='text'
										placeholder='Nhập chú ý về giao hàng (nếu có)...'
										label='Ghi chú:'
										value={valueForm.note}
									/>
								</div>
							</Fragment>
						</div>
					)}

					<div className={styles.box_2}>
						<div className={styles.main}>
							<h3 className={styles.title}>Đơn hàng của bạn</h3>
							<div className={styles.shipping}>
								<p className={styles.text_sub}>Danh sách đơn hàng:</p>
								<div className={styles.item_method}>
									<p className={styles.text_method}>Đơn hàng:</p>
									<p className={styles.text_method}>Giá tiền</p>
								</div>
								<div className={styles.list_order}>
									{carts.map((v, i) => (
										<div key={String(v._id)} className={styles.item_method}>
											<p className={styles.text_method}>
												{i + 1}. {v.nameProduct}
											</p>
											<p className={styles.text_method}>
												<span>x{Number(v.amount)}</span>{' '}
												{convertCoin(Number(v.totalPrice))}đ
											</p>
										</div>
									))}
								</div>
							</div>
							<div className={styles.total_payment}>
								<p className={styles.text_sub}>Phí vận chuyển:</p>
								<p className={styles.price_payment}>
									{convertCoin(Number(moneyShipping))}đ
								</p>
							</div>
							<div className={styles.total_payment}>
								<p className={styles.text_sub}>Tổng thanh toán:</p>
								<p className={styles.price_payment}>
									{convertCoin(Number(totalPriceCart + Number(moneyShipping)))}đ
								</p>
							</div>
							<div className={styles.group_btn}>
								<Button className={styles.btn_1} p_10_32 onClick={handlePayment}>
									Thanh toán giỏ hàng
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* Popup */}
			<Popup open={showPopup} onClose={() => setShowPopup(false)}>
				<PopupAddAddress onClose={() => setShowPopup(false)} />
			</Popup>
		</Fragment>
	);
}

export default MainPayment;
