import clsx from 'clsx';
import Link from 'next/link';
import React, {Fragment, useEffect, useState} from 'react';
import {AiFillHome} from 'react-icons/ai';
import RequireAuth from '~/components/protected/RequiredAuth';
import Footer from '~/components/widgets/Footer';
import Header from '~/components/widgets/Header';
import TabBar from '~/components/widgets/TabBar';
import LayoutGrid from '../LayoutGrid';
import {TypeProfileLayout} from './interface';

import styles from './ProfileLayout.module.scss';

function ProfileLayout({children}: TypeProfileLayout) {
	return (
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
	);
}

export default ProfileLayout;
