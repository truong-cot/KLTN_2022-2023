import {useRouter} from 'next/router';
import React, {useState} from 'react';
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

import styles from './TablePending.module.scss';

function TablePending() {
	const router = useRouter();

	const [keyword, setKeyword] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [totalItem, setTotalItem] = useState<number>(0);
	const [limit, setLimit] = useState<number>(10);
	const [page, setPage] = useState<number>(1);
	const debounceKeyword = useDebounce(keyword, 500);

	const [data, setData] = useState<Array<any>>([
		{
			_id: '12345',
			name: 'Đặng Bá Trường',
			phone: '0229940200',
			products: [1],
			totalPrice: 1250000,
			date: '21:15, 05/12/2022',
		},
		{
			_id: '12345',
			name: 'Đặng Bá Trường',
			phone: '0229940200',
			products: [1, 2, 3],
			totalPrice: 1250000,
			date: '21:15, 05/12/2022',
		},
		{
			_id: '12345',
			name: 'Đặng Bá Trường',
			products: [1, 2, 3, 4],
			phone: '0229940200',
			totalPrice: 1250000,
			date: '21:15, 05/12/2022',
		},
	]);
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
									title: 'Tên người nhận',
									template: (data: any) => <p>{data.name || 'Chưa cập nhật'}</p>,
								},
								{
									title: 'Số điện thoại',
									template: (data: any) => <p>{data.phone || 'Chưa cập nhật'}</p>,
								},
								{
									title: 'Số lượng đơn hàng',
									template: (data: any) => (
										<p style={{textAlign: 'center', width: '60%'}}>
											{data.products.length}
										</p>
									),
								},
								{
									title: 'Tổng tiền đơn hàng',
									template: (data: any) => <p>{convertCoin(data.totalPrice)}đ</p>,
								},
								{
									title: 'Ngày đặt hàng',
									template: (data: any) => (
										<p>
											{/* {convertDate(String(data.createdAt)).getFullDateTime()} */}
											{data.date}
										</p>
									),
								},
								{
									title: 'Xem chi tiết',
									template: (data: any) => (
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

export default TablePending;
