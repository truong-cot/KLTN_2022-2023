import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import {HiOutlineDotsCircleHorizontal} from 'react-icons/hi';
import {convertCoin} from '~/common/func/convertCoin';
import convertDate from '~/common/func/convertDate';
import useDebounce from '~/common/hooks/useDebounce';
import CheckDataEmpty from '~/components/common/CheckDataEmpty';
import DataTable from '~/components/common/DataTable';
import LoadingData from '~/components/common/LoadingData';
import Pagination from '~/components/controls/Pagination';
import Search from '~/components/controls/Search';
import RequireAuth from '~/components/protected/RequiredAuth';

import styles from './TableDelivering.module.scss';
import orderService from '~/api/order';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import {toast} from 'react-toastify';
import {TypeOrder} from './interfaces';

function TableDelivering() {
	const router = useRouter();
	const {token} = useSelector((state: RootState) => state.auth);

	const [keyword, setKeyword] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [totalItem, setTotalItem] = useState<number>(0);
	const [limit, setLimit] = useState<number>(10);
	const [page, setPage] = useState<number>(1);
	const debounceKeyword = useDebounce(keyword, 500);

	const [data, setData] = useState<Array<TypeOrder>>([]);

	// Lấy danh sách đơn hàng
	useEffect(() => {
		(async () => {
			try {
				setIsLoading(true);
				const res: any = await orderService.getAllOrder({
					token: String(token),
					keyword: debounceKeyword,
					limit: Number(limit),
					page: Number(page),
					statusOrder: 1,
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
	}, [debounceKeyword, limit, page, token]);

	return (
		<RequireAuth>
			<div className={styles.container}>
				<Search
					placeholder='Tìm kiếm theo tên sản phẩm , tên khánh hàng'
					keyword={keyword}
					onSetKeyword={setKeyword}
				/>
				<div className={styles.main}>
					<p className={styles.count}>
						TẤT CẢ ĐƠN HÀNG: <span>{3}</span>
					</p>
				</div>
				<LoadingData isLoading={isLoading}>
					<CheckDataEmpty isEmpty={data?.length <= 0}>
						<DataTable
							data={data}
							columns={[
								{
									title: 'Tên người dùng',
									template: (data: TypeOrder) => (
										<p>{data.nameUser || 'Chưa cập nhật'}</p>
									),
								},
								{
									title: 'Tên người nhận',
									template: (data: TypeOrder) => (
										<p>{data.nameReceiver || 'Chưa cập nhật'}</p>
									),
								},
								{
									title: 'Số điện thoại',
									template: (data: TypeOrder) => (
										<p>{Number(data.phone) || 'Chưa cập nhật'}</p>
									),
								},
								{
									title: 'Số lượng đơn hàng',
									template: (data: TypeOrder) => (
										<p style={{textAlign: 'center', width: '60%'}}>
											{data.products.length}
										</p>
									),
								},
								{
									title: 'Tổng tiền đơn hàng',
									template: (data: TypeOrder) => (
										<p>{convertCoin(Number(data.totalPrice))}đ</p>
									),
								},
								{
									title: 'Ngày đặt hàng',
									template: (data: TypeOrder) => (
										<p>
											{convertDate(String(data.createdAt)).getFullDateTime()}
										</p>
									),
								},
								{
									title: 'Ngày cập nhật',
									template: (data: TypeOrder) => (
										<p>
											{convertDate(String(data.updatedAt)).getFullDateTime()}
										</p>
									),
								},
								{
									title: 'Xem chi tiết',
									template: (data: TypeOrder) => (
										<div className={styles.control}>
											<div
												className={styles.detail}
												onClick={() =>
													router.push(`/manage-order/detail/${data._id}`)
												}
											>
												<HiOutlineDotsCircleHorizontal size={22} />
											</div>
										</div>
									),
								},
							]}
						></DataTable>
					</CheckDataEmpty>
				</LoadingData>
				<Pagination
					pageCurrent={page}
					pageSize={limit}
					onSetPage={setPage}
					onSetPageSize={setLimit}
					totalItem={totalItem}
				/>
			</div>
		</RequireAuth>
	);
}

export default TableDelivering;
