import {GiConfirmed} from 'react-icons/gi';
import React, {useState} from 'react';
import Button from '~/components/controls/Button';

import styles from './PopupChangeDefaultAddress.module.scss';
import orderService from '~/api/order';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import {toast} from 'react-toastify';
import {useRouter} from 'next/router';
import LoadingData from '~/components/common/LoadingData';
import userService from '~/api/user';
import {updateDataUser} from '~/redux/reducers/userSlice';

interface TypePopup {
	onClose: () => void;
	idAddress: String;
}

function PopupChangeDefaultAddress({onClose, idAddress}: TypePopup) {
	const dispatch = useDispatch();

	const {token} = useSelector((state: RootState) => state.auth);
	const {userData} = useSelector((state: RootState) => state.user);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleChangeDefault = async () => {
		try {
			setIsLoading(true);

			const res: any = await userService.changeDefaultAddress({
				token: String(token),
				idUser: userData._id,
				idAddress: idAddress,
			});

			if (res.status === 1) {
				setIsLoading(false);
				toast.success(res.message || 'Thay đổi địa chỉ mặc định thành công!');
				dispatch(updateDataUser(res.data));
				onClose();
			} else if (res.status === 0) {
				setIsLoading(false);
				toast.warn(res.message || 'Thay đổi địa chỉ mặc định không thành công!');
				onClose();
			}
		} catch (error) {
			console.log(error);
			toast.error('Có lỗi xảy ra!');
			setIsLoading(false);
			onClose();
		}
	};

	return (
		<LoadingData isLoading={isLoading}>
			<div className={styles.container}>
				<GiConfirmed size={54} color='green' />
				<p className={styles.text}>Bạn có chắc chắn muốn đặt địa làm mặc định?</p>
				<p className={styles.des}>Xác nhận đặt địa chỉ mặc định!</p>
				<div className={styles.group}>
					<Button bg_gray p_8_24 rounded_6 onClick={onClose}>
						Hủy
					</Button>
					<Button primary4 p_8_24 rounded_6 onClick={handleChangeDefault}>
						Xác nhận
					</Button>
				</div>
			</div>
		</LoadingData>
	);
}

export default PopupChangeDefaultAddress;
