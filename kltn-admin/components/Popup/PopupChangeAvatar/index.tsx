import {useRouter} from 'next/router';
import React, {useState} from 'react';
import {FaTimes} from 'react-icons/fa';
import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import Button from '~/components/controls/Button';
import {RootState} from '~/redux/store';
import Image from 'next/image';

import styles from './PopupChangeAvatar.module.scss';
import {TypePopup} from './interfaces';
import LoadingData from '~/components/common/LoadingData';
import userService from '~/api/user';
import {updateDataUser} from '~/redux/reducers/userSlice';

function PopupChangeAvatar({onClose}: TypePopup) {
	const router = useRouter();
	const dispatch = useDispatch();

	const [isLoading, setIsloading] = useState<boolean>(false);

	const {token} = useSelector((state: RootState) => state.auth);
	const {userData} = useSelector((state: RootState) => state.user);

	// State thêm ảnh sản phẩm
	const [preview, setPreview] = useState<any>(null);

	const [dataForm, setDataForm] = useState({
		token: String(token),
		idUser: userData._id,
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
		const {idUser} = dataForm;
		const formdata: any = new FormData();

		formdata.append('file', file);
		formdata.append('idUser', idUser);

		(async () => {
			try {
				if (file) {
					setIsloading(true);
					const res: any = await userService.changeAvatarUser({
						formdata: formdata,
						token: String(token),
					});
					if (res.status === 1) {
						onClose();
						setIsloading(false);
						dispatch(updateDataUser(res.data));
						toast.success(res.message || 'Thay đổi ảnh đại diện thành công!');
						router.replace(router.asPath); // reload page
					} else {
						setIsloading(false);
						toast.warn(res.message || 'Thay đổi ảnh đại diện thất bại!');
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
				<p className={styles.text}>Thay đổi ảnh đại diện!</p>
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
						Thay đổi
					</Button>
				</div>
			</div>
		</LoadingData>
	);
}

export default PopupChangeAvatar;
