import {useRouter} from 'next/router';
import React, {useState} from 'react';
import {FaTimes} from 'react-icons/fa';
import {useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import productService from '~/api/product';
import Button from '~/components/controls/Button';
import {RootState} from '~/redux/store';
import Image from 'next/image';

import styles from './PopupPreviewImage.module.scss';
import {TypePopup} from './interfaces';
import LoadingData from '~/components/common/LoadingData';

function PopupPreviewImage({onClose}: TypePopup) {
	const router = useRouter();
	const [isLoading, setIsloading] = useState<boolean>(false);

	const idProduct = router.asPath.split('/')[3];
	const {token} = useSelector((state: RootState) => state.auth);

	// State thêm ảnh sản phẩm
	const [preview, setPreview] = useState<any>(null);

	const [dataForm, setDataForm] = useState({
		token: String(token),
		idProduct: idProduct,
		file: '',
	});

	const handleColsed = () => {
		setPreview(null);
		setDataForm((prev) => ({...prev, file: ''}));
	};

	const handleSelectImg = (e: any) => {
		const file = e.target.files[0];
		const maxSize = 8; //MB
		if (file.size / 1000000 > maxSize) {
			toast.warning(`Kích thước tối đa của ảnh là ${maxSize} mb`);
		} else if (
			file.type !== 'image/jpeg' &&
			file.type !== 'image/jpg' &&
			file.type !== 'image/png'
		) {
			toast.warning(`Định dạng tệp không chính xác, đuôi tệp chấp nhận jpg, jpeg, png`);
		} else {
			setPreview(URL.createObjectURL(file));
			setDataForm((prev) => ({...prev, file: file}));
		}
	};

	// Submit xóa ảnh
	const handleSubmit = () => {
		const {file} = dataForm;
		const formdata: any = new FormData();
		formdata.append('file', file);
		formdata.append('idProduct', idProduct);

		(async () => {
			try {
				if (file) {
					setIsloading(true);
					const res: any = await productService.addImageProduct({
						token: dataForm.token,
						formdata: formdata,
					});

					console.log(res);

					if (res.status === 1) {
						onClose();
						setIsloading(false);
						toast.success(res.message || 'Thêm ảnh thành công!');
						router.replace(router.asPath); // reload page
					} else {
						setIsloading(false);
						toast.warn(res.message || 'Thêm ảnh thất bại!');
					}
				} else {
					toast.warn('Không có ảnh nào được thêm!');
				}
			} catch (error) {
				console.log(error);
				setIsloading(false);
				toast.error('Có lỗi xảy ra!');
			}
		})();
	};
	return (
		<LoadingData isLoading={isLoading}>
			<div className={styles.container}>
				<p className={styles.text}>Thêm ảnh cho sản phẩm!</p>
				<div className={styles.select_preview}>
					{preview ? (
						<div className={styles.closed_img} onClick={handleColsed}>
							<FaTimes />
						</div>
					) : (
						<label htmlFor='select-img' className={styles.select_img}>
							Chọn ảnh
							<input
								hidden
								onChange={handleSelectImg}
								onClick={(e: any) => {
									e.target.value = null;
								}}
								type='file'
								name='file'
								id='select-img'
							/>
						</label>
					)}
					{preview && (
						<div className={styles.preview}>
							<Image src={preview} alt='preview' layout='fill' objectFit='cover' />
						</div>
					)}
				</div>
				<div className={styles.group}>
					<Button bg_gray p_8_24 rounded_6 onClick={onClose}>
						Hủy
					</Button>
					<Button primary4 p_8_24 rounded_6 onClick={handleSubmit}>
						Thêm ảnh
					</Button>
				</div>
			</div>
		</LoadingData>
	);
}

export default PopupPreviewImage;
