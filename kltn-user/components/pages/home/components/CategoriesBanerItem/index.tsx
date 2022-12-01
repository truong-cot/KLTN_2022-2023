import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

import {HiArrowRight} from 'react-icons/hi';

import styles from './CategoriesBanerItem.module.scss';

function CategoriesBanerItem({image, title, textActive}: any) {
	return (
		<div className={clsx(styles.container)} style={{backgroundImage: `url(${image})`}}>
			<div className={styles.inner}></div>
			<div className={styles.content}>
				<p className={clsx(styles.text_1, {[styles.textActive]: textActive})}>
					Trending now
				</p>
				<h5 className={clsx(styles.text_2, {[styles.textActive_2]: textActive})}>
					{title}
				</h5>
				<Link href='/' className={clsx(styles.link, {[styles.textActive_3]: textActive})}>
					<p>SHOP NOW</p>
					<HiArrowRight />
				</Link>
			</div>
		</div>
	);
}

export default CategoriesBanerItem;
