import React, {Fragment, useState} from 'react';
import {convertCoin} from '~/common/func/convertCoin';
import FormChangeAddress from '~/components/common/FormChangeAddress';

import styles from './MainPayment.module.scss';
import Button from '~/components/controls/Button';
import InformationReceiver from '../InformationReceiver';
import clsx from 'clsx';
import AddressItem from '../AddressItem';
import InputLight from '~/components/controls/InputLight';
import Popup from '~/components/common/Popup';
import PopupAddAddress from '~/components/controls/PopupAddAddress';

function MainPayment() {
	const [show, setShow] = useState<boolean>(false);
	const [showPopup, setShowPopup] = useState<boolean>(false);

	const data: Array<any> = [
		{
			_id: '12344',
			name: 'Đặng Bá Trường',
			phone: '0339940200',
			address: 'Thôn Khánh Sơn, Xã Hà Tĩnh, Huyện Can Lộc, Tỉnh Hà Tĩnh',
		},
		{
			_id: '12344',
			name: 'Đặng Bá Trường',
			phone: '0339940200',
			address: 'Thôn Khánh Sơn, Xã Hà Tĩnh, Huyện Can Lộc, Tỉnh Hà Tĩnh',
		},
		{
			_id: '12344',
			name: 'Đặng Bá Trường',
			phone: '0339940200',
			address: 'Thôn Khánh Sơn, Xã Hà Tĩnh, Huyện Can Lộc, Tỉnh Hà Tĩnh',
		},
	];

	return (
		<Fragment>
			<div className={styles.container}>
				{show && <div onClick={() => setShow(false)} className='overlay'></div>}
				<div className={clsx(styles.box_position, {[styles.active]: show})}>
					<div className={styles.top}>
						<h4>Địa chỉ nhận hàng</h4>
						<p
							onClick={() => {
								setShowPopup(true);
								setShow(false);
							}}
							className={styles.add_address}
						>
							Thêm địa chỉ nhận hàng
						</p>
					</div>
					{data.map((item, index) => (
						<AddressItem key={index} data={item} active={index === 1} />
					))}

					<div className={styles.group_btn}>
						<Button onClick={() => setShow(false)}>HỦY</Button>
						<Button className={styles.save}>LƯU</Button>
					</div>
				</div>

				<div className={styles.wapper}>
					{/* Kiểm tra trường hợp chưa cập nhật thông tin cá nhân */}
					{/* <div className={styles.box_1}>
						<FormChangeAddress />
					</div> */}
					<div className={styles.box_des}>
						<InformationReceiver show={() => setShow(true)} />
						<div className={styles.box_specific}>
							<InputLight
								name='specific'
								// onChange={handleChangeInput}
								type='text'
								placeholder='Nhập chú ý về giao hàng (nếu có)...'
								label='Ghi chú:'
							/>
						</div>
					</div>
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
									<div className={styles.item_method}>
										<p className={styles.text_method}>1. Tên sản phẩm</p>
										<p className={styles.text_method}>
											<span>x2</span> {convertCoin(125000)}đ
										</p>
									</div>
									<div className={styles.item_method}>
										<p className={styles.text_method}>1. Tên sản phẩm</p>
										<p className={styles.text_method}>
											<span>x2</span> {convertCoin(125000)}đ
										</p>
									</div>
									<div className={styles.item_method}>
										<p className={styles.text_method}>1. Tên sản phẩm</p>
										<p className={styles.text_method}>
											<span>x2</span> {convertCoin(125000)}đ
										</p>
									</div>
								</div>
							</div>
							<div className={styles.total_payment}>
								<p className={styles.text_sub}>Phí vận chuyển:</p>
								<p className={styles.price_payment}>{convertCoin(125000)}đ</p>
							</div>
							<div className={styles.total_payment}>
								<p className={styles.text_sub}>Tổng thanh toán:</p>
								<p className={styles.price_payment}>{convertCoin(125000)}đ</p>
							</div>
							<div className={styles.group_btn}>
								<Button className={styles.btn_1} p_10_32>
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
