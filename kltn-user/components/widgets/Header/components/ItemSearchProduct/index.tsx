import React from 'react';
import Image from 'next/image';

import styles from './ItemSearchProduct.module.scss';
import Link from 'next/link';

interface TypeData {
	data: {
		_id: String;
		name: String;
		price: Number;
		category: Number;
		sale: Number;
		images: Array<any>;
		amount_size_S: Number;
		amount_size_M: Number;
		amount_size_L: Number;
		amount_size_XL: Number;
		isHot: boolean;
		trending: boolean;
		star: Number;
	};
	hide: () => void;
}

function ItemSearchProduct({data, hide}: TypeData) {
	return (
		<div className={styles.container}>
			<div className={styles.box_image}>
				{data.images[0] && (
					<Image
						className={styles.image}
						objectFit='cover'
						src={data?.images[0]?.url}
						alt='day la anh san pham'
						layout='fill'
					/>
				)}
			</div>
			<div className={styles.info}>
				<Link href={`/product/${data._id}`} className={styles.name} onClick={hide}>
					{data?.name}
				</Link>
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
			</div>
		</div>
	);
}

export default ItemSearchProduct;
