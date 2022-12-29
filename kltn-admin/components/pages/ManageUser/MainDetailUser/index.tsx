import React, {useEffect, useState} from 'react';

import styles from './MainDetailUser.module.scss';
import {TypeUser} from './interfaces';
import {useRouter} from 'next/router';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import userService from '~/api/user';
import {toast} from 'react-toastify';
import LoadingData from '~/components/common/LoadingData';
import Button from '~/components/controls/Button';
import Popup from '~/components/common/Popup';
import PopupChangeRole from '~/components/Popup/PopupChangeRole';

function MainDetailUser() {
	const router = useRouter();
	const idUser = router.asPath.split('/')[3];
	const {token} = useSelector((state: RootState) => state.auth);

	const [isLoading, setIsloading] = useState<boolean>(false);
	const [data, setData] = useState<TypeUser>();
	const [openChangeRole, setOpenChangeRole] = useState<boolean>(false);

	useEffect(() => {
		(async () => {
			try {
				setIsloading(true);

				const res: any = await userService.getCurrentUser({
					token: String(token),
					idUser: idUser,
				});

				if (res.status === 1) {
					setData(res.data);
					setIsloading(false);
				} else {
					setIsloading(false);
					toast.warn(res.message);
				}
			} catch (error) {
				setIsloading(false);
				console.log(error);
				toast.error('Có lỗi xảy ra!');
			}
		})();
	}, [router, idUser, token]);

	const handleChangeRole = async () => {
		try {
			setIsloading(true);
			const res: any = await userService.changeRoleUser({
				token: String(token),
				idUser: idUser,
			});

			if (res.status === 0) {
				setIsloading(false);
				toast.warn(res.message || 'Thay đổi quyền không thành công!');
				setOpenChangeRole(false);
			} else if (res.status === 1) {
				setOpenChangeRole(false);
				setIsloading(false);
				toast.success(res.message || 'Thay đổi quyền thành công!');
				router.replace(router.asPath, undefined, {scroll: false}); // reload page
			}
		} catch (error) {
			setIsloading(false);
			console.log(error);
			toast.error('Có lỗi xảy ra!');
			setOpenChangeRole(false);
		}
	};

	return (
		<LoadingData isLoading={isLoading}>
			<div className={styles.container}>
				<h4 className={styles.title}>Chi tiết tài khoản</h4>
				<div className={styles.item}>
					<p className={styles.text_1}>Tên tài khoản :</p>
					<p className={styles.text_2}>
						{data?.username ? data.username : 'Chưa cập nhật'}
					</p>
				</div>
				<div className={styles.item}>
					<p className={styles.text_1}>Loại tài khoản :</p>
					<p className={styles.text_2}>{data?.isAdmin ? 'ADMIM' : 'Người dùng'}</p>
				</div>
				<div className={styles.item}>
					<p className={styles.text_1}>Tên người dùng :</p>
					<p className={styles.text_2}>{data?.name ? data.name : 'Chưa cập nhật'}</p>
				</div>
				<div className={styles.item}>
					<p className={styles.text_1}>Địa chỉ email :</p>
					<p className={styles.text_2}>{data?.email ? data.email : 'Chưa cập nhật'}</p>
				</div>
				<div className={styles.item}>
					<p className={styles.text_1}>Số điện thoại :</p>
					<p className={styles.text_2}>
						{data?.phone ? Number(data.phone) : 'Chưa cập nhật'}
					</p>
				</div>
				<div className={styles.item}>
					<p className={styles.text_1}>Ngày, tháng, năm sinh :</p>
					<p className={styles.text_2}>
						{data?.dateBirth && data.monthBirth && data.yearBirth
							? `${data.dateBirth}/${data.monthBirth}/${data.yearBirth}`
							: 'Chưa cập nhật'}
					</p>
				</div>
				<div className={styles.item}>
					<p className={styles.text_1}>Giới tính :</p>
					<p className={styles.text_2}>
						{data?.sex
							? data.sex === 1
								? 'Nam'
								: data.sex === 2
								? 'Nữ'
								: 'Khác'
							: 'Chưa cập nhật'}
					</p>
				</div>
				<div className={styles.item}>
					<p className={styles.text_1}>Danh sách địa chỉ :</p>
				</div>
				{data?.address.map((v, i) => (
					<div key={String(v.id)} className={styles.address_item}>
						<p className={styles.text_2}>{`${i + 1}. ${v.name}, 0${v.phone}, ${
							v.specifically
						} - ${v.ward} - ${v.district} - ${v.city}`}</p>
					</div>
				))}

				<div className={styles.group_btn}>
					<Button bg_gray p_8_24 rounded_6 onClick={() => router.back()}>
						Quay lại
					</Button>
					<Button primary4 p_8_24 rounded_6 onClick={() => setOpenChangeRole(true)}>
						Thay đổi quyền cho tài khoản
					</Button>
				</div>
			</div>
			<Popup open={openChangeRole} onClose={() => setOpenChangeRole(false)}>
				<PopupChangeRole
					handleSumit={handleChangeRole}
					onClose={() => setOpenChangeRole(false)}
				/>
			</Popup>
		</LoadingData>
	);
}

export default MainDetailUser;
