import Image from 'next/image';
import React from 'react';
import {convertCoin} from '~/common/func/convertCoin';
import backgrounds from '~/constants/images/backgrounds';

import styles from './InfoProduct.module.scss';
import {AiFillStar, AiOutlineEye} from 'react-icons/ai';

import {FiHeart} from 'react-icons/fi';
import {VscGitCompare} from 'react-icons/vsc';
import clsx from 'clsx';
import {BsCartPlus} from 'react-icons/bs';
import Link from 'next/link';

interface TypeInfoProduct {
	id: string;
	type: string;
	name: string;
	price_sale: number;
	price: number;
	star: number;
}

function InfoProduct({product}: any) {
	return (
		<div className={styles.container}>
			<div className={styles.box_image}>
				<Image src={product.image} alt='image' layout='fill' />
			</div>
			<div className={styles.content}>
				<p className={styles.text_1}>{product.type}</p>
				<Link href={`product/${product.id}`} className={styles.text_2}>
					{product.name}
				</Link>
				<div className={styles.price}>
					<p className={styles.price_1}>{convertCoin(product.price_sale)}đ</p>
					<p className={styles.price_2}>{convertCoin(product.price)}đ</p>
				</div>
				<div className={styles.star}>
					<AiFillStar />
					<AiFillStar />
					<AiFillStar />
					<AiFillStar />
					<AiFillStar />
					<span>({product.star})</span>
				</div>
			</div>

			<div className={styles.position_1}>
				<div className={clsx(styles.icon, styles.icon_1)}>
					<FiHeart />
				</div>
				<div className={clsx(styles.icon, styles.icon_2)}>
					<VscGitCompare />
				</div>
			</div>

			<div className={styles.position_2}>
				<div className={styles.icon_cart}>
					<BsCartPlus />
				</div>
				<p>Thêm vào giỏ hàng</p>
			</div>
		</div>
	);
}

export default InfoProduct;
