import React from 'react';
import {useDispatch} from 'react-redux';
import {toast} from 'react-toastify';
import Button from '~/components/controls/Button';
import {logout} from '~/redux/reducers/authSlice';

import styles from './MainProfile.module.scss';

function MainProfile() {
	const dispatch = useDispatch();

	const handleLogout = () => {
		toast.success('Đăng xuất tài khoản thành công!');
		dispatch(logout());
	};

	return (
		<div className={styles.container}>
			<h4 className={styles.title}>Quản lý tài khoản</h4>
			<div className={styles.main}>
				<Button onClick={handleLogout}>Đăng xuất</Button>
			</div>
		</div>
	);
}

export default MainProfile;
