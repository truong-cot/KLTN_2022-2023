import Image from 'next/image';
import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import {TypeImage, TypeProduct} from './interfaces';

import styles from './MainDetailProduct.module.scss';
import LoadingData from '~/components/common/LoadingData';
import {toast} from 'react-toastify';
import productService from '~/api/product';
import {convertCoin} from '~/common/func/convertCoin';
import {FaTimes} from 'react-icons/fa';
import {IoMdClose} from 'react-icons/io';
import clsx from 'clsx';
import Button from '~/components/controls/Button';
import FormChangeImage from '~/components/controls/FormChangeImage';

function MainDetailProduct() {
	const router = useRouter();
	const idProduct = router.asPath.split('/')[3];
	const {token} = useSelector((state: RootState) => state.auth);

	// State data product
	const [isLoading, setIsloading] = useState<boolean>(false);
	const [data, setData] = useState<TypeProduct>();

	const [listImage, setListImage] = useState<Array<TypeImage>>([]);

	// Lấy thông tin sản phẩm
	useEffect(() => {
		(async () => {
			try {
				setIsloading(true);

				const res: any = await productService.getDetailProduct({
					token: String(token),
					idProduct: String(idProduct),
				});

				if (res.status === 1) {
					setData(res.data);
					setIsloading(false);
					setListImage(res.data.images);
				} else {
					setIsloading(false);
					toast.warn(res.message);
				}
			} catch (error) {
				setIsloading(false);
				console.log(error);
				toast.error('Có lỗi xảy ra!');
			}
		})();
	}, [router, idProduct, token]);

	return (
		<LoadingData isLoading={isLoading}>
			<div className={styles.container}>
				<h4 className={styles.title}>Chi tiết sản phẩm</h4>
				<div className={styles.main}>
					<FormChangeImage images={listImage} />
					<div className={styles.content}>
						<div className={styles.left}>
							<div className={styles.item}>
								<p className={styles.text_1}>Tên sản phẩm :</p>
								<p className={styles.text_2}>{data?.name}</p>
							</div>
							<div className={styles.item}>
								<p className={styles.text_1}>Thể loại :</p>
								<p className={styles.text_2}>
									{data?.category === 1
										? 'Áo len'
										: data?.category === 2
										? 'Quần Jeans'
										: 'Áo Phông'}
								</p>
							</div>
							<div className={styles.item}>
								<p className={styles.text_1}>Giá :</p>
								<p className={styles.text_2}>{convertCoin(Number(data?.price))}đ</p>
							</div>
							<div className={styles.item}>
								<p className={styles.text_1}>Khuyến mãi :</p>
								<p className={styles.text_2}>{convertCoin(Number(data?.sale))} %</p>
							</div>
							<div className={styles.item}>
								<p className={styles.text_1}>Số lượng size S :</p>
								<p className={styles.text_2}>
									{Number(data?.amount_size_S) ? Number(data?.amount_size_S) : 0}
								</p>
							</div>
							<div className={styles.item}>
								<p className={styles.text_1}>Số lượng size M :</p>
								<p className={styles.text_2}>{Number(data?.amount_size_M)}</p>
							</div>
							<div className={styles.item}>
								<p className={styles.text_1}>Số lượng size L :</p>
								<p className={styles.text_2}>{Number(data?.amount_size_L)}</p>
							</div>
							<div className={styles.item}>
								<p className={styles.text_1}>Số lượng size XL :</p>
								<p className={styles.text_2}>{Number(data?.amount_size_XL)}</p>
							</div>
							<div className={styles.item}>
								<p className={styles.text_1}>Số sao đánh giá :</p>
								<p className={styles.text_2}>{Number(data?.star)}</p>
							</div>
							<div className={styles.item}>
								<p className={styles.text_1}>Trạng thái sản phẩm :</p>
								<p className={styles.text_2}>
									{data?.isHot && data?.trending
										? 'Đang hot, đang trending'
										: data?.isHot === false && data?.trending
										? 'Đang trending'
										: data?.isHot === false && data?.trending === false
										? 'Chưa cập nhật trạng thái'
										: 'Đang hot'}
								</p>
							</div>
						</div>
						<div className={styles.right}>
							<div className={styles.item_2}>
								<p className={styles.text_3}>Mô tả chính :</p>
								<p className={styles.text_4}>{data?.main_des}</p>
							</div>
							<div className={styles.item_2}>
								<p className={styles.text_3}>Mô tả chung :</p>
								<p className={styles.text_4}>{data?.general_des}</p>
							</div>
							<div className={styles.item_2}>
								<p className={styles.text_3}>Mô tả chi tiết :</p>
								{data?.detail_des && (
									<div
										dangerouslySetInnerHTML={{
											__html: String(data.detail_des),
										}}
										style={{
											fontSize: '14px',
											color: '#323448',
											fontWeight: '400',
										}}
									></div>
								)}
							</div>
						</div>
					</div>
				</div>

				<div className={styles.group_btn}>
					<Button bg_gray p_8_24 rounded_6 onClick={() => router.back()}>
						Quay lại
					</Button>
					<Button
						primary4
						p_8_24
						rounded_6
						onClick={() => router.push(`/manage-product/edit-product/${idProduct}`)}
					>
						Chỉnh sửa
					</Button>
				</div>
			</div>
		</LoadingData>
	);
}

export default MainDetailProduct;
