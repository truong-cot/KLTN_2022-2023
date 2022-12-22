import Image from 'next/image';
import React from 'react';
import backgrounds from '~/constants/images/backgrounds';
import NavLink from './NavLink';

import styles from './TabBar.module.scss';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';

function TabBar() {
	const {userData} = useSelector((state: RootState) => state.user);

	return (
		<div className={styles.container}>
			<div className={styles.box_info}>
				<div className={styles.box_image}>
					<Image
						className={styles.image}
						objectFit='cover'
						src={
							userData.avatar
								? userData.avatar
								: 'https://futbolita.com/wp-content/uploads/2008/11/avatar-1577909_960_720.png'
						}
						alt='avatar'
						layout='fill'
					/>
				</div>
				<div className={styles.info}>
					<p className={styles.text}>Tài khoản của</p>
					<p className={styles.name}>{userData.name}</p>
				</div>
			</div>

			<div className={styles.main}>
				<NavLink />
			</div>
		</div>
	);
}

export default TabBar;
