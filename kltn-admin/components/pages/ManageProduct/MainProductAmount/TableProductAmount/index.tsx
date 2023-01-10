import React, {useEffect, useState} from 'react';

import styles from './TableProductAmount.module.scss';
import {useRouter} from 'next/router';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import useDebounce from '~/common/hooks/useDebounce';
import {TypeProduct} from './interfaces';
import productService from '~/api/product';
import {toast} from 'react-toastify';
import RequireAuth from '~/components/protected/RequiredAuth';
import Pagination from '~/components/controls/Pagination';
import CheckDataEmpty from '~/components/common/CheckDataEmpty';
import LoadingData from '~/components/common/LoadingData';
import DataTable from '~/components/common/DataTable';
import Search from '~/components/controls/Search';
import {MdOutlineAddBusiness} from 'react-icons/md';
import Popup from '~/components/common/Popup';
import PopupAddAmountProduct from '~/components/Popup/PopupAddAmountProduct';

function TableProductAmount() {
	const router = useRouter();
	const {token} = useSelector((state: RootState) => state.auth);

	// State popup

	const [isLoading, setIsloading] = useState<boolean>(false);
	const [keyword, setKeyword] = useState<string>('');
	const [totalItem, setTotalItem] = useState<number>(0);
	const [limit, setLimit] = useState<number>(10);
	const [page, setPage] = useState<number>(1);
	const debounceKeyword = useDebounce(keyword, 500);

	// Lấy id sản phẩm
	const [open, setOpen] = useState<boolean>(false);
	const [idProduct, setIdProduct] = useState<String>('');

	const [data, setData] = useState<Array<TypeProduct>>([]);

	// Lấy danh sách sản phẩm
	useEffect(() => {
		(async () => {
			try {
				setIsloading(true);
				const res: any = await productService.getAllProduct({
					token: String(token),
					category: 0,
					status: 0,
					priceMin: 0,
					priceMax: 1000000000,
					keyword: debounceKeyword,
					limit: limit,
					page: page,
				});

				if (res.status === 1) {
					setData(res.data.listProduct);
					setTotalItem(res?.data.countProduct);
					setIsloading(false);
				} else {
					setIsloading(false);
				}
			} catch (error) {
				setIsloading(false);
				console.log(error);
				toast.error('Có lỗi xảy ra!');
			}
		})();
	}, [debounceKeyword, limit, page, token, router]);

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
						TẤT CẢ SẢN PHẨM: <span>{totalItem}</span>
					</p>
				</div>
				<LoadingData isLoading={isLoading}>
					<CheckDataEmpty isEmpty={data?.length <= 0}>
						<DataTable
							data={data}
							columns={[
								{
									title: 'Tên sản phẩm',
									template: (data: TypeProduct) => (
										<p className={styles.name}>
											{data.name || 'Chưa cập nhật'}
										</p>
									),
								},
								{
									title: 'Loại',
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
									title: 'SIZE S',
									template: (data: TypeProduct) => (
										<>{Number(data.amount_size_S)}</>
									),
								},
								{
									title: 'SIZE M',
									template: (data: TypeProduct) => (
										<>{Number(data.amount_size_M)}</>
									),
								},
								{
									title: 'SIZE L',
									template: (data: TypeProduct) => (
										<>{Number(data.amount_size_L)}</>
									),
								},
								{
									title: 'SIZE XL',
									template: (data: TypeProduct) => (
										<>{Number(data.amount_size_XL)}</>
									),
								},
								{
									title: 'Nhập hàng',
									template: (data: TypeProduct) => (
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
				</LoadingData>
				<Pagination
					pageCurrent={page}
					pageSize={limit}
					onSetPage={setPage}
					onSetPageSize={setLimit}
					totalItem={totalItem}
				/>
			</div>
			{/* Popup */}
			<Popup open={open} onClose={() => setOpen(false)}>
				<PopupAddAmountProduct idProduct={idProduct} onClose={() => setOpen(false)} />
			</Popup>
		</RequireAuth>
	);
}

export default TableProductAmount;
