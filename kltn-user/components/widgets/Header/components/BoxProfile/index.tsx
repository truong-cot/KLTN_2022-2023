import Link from 'next/link';
import {useRouter} from 'next/router';
import React from 'react';
import {FaRegUser, FaUser} from 'react-icons/fa';
import {MdLogout} from 'react-icons/md';
import {useDispatch} from 'react-redux';
import {toast} from 'react-toastify';
import {logout} from '~/redux/reducers/authSlice';

import styles from './BoxProfile.module.scss';

interface TypeBox {
	closeBox: () => void;
}

function BoxProfile({closeBox}: TypeBox) {
	const dispatch = useDispatch();
	const listMenu: Array<any> = [
		{
			icon: <FaRegUser />,
			text: 'Profile',
			href: '/profile',
		},
	];

	const handleLogout = () => {
		toast.success('Đăng xuất tài khoản thành công!');
		dispatch(logout());
	};

	return (
		<div className={styles.container}>
			{listMenu.map((item, index) => (
				<Link onClick={closeBox} key={index} href={item.href} className={styles.block}>
					<div className={styles.icon}>{item.icon}</div>
					<p className={styles.text}>{item.text}</p>
				</Link>
			))}
			<div className={styles.block} onClick={handleLogout}>
				<div className={styles.icon}>
					<MdLogout />
				</div>
				<p className={styles.text}>Đăng xuất</p>
			</div>
		</div>
	);
}

export default BoxProfile;
