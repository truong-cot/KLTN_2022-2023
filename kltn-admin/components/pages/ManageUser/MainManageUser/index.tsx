import React, {useState} from 'react';
import TabNavLink from '~/components/controls/TabNavLink';
import styles from './MainManageUser.module.scss';
import {useRouter} from 'next/router';
import TableUserAll from '../TableUserAll';
import TableAdmin from '../TableAdmin';
import TableUser from '../TableUser';

function MainManageUser() {
	const router = useRouter();

	const listTab: Array<any> = [
		{
			title: 'Tất cả tài khoản',
			query: null,
			pathname: '/manage-user',
		},
		{
			title: 'Tài khoản admin',
			query: 'admin',
			pathname: '/manage-user',
		},
		{
			title: 'Tài khoản người dùng',
			query: 'user',
			pathname: '/manage-user',
		},
	];

	const _type = router.query._type;

	return (
		<div className={styles.container}>
			<h4 className={styles.title}>Quản lý tài khoản</h4>
			<TabNavLink listHref={listTab} query='_type' />
			<div className={styles.main}>
				{!_type && <TableUserAll />}
				{_type === 'admin' && <TableAdmin />}
				{_type === 'user' && <TableUser />}
			</div>
		</div>
	);
}

export default MainManageUser;
