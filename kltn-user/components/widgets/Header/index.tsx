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
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import BoxProfile from './components/BoxProfile';
import BoxCart from './components/BoxCart';
import cartService from '~/api/cart';
import {TypeCart} from './interfaces';
import {toast} from 'react-toastify';
import {updateCart} from '~/redux/reducers/cartSlice';

function Header({isScroll}: any) {
	const router = useRouter();

	const dispatch = useDispatch();
	const {carts} = useSelector((state: RootState) => state.cart);
	const {token} = useSelector((state: RootState) => state.auth);
	const {isLogged} = useSelector((state: RootState) => state.auth);
	const {userData} = useSelector((state: RootState) => state.user);

	const [show, setShow] = useState<boolean>(false);
	const [showCart, setShowCart] = useState<boolean>(false);
	const [isShowHeader, setIsShowHeader] = useState<boolean>(false);

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

	useEffect(() => {
		if (isLogged) {
			// Lấy ra giỏ hàng
			(async () => {
				const res: any = await cartService.getCart({
					token: String(token),
					idUser: String(userData._id),
				});

				if (res.status === 1) {
					// set carts to rudux
					dispatch(updateCart(res.data));
				} else if (res.status === 0) {
					toast.warn(res.message || 'Lấy giỏ hàng không thành công!');
				}
			})();
		}
	}, [token, userData, router]);

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
							{/* <Link href='/' className={styles.icon_heart}>
								<BsHeart />
								<span className={styles.qlt}>3</span>
							</Link>
							<Link href='/' className={styles.icon_compare}>
								<IoGitCompareOutline />
								<span className={styles.qlt}>3</span>
							</Link> */}
							<HeadlessTippy
								interactive
								visible={showCart}
								placement='bottom-end'
								render={(attrs: any) => (
									<BoxCart carts={carts} onClose={() => setShowCart(false)} />
								)}
								onClickOutside={() => setShowCart(false)}
							>
								<div
									className={styles.icon_cart}
									onClick={() => setShowCart(!showCart)}
								>
									<BsCartCheck />
									<span className={styles.qlt}>{carts?.length}</span>
								</div>
							</HeadlessTippy>
							<HeadlessTippy
								interactive
								visible={show}
								placement='bottom-end'
								render={(attrs: any) => (
									<BoxProfile closeBox={() => setShow(false)} />
								)}
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
