import clsx from 'clsx';
import {ArrowRight2} from 'iconsax-react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {Fragment, useEffect, useState} from 'react';
import {PropsItemTab} from '../../interface';
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

	return item?.menu ? (
		<Fragment>
			<div
				key={index}
				className={clsx(styles.itemNav, styles.tabItem, {
					[styles.active]: open && showTabBar,
				})}
				onClick={() => {
					!showTabBar && onShowTabBar();
					setOpen(!open);
				}}
			>
				<div className={styles.group}>
					<div className={styles.icon}>{open ? item.iconActive : item.icon}</div>
					{showTabBar && <p className={styles.text}>{item.title}</p>}
				</div>
				<div className={styles.iconArrow}>
					<ArrowRight2 />
				</div>
			</div>
			{open && showTabBar && (
				<div className={styles.listMenu}>
					{item.menu.map((v, i) => (
						<DisplayProtected key={i} code={v.code}>
							<Link href={v.href}>
								<a
									className={clsx(styles.itemNav, styles.itemMenu, {
										[styles.active]: isActive(v.href, 2),
									})}
								>
									<div className={styles.icon}>{v.icon}</div>
									{showTabBar && <p className={styles.text}>{v.title}</p>}
								</a>
							</Link>
						</DisplayProtected>
					))}
				</div>
			)}
		</Fragment>
	) : (
		<Link href={item.href} key={index}>
			<a
				className={clsx(styles.itemNav, {
					[styles.active]: isActive(item.href, 1),
				})}
			>
				<div className={styles.icon}>
					{isActive(item.href, 1) ? item.iconActive : item.icon}
				</div>
				{showTabBar && <p className={styles.text}>{item.title}</p>}
			</a>
		</Link>
	);
}

export default ItemTab;
