import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import React, {useEffect, useState} from 'react';
import LayoutGrid from '~/components/layout/LayoutGrid';

import styles from './Header.module.scss';
import backgrounds from '~/constants/images/backgrounds';
import Search from './components/Search';
import Button from '~/components/controls/Button';
import {BsCartCheck, BsHeart} from 'react-icons/bs';
import {IoGitCompareOutline} from 'react-icons/io5';
import {FaRegUser} from 'react-icons/fa';
import {useRouter} from 'next/router';
import Popup from '~/components/common/Popup';
import PopupLogin from '~/components/Popup/PopupLogin';
import PopupResgister from '~/components/Popup/PopupResgister';

function Header({isScroll}: any) {
	const isLogin = false;

	const [isShowHeader, setIsShowHeader] = useState<boolean>(false);

	const router = useRouter();
	const {auth} = router.query;

	const onClose = () => {
		const {auth, ...rest} = router.query;

		router.replace(
			{
				pathname: router.pathname,
				query: {
					...rest,
				},
			},
			undefined,
			{shallow: true, scroll: false}
		);
	};

	const onShow = (type: string) => {
		router.replace(
			{
				pathname: router.pathname,
				query: {
					...router.query,
					auth: type,
				},
			},
			undefined,
			{shallow: true, scroll: false}
		);
	};

	const listLink: Array<any> = [
		{
			text: 'Trang chủ',
			href: '/',
		},
		{
			text: 'Shop',
			href: '/shop?type=all&status=all',
		},
	];

	useEffect(() => {
		const handleEvent = () => {
			window.scrollY > 600 ? setIsShowHeader(true) : setIsShowHeader(false);
		};
		window.addEventListener('scroll', handleEvent);

		return () => {
			window.removeEventListener('scroll', handleEvent);
		};
	}, []);

	return (
		<div
			className={clsx(styles.wrapper, {
				[styles.headerActive]: isShowHeader,
				[styles.bg_header]: router.pathname != '/',
			})}
		>
			{/* <LayoutGrid> */}
			<div className={styles.container}>
				<div className={styles.left}>
					<div className={styles.logo}>
						<Link href='/'>
							<Image className={styles.image} src={backgrounds.logo} alt='anh logo' />
						</Link>
					</div>

					<div className={styles.list_link}>
						{listLink.map((item, index) => (
							<Link key={index} href={item.href} className={styles.item}>
								{item.text}
							</Link>
						))}
					</div>
				</div>

				<div className={styles.right}>
					<Search />

					{isLogin ? (
						<div className={styles.box_right}>
							<Link href='/' className={styles.icon_heart}>
								<BsHeart />
								<span className={styles.qlt}>3</span>
							</Link>
							<Link href='/' className={styles.icon_compare}>
								<IoGitCompareOutline />
								<span className={styles.qlt}>3</span>
							</Link>
							<div className={styles.icon_cart}>
								<BsCartCheck />
								<span className={styles.qlt}>3</span>
							</div>
							<div className={styles.icon_profile}>
								<FaRegUser />
							</div>
						</div>
					) : (
						<div className={styles.group_btn}>
							<Button rounded_8 p_8_24 primary4 onClick={() => onShow('login')}>
								Login
							</Button>
							<Button rounded_8 p_8_24 primary3 onClick={() => onShow('resgiter')}>
								Resgiter
							</Button>
						</div>
					)}
				</div>
			</div>

			{/* Pupup */}
			<Popup open={auth === 'login'} onClose={onClose}>
				<PopupLogin />
			</Popup>
			<Popup open={auth === 'resgiter'} onClose={onClose}>
				<PopupResgister />
			</Popup>
			{/* </LayoutGrid> */}
		</div>
	);
}

export default Header;
