import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import {HiOutlineDotsCircleHorizontal} from 'react-icons/hi';
import {ImPencil} from 'react-icons/im';
import {RiDeleteBin5Line} from 'react-icons/ri';
import {useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import productService from '~/api/product';
import {convertCoin} from '~/common/func/convertCoin';
import convertDate from '~/common/func/convertDate';
import useDebounce from '~/common/hooks/useDebounce';
import CheckDataEmpty from '~/components/common/CheckDataEmpty';
import DataTable from '~/components/common/DataTable';
import LoadingData from '~/components/common/LoadingData';
import Popup from '~/components/common/Popup';
import Pagination from '~/components/controls/Pagination';
import Search from '~/components/controls/Search';
import PopupDeleteProduct from '~/components/Popup/PopupDeleteProduct';
import RequireAuth from '~/components/protected/RequiredAuth';
import {RootState} from '~/redux/store';
import {TypeProduct} from './interfaces';

import styles from './TableProductTrending.module.scss';

function TableProductTrending() {
	const router = useRouter();
	const {token} = useSelector((state: RootState) => state.auth);

	const [open, setOpen] = useState<boolean>(false);
	const [idProduct, setIdProduct] = useState<String>('');

	const [isLoading, setIsloading] = useState<boolean>(false);
	const [keyword, setKeyword] = useState<string>('');
	const [totalItem, setTotalItem] = useState<number>(0);
	const [limit, setLimit] = useState<number>(10);
	const [page, setPage] = useState<number>(1);
	const debounceKeyword = useDebounce(keyword, 500);

	const [data, setData] = useState<Array<TypeProduct>>([]);

	useEffect(() => {
		(async () => {
			try {
				setIsloading(true);
				const res: any = await productService.getAllProduct({
					token: String(token),
					category: 0,
					status: 3,
					priceMin: 0,
					priceMax: 1000000000,
					keyword: debounceKeyword,
					limit: limit,
					page: page,
				});

				if (res.status === 1) {
					setData(res.data);
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
	}, [debounceKeyword, limit, page, token]);

	// Xóa sản phẩm
	const handleDelete = async () => {
		try {
			setIsloading(true);
			const res: any = await productService.deleteProduct({
				token: String(token),
				idProduct: idProduct,
			});

			if (res.status === 0) {
				setIsloading(false);
				toast.warn(res.message || 'Xóa sản phẩm không thành công!');
			} else if (res.status === 1) {
				setIsloading(false);
				toast.success(res.message || 'Xóa sản phẩm thành công!');
				router.replace(router.asPath, router.asPath, {scroll: false}); // reload page
				setOpen(false);
			}
		} catch (error) {
			setIsloading(false);
			console.log(error);
			toast.error('Có lỗi xảy ra!');
		}
	};

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
										<p>{data.name || 'Chưa cập nhật'}</p>
									),
								},
								{
									title: 'Giá sản phẩm',
									template: (data: TypeProduct) => (
										<p>{convertCoin(Number(data.price))}đ</p>
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
									title: 'Trạng thái',
									template: (data: TypeProduct) => (
										<p>
											{data.isHot && data.trending
												? 'Đang hot, đang trending'
												: data.isHot === false && data.trending
												? 'Đang trending'
												: data.isHot === false && data.trending === false
												? 'Chưa cập nhật trạng thái'
												: 'Đang hot'}
										</p>
									),
								},
								{
									title: 'Khuyến mãi(%)',
									template: (data: TypeProduct) => <p>{String(data.sale)}</p>,
								},
								{
									title: 'Số sao',
									template: (data: TypeProduct) => (
										<p>{convertCoin(Number(data.star))}</p>
									),
								},
								{
									title: 'Ngày chỉnh sửa',
									template: (data: TypeProduct) => (
										<p>
											{convertDate(String(data.updatedAt)).getFullDateTime()}
										</p>
									),
								},
								{
									title: '',
									template: (data: TypeProduct) => (
										<div className={styles.control}>
											<div
												className={styles.detail}
												onClick={() => {
													router.push(
														`/manage-product/detaiil-product/${data._id}`
													);
												}}
											>
												<HiOutlineDotsCircleHorizontal size={22} />
											</div>
											<div
												className={styles.edit}
												onClick={() => {
													// setOpen(true);
													// setIdProduct(data._id);
												}}
											>
												<ImPencil size={20} />
											</div>
											<div
												className={styles.delete}
												onClick={() => {
													setOpen(true);
													setIdProduct(data._id);
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
			{/* Popup */}
			<Popup open={open} onClose={() => setOpen(false)}>
				<PopupDeleteProduct handleSumit={handleDelete} onClose={() => setOpen(false)} />
			</Popup>
		</RequireAuth>
	);
}

export default TableProductTrending;
