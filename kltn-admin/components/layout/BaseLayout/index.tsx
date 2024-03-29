import clsx from 'clsx';
import {useRouter} from 'next/router';
import {Fragment, useEffect, useState} from 'react';

import {PropsBaseLayout} from './interfaces';
import styles from './BaseLayout.module.scss';
import {RootState} from '~/redux/store';
import {useSelector} from 'react-redux';
import TabBar from '~/components/widgets/TabBar';
import Header from '~/components/widgets/Header';
import RequireAuth from '~/components/protected/RequiredAuth';

function BaseLayout({children, hiddenHeader, title}: PropsBaseLayout) {
	const router = useRouter();
	const [openMenu, setOpenMenu] = useState<boolean>(false);
	const {showTabBar} = useSelector((state: RootState) => state.interface);

	useEffect(() => {
		setOpenMenu(false);
	}, [router]);

	return (
		<RequireAuth>
			{openMenu && <div className={styles.overlay} onClick={() => setOpenMenu(false)}></div>}
			<header className={clsx(styles.header, {[styles.hidden]: !showTabBar})}>
				{!hiddenHeader && (
					<Header
						title={title}
						toggleMenu={() => setOpenMenu(!openMenu)}
						openMenu={openMenu}
					/>
				)}
			</header>
			<div
				className={clsx(styles.tabBar, {
					[styles.hidden]: !showTabBar,
					[styles.showMenu]: openMenu,
				})}
			>
				<TabBar />
			</div>
			<main className={clsx(styles.container, {[styles.hidden]: !showTabBar})}>
				<div className={styles.main}>{children}</div>
			</main>
		</RequireAuth>
	);
}

export default BaseLayout;
