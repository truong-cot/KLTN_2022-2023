import {useRouter} from 'next/router';
import React, {useState} from 'react';
import {HiOutlineDotsCircleHorizontal} from 'react-icons/hi';
import {ImPencil} from 'react-icons/im';
import {RiDeleteBin5Line} from 'react-icons/ri';
import {useSelector} from 'react-redux';
import convertDate from '~/common/func/convertDate';
import useDebounce from '~/common/hooks/useDebounce';
import CheckDataEmpty from '~/components/common/CheckDataEmpty';
import DataTable from '~/components/common/DataTable';
import LoadingData from '~/components/common/LoadingData';
import Pagination from '~/components/controls/Pagination';
import Search from '~/components/controls/Search';
import RequireAuth from '~/components/protected/RequiredAuth';
import {RootState} from '~/redux/store';

import styles from './TableProductSweater.module.scss';

function TableProductSweater() {
	const router = useRouter();
	const {token} = useSelector((state: RootState) => state.auth);

	const [isLoading, setIsloading] = useState<boolean>(false);
	const [keyword, setKeyword] = useState<string>('');
	const [totalItem, setTotalItem] = useState<number>(0);
	const [limit, setLimit] = useState<number>(10);
	const [page, setPage] = useState<number>(1);
	const debounceKeyword = useDebounce(keyword, 500);

	const [data, setData] = useState<Array<any>>([]);

	return (
		<RequireAuth>
			<div className={styles.container}>
				<Search
					placeholder='Tìm kiếm theo tên sản phẩm'
					keyword={keyword}
					onSetKeyword={setKeyword}
				/>
				<div className={styles.main}>
					<p className={styles.count}>
						TẤT CẢ TÀI KHOẢN: <span>{totalItem}</span>
					</p>
				</div>
				<LoadingData isLoading={isLoading}>
					<CheckDataEmpty isEmpty={data?.length <= 0}>
						<DataTable
							data={data}
							columns={[
								{
									title: 'Tên đăng nhập',
									template: (data: any) => (
										<p>{data.anyname || 'Chưa cập nhật'}</p>
									),
								},
								{
									title: 'Tên người dùng',
									template: (data: any) => <p>{data.name || 'Chưa cập nhật'}</p>,
								},
								{
									title: 'Tài khoản',
									template: (data: any) => (
										<p>{data.isAdmin ? 'Admin' : 'any'}</p>
									),
								},
								{
									title: 'Email',
									template: (data: any) => <p>{data.email || 'Chưa cập nhật'}</p>,
								},
								{
									title: 'Số điện thoại',
									template: (data: any) => <p>{data.phone || 'Chưa cập nhật'}</p>,
								},
								{
									title: 'Ngày tạo',
									template: (data: any) => (
										<p>
											{convertDate(String(data.createdAt)).getFullDateTime()}
										</p>
									),
								},
								{
									title: '',
									template: (data: any) => (
										<div className={styles.control}>
											<div
												className={styles.detail}
												onClick={() =>
													router.push(`/manage-any/detail/${data._id}`)
												}
											>
												<HiOutlineDotsCircleHorizontal size={22} />
											</div>
											<div
												className={styles.edit}
												onClick={() => {
													// setOpenChangeRole(true);
													// setIdany(data._id);
												}}
											>
												<ImPencil size={20} />
											</div>
											<div
												className={styles.delete}
												onClick={() => {
													// setOpen(true);
													// setIdany(data._id);
												}}
											>
												<RiDeleteBin5Line size={20} />
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

export default TableProductSweater;
