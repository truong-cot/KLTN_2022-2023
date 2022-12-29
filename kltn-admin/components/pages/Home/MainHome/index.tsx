import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import LoadingData from '~/components/common/LoadingData';
import RequireAuth from '~/components/protected/RequiredAuth';
import {RootState} from '~/redux/store';

import styles from './MainHome.module.scss';
import {convertCoin} from '~/common/func/convertCoin';
import DataTable from '~/components/common/DataTable';
import Popup from '~/components/common/Popup';
import PopupAddAmountProduct from '~/components/Popup/PopupAddAmountProduct';
import {MdOutlineAddBusiness} from 'react-icons/md';
import {TypeData, TypeProduct} from './interfaces';
import {toast} from 'react-toastify';
import revenueService from '~/api/revenue';
import CheckDataEmpty from '~/components/common/CheckDataEmpty';
import {ImPencil} from 'react-icons/im';
import {useRouter} from 'next/router';
import DatePicker from '~/components/controls/DatePicker';
import LineChart from '../LineChart';
import clsx from 'clsx';

function MainHome() {
	const router = useRouter();

	const [date, setDate] = useState<String>('');
	const [data, setData] = useState<TypeData>();
	const [open, setOpen] = useState<boolean>(false);
	const [idProduct, setIdProduct] = useState<String>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [productOutStock, setProductOutStock] = useState<Array<TypeProduct>>([]);
	const [productInStock, setProductInStock] = useState<Array<TypeProduct>>([]);
	const [totalRevenue, setTotalRevenue] = useState<Number>();
	const [totalRevenueYear, setTotalRevenueYear] = useState<Number>();
	const [totalRevenueMonth, setTotalRevenueMonth] = useState<Number>();

	const {token} = useSelector((state: RootState) => state.auth);

	// Lấy thông kê đơn hàng
	useEffect(() => {
		(async () => {
			try {
				setIsLoading(true);
				const res: any = await revenueService.getAllRevenue({
					token: String(token),
				});

				if (res.status === 1) {
					setData(res.data);
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
	}, [token]);

	// Lấy sản phẩm sắp hết hàng
	useEffect(() => {
		(async () => {
			try {
				setIsLoading(true);
				const res: any = await revenueService.getProductOutStock({
					token: String(token),
				});

				if (res.status === 1) {
					setProductOutStock(res.data);
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
	}, [token]);

	// Lấy sản phẩm tồn kho
	useEffect(() => {
		(async () => {
			try {
				setIsLoading(true);
				const res: any = await revenueService.getProductInStock({
					token: String(token),
				});

				if (res.status === 1) {
					setProductInStock(res.data);
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
	}, [token]);

	// Lấy tổng doanh thu, năm, tháng
	useEffect(() => {
		(async () => {
			try {
				setIsLoading(true);
				const res: any = await revenueService.getTotalRevenue({
					token: String(token),
				});

				if (res.status === 1) {
					setTotalRevenue(res.data.totalRevenue);
					setTotalRevenueYear(res.data.revenueYear);
					setTotalRevenueMonth(res.data.revenueMonth);
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
	}, [token]);

	return (
		<RequireAuth>
			<LoadingData isLoading={isLoading}>
				<div className={styles.container}>
					<h4 className={styles.title}>Báo cáo tổng quan</h4>
					<div className={styles.line}></div>
					<p className={styles.title_1}>Người dùng</p>
					<div className={styles.list}>
						<div className={styles.item}>
							<p className={styles.text}>Tổng số người dùng</p>
							<p className={styles.number}>{convertCoin(Number(data?.allUser))}</p>
						</div>
						<div className={styles.item}>
							<p className={styles.text}>Tổng số ADMIN</p>
							<p className={styles.number}>{convertCoin(Number(data?.allAdmin))}</p>
						</div>
						<div className={styles.item}>
							<p className={styles.text}>Tổng số người mới trong tháng</p>
							<p className={styles.number}>
								{convertCoin(Number(data?.allUserMonth))}
							</p>
						</div>
					</div>

					<p className={styles.title_1}>Sản phẩm</p>
					<div className={styles.list}>
						<div className={styles.item}>
							<p className={styles.text}>Tổng số sản phẩm</p>
							<p className={styles.number}>{convertCoin(Number(data?.allProduct))}</p>
						</div>
						<div className={styles.item}>
							<p className={styles.text}>Tổng số sản phẩm đang SALE</p>
							<p className={styles.number}>
								{convertCoin(Number(data?.saleProduct))}
							</p>
						</div>
						<div className={styles.item}>
							<p className={styles.text}>Tổng số sản phẩm đang HOT</p>
							<p className={styles.number}>{convertCoin(Number(data?.hotProduct))}</p>
						</div>
						<div className={styles.item}>
							<p className={styles.text}>Tổng số sản phẩm đang TRENDING</p>
							<p className={styles.number}>
								{convertCoin(Number(data?.trendingProduct))}
							</p>
						</div>
					</div>

					<p className={styles.title_1}>Đơn hàng</p>
					<div className={styles.list}>
						<div className={styles.item}>
							<p className={styles.text}>Tổng số đơn hàng đang chờ xác nhận</p>
							<p className={styles.number}>
								{convertCoin(Number(data?.orderPending))}
							</p>
						</div>
						<div className={styles.item}>
							<p className={styles.text}>Tổng số đơn hàng đang giao</p>
							<p className={styles.number}>
								{convertCoin(Number(data?.orderConfirm))}
							</p>
						</div>
						<div className={styles.item}>
							<p className={styles.text}>Tổng số đơn hàng thành công</p>
							<p className={styles.number}>
								{convertCoin(Number(data?.orderComplete))}
							</p>
						</div>
						<div className={styles.item}>
							<p className={styles.text}>Tổng số đơn hàng bị hủy</p>
							<p className={styles.number}>
								{convertCoin(Number(data?.orderCancelled))}
							</p>
						</div>
					</div>

					<div className={styles.top}>
						<p className={styles.title_1}>Doanh thu tổng quan</p>
						{/* <DatePicker
							value={date}
							onSetValue={setDate}
							placeholder='Doanh thu theo ngày'
						/> */}
					</div>
					<div className={styles.list}>
						<div className={styles.item}>
							<p className={styles.text}>Tổng số doanh thu đã bán được</p>
							<p className={styles.number}>{convertCoin(Number(totalRevenue))}đ</p>
						</div>
						<div className={styles.item}>
							<p className={styles.text}>Tổng số doanh thu trong năm</p>
							<p className={styles.number}>
								{convertCoin(Number(totalRevenueYear))}đ
							</p>
						</div>
						<div className={styles.item}>
							<p className={styles.text}>Tổng số doanh thu trong tháng</p>
							<p className={styles.number}>
								{convertCoin(Number(totalRevenueMonth))}đ
							</p>
						</div>
						{/* <div className={styles.item}>
							<p className={styles.text}>Tổng số doanh thu trong ngày</p>
							<p className={styles.number}>{convertCoin(1240000)}đ</p>
						</div> */}
					</div>

					<div className={clsx(styles.div_chart1, styles.chart_line)}>
						<p className={styles.text_title}>Doanh thu theo từng tháng trong năm</p>
						<LineChart />
					</div>

					<p className={styles.title_1}>Đơn hàng sắp hết hàng</p>
					<div className={styles.table}>
						<CheckDataEmpty isEmpty={productOutStock?.length <= 0}>
							<DataTable
								data={productOutStock}
								columns={[
									{
										title: 'Tên sản phẩm',
										template: (data: TypeProduct) => (
											<p>{data.name || 'Chưa cập nhật'}</p>
										),
									},

									{
										title: 'Thể loại',
										template: (data: TypeProduct) => (
											<p>
												{data.category === 1
													? 'Áo len'
													: data.category === 2
													? 'Quần Jeans'
													: 'Áo Phông'}
											</p>
										),
									},
									{
										title: 'Số lượng size S',
										template: (data: TypeProduct) => (
											<p>{Number(data.amount_size_S) || 'Chưa cập nhật'}</p>
										),
									},
									{
										title: 'Số lượng size M',
										template: (data: TypeProduct) => (
											<p>{Number(data.amount_size_M) || 'Chưa cập nhật'}</p>
										),
									},
									{
										title: 'Số lượng size L',
										template: (data: TypeProduct) => (
											<p>{Number(data.amount_size_L) || 'Chưa cập nhật'}</p>
										),
									},
									{
										title: 'Số lượng size XL',
										template: (data: TypeProduct) => (
											<p>{Number(data.amount_size_XL) || 'Chưa cập nhật'}</p>
										),
									},
									{
										title: 'Nhập hàng',
										template: (data: any) => (
											<div className={styles.control}>
												<div
													className={styles.edit}
													onClick={() => {
														setIdProduct(data._id);
														setOpen(true);
													}}
												>
													<MdOutlineAddBusiness size={20} />
												</div>
											</div>
										),
									},
								]}
							></DataTable>
						</CheckDataEmpty>
					</div>

					<p className={styles.title_1}>Đơn hàng đang tồn kho</p>
					<div className={styles.table}>
						<DataTable
							data={productInStock}
							columns={[
								{
									title: 'Tên sản phẩm',
									template: (data: TypeProduct) => (
										<p>{data.name || 'Chưa cập nhật'}</p>
									),
								},

								{
									title: 'Thể loại',
									template: (data: TypeProduct) => (
										<p>
											{data.category === 1
												? 'Áo len'
												: data.category === 2
												? 'Quần Jeans'
												: 'Áo Phông'}
										</p>
									),
								},
								{
									title: 'Số lượng size S',
									template: (data: TypeProduct) => (
										<p>{Number(data.amount_size_S) || 'Chưa cập nhật'}</p>
									),
								},
								{
									title: 'Số lượng size M',
									template: (data: TypeProduct) => (
										<p>{Number(data.amount_size_M) || 'Chưa cập nhật'}</p>
									),
								},
								{
									title: 'Số lượng size L',
									template: (data: TypeProduct) => (
										<p>{Number(data.amount_size_L) || 'Chưa cập nhật'}</p>
									),
								},
								{
									title: 'Số lượng size XL',
									template: (data: TypeProduct) => (
										<p>{Number(data.amount_size_XL) || 'Chưa cập nhật'}</p>
									),
								},
								{
									title: 'Chỉnh sửa',
									template: (data: TypeProduct) => (
										<div className={styles.control}>
											<div
												className={styles.edit}
												onClick={() =>
													router.push(
														`/manage-product/edit-product/${data._id}`
													)
												}
											>
												<ImPencil size={20} />
											</div>
										</div>
									),
								},
							]}
						></DataTable>
					</div>
				</div>
				{/* Popup */}
				<Popup open={open} onClose={() => setOpen(false)}>
					<PopupAddAmountProduct idProduct={idProduct} onClose={() => setOpen(false)} />
				</Popup>
			</LoadingData>
		</RequireAuth>
	);
}

export default MainHome;
