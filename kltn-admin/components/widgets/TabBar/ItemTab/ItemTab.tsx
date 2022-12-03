import clsx from 'clsx';
import {ArrowRight2} from 'iconsax-react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {Fragment, useEffect, useState} from 'react';
// import DisplayProtected from '~/components/protected/DisplayProtected';
import {PropsItemTab} from '../interface';
import styles from './ItemTab.module.scss';

function ItemTab({item, showTabBar, onShowTabBar, index}: PropsItemTab) {
	const router = useRouter();

	const [open, setOpen] = useState<boolean>(false);

	useEffect(() => {
		if (!isActive(item.href, 1)) {
			setOpen(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [item.href, router]);

	const isActive = (href: string, index: number) => {
		return router.pathname.split('/')[index] === href.split('/')[index];
	};

	return (
		<Fragment>
			<Link
				href={item.href}
				key={index}
				className={clsx(styles.itemNav, {
					[styles.active]: isActive(item.href, 1),
				})}
			>
				<div className={styles.icon}>{item.icon}</div>
				{showTabBar && <p className={styles.text}>{item.title}</p>}
			</Link>
		</Fragment>
	);
}

export default ItemTab;
