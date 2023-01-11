import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import Button from '~/components/controls/Button';
import {logout} from '~/redux/reducers/authSlice';
import {RootState} from '~/redux/store';
import styles from './InfoProfile.module.scss';
import {useRouter} from 'next/router';

function InfoProfile() {
	const dispatch = useDispatch();
	const router = useRouter();
	const {userData} = useSelector((state: RootState) => state.user);

	const handleLogout = () => {
		toast.success('Đăng xuất tài khoản thành công!');
		dispatch(logout());
	};

	return (
		<div className={styles.container}>
			<h4 className={styles.title}>Quản lý tài khoản</h4>
			<div className={styles.item}>
				<p className={styles.text_1}>Tên tài khoản :</p>
				<p className={styles.text_2}>
					{userData?.username ? userData.username : 'Chưa cập nhật'}
				</p>
			</div>
			<div className={styles.item}>
				<p className={styles.text_1}>Loại tài khoản :</p>
				<p className={styles.text_2}>{userData?.isAdmin ? 'ADMIM' : 'Người dùng'}</p>
			</div>
			<div className={styles.item}>
				<p className={styles.text_1}>Tên người dùng :</p>
				<p className={styles.text_2}>{userData?.name ? userData.name : 'Chưa cập nhật'}</p>
			</div>
			<div className={styles.item}>
				<p className={styles.text_1}>Địa chỉ email :</p>
				<p className={styles.text_2}>
					{userData?.email ? userData.email : 'Chưa cập nhật'}
				</p>
			</div>
			<div className={styles.item}>
				<p className={styles.text_1}>Số điện thoại :</p>
				<p className={styles.text_2}>
					{userData?.phone ? Number(userData.phone) : 'Chưa cập nhật'}
				</p>
			</div>
			<div className={styles.item}>
				<p className={styles.text_1}>Ngày, tháng, năm sinh :</p>
				<p className={styles.text_2}>
					{userData?.dateBirth && userData.monthBirth && userData.yearBirth
						? `${userData.dateBirth}/${userData.monthBirth}/${userData.yearBirth}`
						: 'Chưa cập nhật'}
				</p>
			</div>
			<div className={styles.item}>
				<p className={styles.text_1}>Giới tính :</p>
				<p className={styles.text_2}>
					{userData?.sex
						? userData.sex === 1
							? 'Nam'
							: userData.sex === 2
							? 'Nữ'
							: 'Khác'
						: 'Chưa cập nhật'}
				</p>
			</div>
			<div className={styles.item}>
				<p className={styles.text_1}>Danh sách địa chỉ :</p>
			</div>
			{userData?.address.map((v: any, i: any) => (
				<div key={String(v.id)} className={styles.address_item}>
					<p className={styles.text_2}>{`${i + 1}. ${v.name}, 0${v.phone}, ${
						v.specifically
					} - ${v.ward} - ${v.district} - ${v.city}`}</p>
				</div>
			))}
			<div className={styles.main}>
				<Button
					primary2
					p_8_24
					rounded_6
					onClick={() =>
						router.push({
							pathname: router.pathname,
							query: {
								...router.query,
								_changeInfo: true,
							},
						})
					}
				>
					Chỉnh sửa
				</Button>
				<Button primary4 p_8_24 rounded_6 onClick={handleLogout}>
					Đăng xuất
				</Button>
			</div>
		</div>
	);
}

export default InfoProfile;
