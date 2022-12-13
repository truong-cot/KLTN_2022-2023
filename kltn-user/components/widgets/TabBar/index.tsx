import Image from 'next/image';
import React from 'react';
import backgrounds from '~/constants/images/backgrounds';
import NavLink from './NavLink';

import styles from './TabBar.module.scss';

function TabBar() {
	return (
		<div className={styles.container}>
			<div className={styles.box_info}>
				<div className={styles.box_image}>
					<Image
						className={styles.image}
						objectFit='cover'
						src={backgrounds.image_product}
						alt='avatar'
						layout='fill'
					/>
				</div>
				<div className={styles.info}>
					<p className={styles.text}>Tài khoản của</p>
					<p className={styles.name}>Đặng Bá Trường</p>
				</div>
			</div>

			<div className={styles.main}>
				<NavLink />
			</div>
		</div>
	);
}

export default TabBar;
