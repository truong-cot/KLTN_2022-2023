import Image from 'next/image';
import React from 'react';
import {convertCoin} from '~/common/func/convertCoin';

import styles from './InfoProduct.module.scss';
import {AiFillStar} from 'react-icons/ai';

import {FiHeart} from 'react-icons/fi';
import {VscGitCompare} from 'react-icons/vsc';
import clsx from 'clsx';
import Link from 'next/link';

function InfoProduct({product}: any) {
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

	return (
		<div className={styles.container}>
			<div className={styles.box_image}>
				<Image src={product?.images[0]?.url} alt='image' layout='fill' />
			</div>
			<div className={styles.content}>
				<p className={styles.text_1}>{product.type}</p>
				<Link href={`product/${product._id}`} className={styles.text_2}>
					{product.name}
				</Link>

				<div className={styles.price}>
					<p className={styles.price_1}>
						{convertCoin(
							product.sale
								? product.price - (product.sale * product.price) / 100
								: product.price
						)}
						đ
					</p>
					<p className={styles.price_2}>{convertCoin(product.price)}đ</p>
				</div>
				<div className={styles.list_star}>
					{list_star.map((v, i) => (
						<div
							key={i}
							className={clsx(styles.star, {
								[styles.active_star]: v.id <= Number(product?.star),
							})}
						>
							{v.star}
						</div>
					))}
					<p className={styles.review}>({product?.reviews?.length} đánh giá)</p>
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
		</div>
	);
}

export default InfoProduct;
