import {Warning2} from 'iconsax-react';
import React, {useState} from 'react';
import Button from '~/components/controls/Button';

import styles from './PopupDeleteAddress.module.scss';
import {toast} from 'react-toastify';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import LoadingData from '~/components/common/LoadingData';
import userService from '~/api/user';
import {updateDataUser} from '~/redux/reducers/userSlice';

interface TypePopup {
	onClose: () => void;
	idAddress: string;
}

function PopupDeleteAddress({onClose, idAddress}: TypePopup) {
	const dispatch = useDispatch();

	const {token} = useSelector((state: RootState) => state.auth);
	const {userData} = useSelector((state: RootState) => state.user);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	// Xoa
	const handleDelete = async () => {
		try {
			setIsLoading(true);

			const res: any = await userService.deleteAddress({
				token: String(token),
				idUser: userData._id,
				idAddress: idAddress,
			});

			if (res.status === 1) {
				setIsLoading(false);
				toast.success(res.message || 'Xóa địa chỉ giao hàng thành công!');
				dispatch(updateDataUser(res.data));
				onClose();
			} else if (res.status === 0) {
				setIsLoading(false);
				onClose();
				toast.warn(res.message || 'Xóa địa chỉ giao hàng không thành công!');
			}
		} catch (error) {
			console.log(error);
			toast.error('Có lỗi xảy ra!');
			setIsLoading(false);
		}
	};

	return (
		<LoadingData isLoading={isLoading}>
			<div className={styles.container}>
				<Warning2 size={54} color='red' />
				<p className={styles.text}>Bạn có chắc chắn muốn xóa địa chỉ này?</p>
				<p className={styles.des}>Xóa địa chỉ sẽ không được khôi phục lại!</p>
				<div className={styles.group}>
					<Button bg_gray p_8_24 rounded_6 onClick={onClose}>
						Hủy
					</Button>
					<Button primary4 p_8_24 rounded_6 onClick={handleDelete}>
						Xóa địa chỉ
					</Button>
				</div>
			</div>
		</LoadingData>
	);
}

export default PopupDeleteAddress;
