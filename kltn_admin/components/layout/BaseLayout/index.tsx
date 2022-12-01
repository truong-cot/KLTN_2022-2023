import {useSelector} from 'react-redux';
import clsx from 'clsx';
import {useRouter} from 'next/router';
import {Fragment, useEffect, useState} from 'react';

import {PropsBaseLayout} from './interfaces';
import Header from '~/components/widgets/Header';
import TabBar from '~/components/widgets/TabBar';
import styles from './BaseLayout.module.scss';
import {RootState} from '~/redux/store';

function BaseLayout({children, hiddenHeader, title}: PropsBaseLayout) {
	const router = useRouter();
	const [openMenu, setOpenMenu] = useState<boolean>(false);
	const {showTabBar} = useSelector((state: RootState) => state.interface);

	useEffect(() => {
		setOpenMenu(false);
	}, [router]);

	return (
		<Fragment>
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
		</Fragment>
	);
}

export default BaseLayout;
