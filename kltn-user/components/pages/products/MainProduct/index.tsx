import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/router';
import React, {useState, useEffect, useMemo} from 'react';
import {AiFillStar, AiFillYoutube, AiOutlineInstagram} from 'react-icons/ai';
import {BsFillSuitHeartFill, BsTwitter} from 'react-icons/bs';
import {FaCartPlus, FaFacebookF} from 'react-icons/fa';
import {useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import productService from '~/api/product';
import {convertCoin} from '~/common/func/convertCoin';
import LoadingData from '~/components/common/LoadingData';
import GridColumn from '~/components/layout/GridColumn';
import {RootState} from '~/redux/store';
import {TypeCart, TypeImage, TypeProduct} from './interfaces';
import styles from './MainProduct.module.scss';
import cartService from '~/api/cart';
import ItemReview from '../ItemReview';
import icons from '~/constants/images/icons';

function MainProduct() {
	const router = useRouter();
	const {token} = useSelector((state: RootState) => state.auth);
	const {isLogged} = useSelector((state: RootState) => state.auth);
	const {userData} = useSelector((state: RootState) => state.user);
	const idProduct = router.query.id;

	const [size, setSize] = useState<String>('');
	const [tab, setTab] = useState<number>(1);
	const [data, setData] = useState<TypeProduct>();
	const [listImage, setListImage] = useState<Array<TypeImage>>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [amount, setAmount] = useState<Number>(1);

	const list_star: Array<any> = [
		{
			id: 1,
			star: <AiFillStar size={16} />,
		},
		{
			id: 2,
			star: <AiFillStar size={16} />,
		},
		{
			id: 3,
			star: <AiFillStar size={16} />,
		},
		{
			id: 4,
			star: <AiFillStar size={16} />,
		},
		{
			id: 5,
			star: <AiFillStar size={16} />,
		},
	];

	const list_size: Array<any> = [
		{id: 1, size: 'S'},
		{id: 2, size: 'M'},
		{id: 3, size: 'L'},
		{id: 4, size: 'XL'},
	];

	useEffect(() => {
		if (idProduct) {
			(async () => {
				setIsLoading(true);
				try {
					const res: any = await productService.getDetailProduct({
						token: String(token),
						idProduct: idProduct as string,
					});

					if (res.status === 1) {
						setIsLoading(false);
						setData(res.data);
						setListImage(res?.data?.images);
					} else {
						setIsLoading(false);
						toast.warning(res.message);
					}
				} catch (error) {
					console.log(error);
					setIsLoading(false);
					toast.error('Có lỗi xảy ra!');
				}
			})();
		}
	}, [idProduct]);

	// Handle qlt
	const reduceQlt = () => {
		if (Number(amount) > 1) {
			setAmount(Number(amount) - 1);
		} else {
			setAmount(1);
		}
	};

	const moreQlt = () => {
		if (Number(amount) < 10) {
			setAmount(Number(amount) + 1);
		}
	};

	// add to cart
	const handleAddToCart = async () => {
		try {
			if (isLogged && idProduct) {
				if (size) {
					setIsLoading(true);

					const res: any = await cartService.addToCart({
						token: String(token),
						idUser: userData._id,
						idProduct: idProduct as string,
						size: size,
						amount: Number(amount),
						price: Number(data?.price),
						sale: Number(data?.sale),
					});

					if (res.status === 1) {
						setIsLoading(false);
						toast.success(res.message || 'Thêm sản phẩm vào giỏ hàng thành công!');
						setAmount(1);
						setSize('');
						// router.reload();
						router.replace(router.asPath); // reload page
					} else if (res.status === 0) {
						setIsLoading(false);
						router.reload();
						toast.warn(res.message || 'Thêm sản phẩm vào giỏ hàng không thành công!');
					}
				} else {
					toast.warn('Vui lòng lựa chọn size cho sản phẩm!');
				}
			} else {
				router.push('/auth/login');
			}
		} catch (error) {
			console.log(error);
			toast.error('Có lỗi xảy ra!');
			setIsLoading(false);
		}
	};

	const handleBack = () => {
		router.push('/shop?type=all&status=all');
	};

	return (
		<LoadingData isLoading={isLoading}>
			<div className={styles.container}>
				<GridColumn col_2>
					<div className={styles.box_list_image}>
						{listImage[0] && (
							<div className={styles.main_image}>
								<Image
									src={String(listImage[0]?.url)}
									alt='main image'
									layout='fill'
								/>
							</div>
						)}
						<div className={styles.list_image_des}>
							{listImage[1] && (
								<div className={styles.item_image_des}>
									<Image
										src={String(listImage[1]?.url)}
										alt='main image'
										layout='fill'
									/>
								</div>
							)}
							{listImage[2] && (
								<div className={styles.item_image_des}>
									<Image
										src={String(listImage[2]?.url)}
										alt='main image'
										layout='fill'
									/>
								</div>
							)}
							{listImage[3] && (
								<div className={styles.item_image_des}>
									<Image
										src={String(listImage[3]?.url)}
										alt='main image'
										layout='fill'
									/>
								</div>
							)}
							{listImage[4] && (
								<div className={styles.item_image_des}>
									<Image
										src={String(listImage[4]?.url)}
										alt='main image'
										layout='fill'
									/>
								</div>
							)}
						</div>
					</div>
					<div className={styles.box_info}>
						<h4 className={styles.name}>{data?.name}</h4>
						<div className={styles.list_star}>
							{list_star.map((v, i) => (
								<div
									key={i}
									className={clsx(styles.star, {
										[styles.active_star]: v.id <= Number(data?.star),
									})}
								>
									{v.star}
								</div>
							))}
							<p className={styles.review}>({data?.reviews?.length} đánh giá)</p>
						</div>
						<p className={styles.price}>
							<span className={styles.price_1}>
								{convertCoin(Number(data?.price))}đ
							</span>{' '}
							-{' '}
							<span className={styles.price_2}>
								{convertCoin(
									Number(
										Number(data?.price) -
											(Number(data?.price) * Number(data?.sale)) / 100
									)
								)}
								đ
							</span>
						</p>
						<p className={styles.des_main}>{data?.main_des}</p>
						<div className={styles.line}></div>
						<div className={styles.box}>
							<p className={styles.text}>Size:</p>
							<div className={styles.btn_size}>
								{list_size.map((v, i) => (
									<div
										key={i}
										onClick={() => setSize(v.size)}
										className={clsx(styles.size, {
											[styles.unActive]: false,
											[styles.active_size]: size === v.size,
										})}
									>
										<p>{v.size}</p>
									</div>
								))}
							</div>
						</div>
						<div className={styles.box}>
							<p className={styles.text}>Số lượng:</p>
							<div className={styles.box_qlt}>
								<div
									className={clsx(styles.item_qlt, styles.handle, {
										[styles.unActive_qlt]: amount <= 1,
									})}
									onClick={reduceQlt}
								>
									<p>-</p>
								</div>
								<div className={styles.item_qlt}>
									<p>{Number(amount)}</p>
								</div>
								<div
									className={clsx(styles.item_qlt, styles.handle, {
										[styles.unActive_qlt]: amount >= 10,
									})}
									onClick={moreQlt}
								>
									<p>+</p>
								</div>
							</div>
						</div>
						<div className={styles.btn} onClick={handleAddToCart}>
							<FaCartPlus size={16} />
							<p>Thêm vào giỏ hàng</p>
						</div>
						<div className={styles.like}>
							<BsFillSuitHeartFill className={styles.icon_like} color='red' />
							{/* <BsSuitHeart className={styles.icon_like} color='red' /> */}
							<p className={styles.text_like}>Thêm vào danh sách yêu thích</p>
						</div>
						<div className={styles.line}></div>
						<p className={styles.category}>
							Phân loại:{' '}
							<span>
								{data?.category === 1
									? 'Áo len'
									: data?.category === 2
									? 'Quần Jeans'
									: 'Áo Phông'}
							</span>
						</p>
						<p className={styles.category}>
							Trạng thái sản phẩm:{' '}
							<span>
								{data?.isHot && data?.trending
									? 'Đang hot, đang trending'
									: data?.isHot === false && data?.trending
									? 'Đang trending'
									: data?.isHot === false && data?.trending === false
									? 'Chưa cập nhật trạng thái'
									: 'Đang hot'}
							</span>
						</p>
						<p className={styles.category}>
							Mô tả chung: <span>{String(data?.general_des)}</span>
						</p>
						{/* <p className={styles.category}>
							Chi tiết sản phẩm:{' '}
							<div
								dangerouslySetInnerHTML={{
									__html: String(data?.detail_des),
								}}
								style={{
									fontSize: '14px',
									color: '#323448',
									fontWeight: '400',
								}}
							></div>
						</p> */}
						<div className={styles.box_media}>
							<p className={styles.text_media}>Chia sẻ:</p>
							<div className={styles.list_media}>
								<Link href={''} className={styles.media_item}>
									<FaFacebookF />
								</Link>
								<Link href={''} className={styles.media_item}>
									<AiOutlineInstagram size={16} />
								</Link>
								<Link href={''} className={styles.media_item}>
									<BsTwitter />
								</Link>
								<Link href={''} className={styles.media_item}>
									<AiFillYoutube size={16} />
								</Link>
							</div>
						</div>
					</div>
				</GridColumn>
				{/* <div className={styles.line}></div> */}
				<div className={styles.bottom}>
					<div className={styles.category}>
						<p className={styles.title_detail}>Chi tiết sản phẩm:</p>
						<div
							dangerouslySetInnerHTML={{
								__html: String(data?.detail_des),
							}}
							className={styles.text_detail}
						></div>
					</div>

					<div className={styles.category}>
						<p className={styles.title_detail}>
							Đánh giá về sản phẩm: ({data?.reviews.length} đánh giá)
						</p>
						{Number(data?.reviews.length) <= 0 ? (
							<div className={styles.main_empty}>
								<Image src={icons.emptyCart} alt='cart empty' />
								<p className={styles.text_empty}>Sản phẩm chưa có đánh giá nào!</p>
								<div className={styles.btn_empty} onClick={handleBack}>
									<p>Mua hàng</p>
								</div>
							</div>
						) : (
							<div className={styles.list_review}>
								{data?.reviews.map((v, i) => (
									<ItemReview data={v} key={v.id} />
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</LoadingData>
	);
}

export default MainProduct;
