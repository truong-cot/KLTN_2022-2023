import clsx from 'clsx';
import Link from 'next/link';
import {useRouter} from 'next/router';
import React from 'react';
import {FaMapMarkerAlt} from 'react-icons/fa';
import {HiOutlineUser, HiUser} from 'react-icons/hi';
import {FiMapPin} from 'react-icons/fi';

import styles from './NavLink.module.scss';
import {AiOutlineShopping, AiTwotoneShopping} from 'react-icons/ai';
import {RiLockPasswordFill, RiLockPasswordLine} from 'react-icons/ri';

function NavLink() {
	const router = useRouter();

	const data: Array<any> = [
		{
			icon: <HiOutlineUser />,
			iconActive: <HiUser />,
			text: 'Thông tin cá nhân',
			link: '/profile',
		},
		{
			icon: <FiMapPin />,
			iconActive: <FaMapMarkerAlt />,
			text: 'Sổ địa chỉ',
			link: '/profile/address',
		},
		{
			icon: <AiOutlineShopping />,
			iconActive: <AiTwotoneShopping />,
			text: 'Quản lý đơn hàng',
			link: '/profile/my-order',
		},
		{
			icon: <RiLockPasswordLine />,
			iconActive: <RiLockPasswordFill />,
			text: 'Đổi mật khẩu',
			link: '/profile/change-password',
		},
	];

	const isActive = (link: any) => {
		return router.pathname === link;
	};

	return (
		<div className={styles.container}>
			{data.map((item, index) => (
				<Link
					key={index}
					href={item.link}
					className={clsx(styles.main, {[styles.active]: isActive(item.link)})}
				>
					<div className={styles.box_icon}>
						{isActive(item.link) === true ? item.iconActive : item.icon}
					</div>
					<p className={styles.text}>{item.text}</p>
				</Link>
			))}
		</div>
	);
}

export default NavLink;
