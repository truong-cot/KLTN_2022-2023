import {useRouter} from 'next/router';
import React, {useState, Fragment} from 'react';
import {convertCoin} from '~/common/func/convertCoin';
import DataTable from '~/components/common/DataTable';
import Popup from '~/components/common/Popup';
import Button from '~/components/controls/Button';
import PopupConfirmOrder from '~/components/Popup/PopupConfirmOrder';

import styles from './MainDetailOrder.module.scss';

function MainDetailOrder() {
	const router = useRouter();

	const [show, setShow] = useState<boolean>(false);

	const [data, setData] = useState<Array<any>>([
		{
			name: 'Quần jean nam TMJ08',
			qlt: 3,
			price: 1250000,
			totalPrice: 3000000,
		},
		{
			name: 'Quần jean nam TMJ08',
			qlt: 3,
			price: 1250000,
			totalPrice: 3000000,
		},
		{
			name: 'Quần jean nam TMJ08',
			qlt: 3,
			price: 1250000,
			totalPrice: 3000000,
		},
	]);

	const handleConfirm = () => {
		setShow(true);
	};
	return (
		<Fragment>
			<div className={styles.container}>
				<h4 className={styles.title}>Chi tiết đơn hàng</h4>
				<div className={styles.main}>
					<div className={styles.left}>
						<div className={styles.item}>
							<p className={styles.text_1}>Tên người người nhận :</p>
							<p className={styles.text_2}>Đặng Bá Trường</p>
						</div>

						<div className={styles.item}>
							<p className={styles.text_1}>Số điện thoại :</p>
							<p className={styles.text_2}>03399220200</p>
						</div>
						<div className={styles.item}>
							<p className={styles.text_1}>Địa chị giao hàng :</p>
							<p className={styles.text_2}>
								Thôn Khánh Sơn, Xã Sơn Lộc, Huyện Can Lộc, Tỉnh Hà Tĩnh
							</p>
						</div>
						<div className={styles.item}>
							<p className={styles.text_1}>Phương thức giao hàng</p>
							<p className={styles.text_2}>Giao hàng tiết kiệm</p>
						</div>
						<div className={styles.item}>
							<p className={styles.text_1}>Tổng giá trị đơn hàng :</p>
							<p className={styles.text_2}>{convertCoin(1250000)}đ</p>
						</div>
						<div className={styles.item}>
							<p className={styles.text_1}>Số lượng sản phẩm :</p>
							<p className={styles.text_2}>3</p>
						</div>
						<div className={styles.item}>
							<p className={styles.text_1}>Ngày đặt hàng :</p>
							<p className={styles.text_2}>21:15, 05/12/2022</p>
						</div>
						<div className={styles.item}>
							<p className={styles.text_1}>Ghi chú :</p>
							<p className={styles.text_2}>Ghi chú</p>
						</div>
						<div className={styles.item}>
							<p className={styles.text_1}>Trạng thái đơn hàng :</p>
							<p className={styles.text_2}>Chờ xác nhận</p>
						</div>
					</div>
					<div className={styles.list_product}>
						<p className={styles.text_1}>Danh sách sản phẩm :</p>
						<div className={styles.table}>
							<DataTable
								data={data}
								columns={[
									{
										title: 'Tên sản phẩm',
										template: (data: any) => (
											<p>{data.name || 'Chưa cập nhật'}</p>
										),
									},
									{
										title: 'Số lượng',
										template: (data: any) => (
											<p>{data.qlt || 'Chưa cập nhật'}</p>
										),
									},
									{
										title: 'Đơn giá',
										template: (data: any) => <p>{convertCoin(data.price)}đ</p>,
									},
									{
										title: 'Thành tiền',
										template: (data: any) => (
											<p>{convertCoin(data.totalPrice)}đ</p>
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
						<Button bg_red p_8_24 rounded_6>
							Hủy đơn hàng
						</Button>
						<Button primary4 p_8_24 rounded_6 onClick={handleConfirm}>
							Xác nhận đơn
						</Button>
					</div>
				</div>
			</div>
			{/* Popup */}
			<Popup open={show} onClose={() => setShow(false)}>
				<PopupConfirmOrder handleSumit={handleConfirm} onClose={() => setShow(false)} />
			</Popup>
		</Fragment>
	);
}

export default MainDetailOrder;
