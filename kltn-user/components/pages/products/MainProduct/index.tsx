import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React, {useState} from 'react';
import {AiFillStar, AiFillYoutube, AiOutlineInstagram} from 'react-icons/ai';
import {BsFillSuitHeartFill, BsTwitter} from 'react-icons/bs';
import {FaCartPlus, FaFacebookF} from 'react-icons/fa';
import {convertCoin} from '~/common/func/convertCoin';
import GridColumn from '~/components/layout/GridColumn';
import DetailDes from '../DetailDes';
import GeneralDes from '../GeneralDes';
import Reviews from '../Reviews';
import styles from './MainProduct.module.scss';

function MainProduct() {
	const [size, setSize] = useState<number>();
	const [tab, setTab] = useState<number>(1);

	const list_image: Array<any> = [
		'https://d-themes.com/react_asset_api/molla/uploads/3_big_b85715002c.jpg',
		'https://d-themes.com/react_asset_api/molla/uploads/4_big_806ac0c831.jpg',
		'https://d-themes.com/react_asset_api/molla/uploads/4_big_806ac0c831.jpg',
		'https://d-themes.com/react_asset_api/molla/uploads/4_big_806ac0c831.jpg',
	];

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

	return (
		<div className={styles.container}>
			<GridColumn col_2>
				<div className={styles.box_list_image}>
					<div className={styles.main_image}>
						<Image src={list_image[0]} alt='main image' layout='fill' />
					</div>
					<div className={styles.list_image_des}>
						{list_image.map((v, i) => (
							<div key={i} className={styles.item_image_des}>
								<Image src={v} alt='main image' layout='fill' />
							</div>
						))}
					</div>
				</div>
				<div className={styles.box_info}>
					<h4 className={styles.name}>Tên sản phẩm</h4>
					<div className={styles.list_star}>
						{list_star.map((v, i) => (
							<div
								key={i}
								className={clsx(styles.star, {[styles.active_star]: v.id <= 4})}
							>
								{v.star}
							</div>
						))}
						<p className={styles.review}>(10 đánh giá)</p>
					</div>
					<p className={styles.price}>
						<span className={styles.price_1}>{convertCoin(125000)}đ</span> -{' '}
						<span className={styles.price_2}>{convertCoin(125000)}đ</span>
					</p>
					<p className={styles.des_main}>
						Đây là mô tả chính của sản phẩm Sed egestas, ante et vulputate volutpat,
						eros pede semper est, vitae luctus metus libero eu augue. Morbi purus
						libero, faucibus adipiscing. Sed lectus.
					</p>
					<div className={styles.line}></div>
					<div className={styles.box}>
						<p className={styles.text}>Size:</p>
						<div className={styles.btn_size}>
							{list_size.map((v, i) => (
								<div
									key={i}
									onClick={() => setSize(i)}
									className={clsx(styles.size, {
										[styles.unActive]: false,
										[styles.active_size]: size === i,
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
									[styles.unActive_qlt]: false,
								})}
							>
								<p>-</p>
							</div>
							<div className={styles.item_qlt}>
								<p>3</p>
							</div>
							<div
								className={clsx(styles.item_qlt, styles.handle, {
									[styles.unActive_qlt]: false,
								})}
							>
								<p>+</p>
							</div>
						</div>
					</div>
					<div className={styles.btn}>
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
						Phân loại: <span>Áo phông</span>
					</p>
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
				<div className={styles.list_tab}>
					<div
						className={clsx(styles.tab_item, {[styles.tab_active]: tab === 1})}
						onClick={() => setTab(1)}
					>
						<p>Mô tả chung</p>
					</div>
					<div
						className={clsx(styles.tab_item, {[styles.tab_active]: tab === 2})}
						onClick={() => setTab(2)}
					>
						<p>Chi tiết mô tả</p>
					</div>
					<div
						className={clsx(styles.tab_item, {[styles.tab_active]: tab === 3})}
						onClick={() => setTab(3)}
					>
						<p>Đánh giá (10 đánh giá)</p>
					</div>
				</div>
				<div className={styles.content}>
					{tab === 1 && <GeneralDes />}
					{tab === 2 && <DetailDes />}
					{tab === 3 && <Reviews />}
				</div>
			</div>
		</div>
	);
}

export default MainProduct;
