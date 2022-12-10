import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import React, {useEffect, useState} from 'react';
import HeadlessTippy from '@tippyjs/react/headless';

import styles from './Header.module.scss';
import backgrounds from '~/constants/images/backgrounds';
import Search from './components/Search';
import Button from '~/components/controls/Button';
import {BsCartCheck, BsHeart} from 'react-icons/bs';
import {IoGitCompareOutline} from 'react-icons/io5';
import {FaRegUser} from 'react-icons/fa';
import {useRouter} from 'next/router';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import BoxProfile from './components/profile';

function Header({isScroll}: any) {
	const [isShowHeader, setIsShowHeader] = useState<boolean>(false);

	const router = useRouter();

	const {isLogged} = useSelector((state: RootState) => state.auth);

	const [show, setShow] = useState<boolean>(false);

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

					{isLogged ? (
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
							<HeadlessTippy
								interactive
								visible={show}
								placement='bottom-end'
								render={(attrs: any) => <BoxProfile />}
								onClickOutside={() => setShow(false)}
							>
								<div className={styles.icon_profile} onClick={() => setShow(!show)}>
									<FaRegUser />
								</div>
							</HeadlessTippy>
						</div>
					) : (
						<div className={styles.group_btn}>
							<Button rounded_8 p_8_24 primary4 href={'/auth/login'}>
								Login
							</Button>
							<Button rounded_8 p_8_24 primary3 href={'/auth/register'}>
								Resgiter
							</Button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default Header;
