import React, {useEffect, useMemo} from 'react';
import Image from 'next/image';

import styles from './ItemCart.module.scss';
import Link from 'next/link';
import {convertCoin} from '~/common/func/convertCoin';
import {RiDeleteBin5Line} from 'react-icons/ri';
import {TypeItemCart} from './interfaces';
import cartService from '~/api/cart';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import {toast} from 'react-toastify';
import {useRouter} from 'next/router';

function ItemCart({data, onClose}: TypeItemCart) {
	const router = useRouter();
	const {token} = useSelector((state: RootState) => state.auth);

	const deleteCart = async (id: String) => {
		const res: any = await cartService.deleteCart({
			token: String(token),
			idCart: String(id),
		});

		if (res.status === 1) {
			toast.success('Xóa giỏ hàng thành công!');
			onClose();
			router.reload(); // reload page
		} else {
			toast.warn('Có lỗi xảy ra!');
			onClose();
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.box_image}>
				<Image
					className={styles.image}
					objectFit='cover'
					src={String(data.image)}
					alt='day la anh san pham'
					layout='fill'
				/>
			</div>
			<div className={styles.info}>
				<Link href={`/product/${data.idProduct}`} className={styles.name} onClick={onClose}>
					{String(data.nameProduct)}
				</Link>
				<div className={styles.total_price}>
					<span className={styles.qlt}>{Number(data.amount)}</span>
					<span className={styles.x}>x</span>
					<span className={styles.price}>{convertCoin(Number(Number(data.price)))}đ</span>
					<span className={styles.size}>Size: {data.size}</span>
				</div>
				<div className={styles.des}>
					<p>Tạm tính: </p>
					<p className={styles.price}>{convertCoin(Number(data.totalPrice))}đ</p>
				</div>
			</div>
			<div className={styles.delete} onClick={() => deleteCart(data._id)}>
				<RiDeleteBin5Line />
			</div>
		</div>
	);
}

export default ItemCart;
