import React from 'react';
import RequireAuth from '~/components/protected/RequiredAuth';
import TabBar from '~/components/widgets/TabBar';
import LayoutGrid from '../LayoutGrid';
import {TypeProfileLayout} from './interface';

import styles from './ProfileLayout.module.scss';

function ProfileLayout({children}: TypeProfileLayout) {
	return (
		<RequireAuth>
			<div className={styles.container}>
				<LayoutGrid>
					<div className={styles.main}>
						<div className={styles.sidebar}>
							<TabBar />
						</div>
						<div className={styles.layoutMain}>
							<div className={styles.bg}>{children}</div>
						</div>
					</div>
				</LayoutGrid>
			</div>
		</RequireAuth>
	);
}

export default ProfileLayout;
