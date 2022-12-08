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
import {IoMdClose} from 'react-icons/io';
import clsx from 'clsx';
import Button from '~/components/controls/Button';

function MainDetailProduct() {
	const [isLoading, setIsloading] = useState<boolean>(false);
	const [data, setData] = useState<TypeProduct>();
	const [activeImage, setActiveImage] = useState<Number>();

	const router = useRouter();
	const {token} = useSelector((state: RootState) => state.auth);
	const idProduct = router.asPath.split('/')[3];

	const [listImage, setListImage] = useState<Array<TypeImage>>([]);
	const [idImage, setIdImage] = useState<String>('');

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

	const handleDeleteImage = async () => {
		try {
			setIsloading(true);
			const res: any = await productService.deleteImageProduct({
				token: String(token),
				idProduct: idProduct,
				idImage: idImage,
			});
			if (res.status === 0) {
				setIsloading(false);
				toast.warn(res.message || 'Xóa ảnh sản phẩm không thành công!');
			} else if (res.status === 1) {
				setIsloading(false);
				toast.success(res.message || 'Xóa ảnh sản phẩm thành công!');
				router.replace(router.asPath, undefined, {scroll: false}); // reload page
			}
		} catch (error) {
			setIsloading(false);
			console.log(error);
			toast.error('Có lỗi xảy ra!');
		}
	};

	//
	// const [file, setFile] = useState<any>();

	// const handleSubmit = async () => {
	// 	const formdata: any = new FormData();
	// 	formdata.append('file', file);

	// 	// console.log(token);

	// 	const res: any = await productService.addImageProduct({
	// 		token: String(token),
	// 		idProduct: '63903d087e1befc944c647d7',
	// 		images: formdata,
	// 	});

	// 	console.log(res);

	// 	// axios
	// 	// 	.post('http://localhost:8000/product/add-images/63903d6a7e1befc944c647e1', formdata)
	// 	// 	.then((res) => console.log(res))
	// 	// 	.catch((err) => console.log(err));
	// };

	return (
		<LoadingData isLoading={isLoading}>
			<div className={styles.container}>
				<h4 className={styles.title}>Chi tiết sản phẩm</h4>
				<div className={styles.main}>
					<div className={styles.box_image}>
						{listImage.length <= 0
							? 'Sản phẩm chưa có ảnh nào!'
							: listImage.map((v, i) => (
									<div
										onClick={() => {
											setActiveImage(i);
											setIdImage(v.id);
										}}
										key={String(v.id)}
										className={clsx(styles.image, {
											[styles.activeImage]: activeImage === i,
										})}
									>
										<Image
											className={styles.img}
											src={String(v.url)}
											alt='image product'
											layout='fill'
										/>
										{activeImage === i && (
											<div
												className={styles.icon_close}
												onClick={handleDeleteImage}
											>
												<IoMdClose />
											</div>
										)}
									</div>
							  ))}

						<input
							type='file'
							name='file'
							accept='image/*'
							onChange={(e: any) => {
								// const file: any = e.target.files[0];
								// setFile(file);
							}}
						></input>
						{/* <Button onClick={handleSubmit}>Thêm ảnh</Button> */}

						{/* <input type='file' accept='image/*' onChange={handleFileSelected} />
						<Button onClick={handleAddImage}>Thêm ảnh</Button> */}
					</div>
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
								<p className={styles.text_4}>{data?.detail_des}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</LoadingData>
	);
}

export default MainDetailProduct;
