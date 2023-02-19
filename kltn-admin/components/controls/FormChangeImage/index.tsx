import {useRouter} from 'next/router';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import productService from '~/api/product';
import {RootState} from '~/redux/store';
import Image from 'next/image';

import styles from './FormChangeImage.module.scss';
import {TypeForm} from './interfaces';
import {toast} from 'react-toastify';
import {IoMdClose} from 'react-icons/io';
import Button from '../Button';
import clsx from 'clsx';
import LoadingData from '~/components/common/LoadingData';
import Popup from '~/components/common/Popup';
import PopupPreviewImage from '~/components/Popup/PopupPreviewImage';

function FormChangeImage({images}: TypeForm) {
	const router = useRouter();
	const [open, setOpen] = useState<boolean>(false);

	const idProduct = router.asPath.split('/')[3];
	const {token} = useSelector((state: RootState) => state.auth);

	const [isLoading, setIsloading] = useState<boolean>(false);
	const [activeImage, setActiveImage] = useState<number>();
	const [idImage, setIdImage] = useState<string>('');

	// Xóa ảnh sản phẩm
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
				router.replace(router.asPath); // reload page
			}
		} catch (error) {
			setIsloading(false);
			console.log(error);
			toast.error('Có lỗi xảy ra!');
		}
	};

	return (
		<LoadingData isLoading={isLoading}>
			<div className={styles.container}>
				{images.length < 5 && (
					<div className={styles.btn}>
						<Button primary4 p_8_24 rounded_6 onClick={() => setOpen(true)}>
							Thêm ảnh
						</Button>
					</div>
				)}
				<div className={styles.box_image}>
					{images?.length <= 0
						? 'Sản phẩm chưa có ảnh nào!'
						: images?.map((v, i) => (
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
										objectFit='cover'
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
				</div>
			</div>

			{/* Popup */}
			<Popup open={open} onClose={() => setOpen(false)}>
				<PopupPreviewImage onClose={() => setOpen(false)} />
			</Popup>
		</LoadingData>
	);
}

export default FormChangeImage;
