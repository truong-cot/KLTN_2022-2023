import Link from 'next/link';
import {CgMenuRight, CgMenuLeft} from 'react-icons/cg';
import {
	Home2,
	Note1,
	Note,
	People,
	CardPos,
	EmptyWalletTick,
	DiscountCircle,
	EmptyWalletTime,
	Award,
	UserTick,
	MoneyChange,
	EmptyWalletAdd,
	ReceiptAdd,
	ReceiptMinus,
	MoneyTick,
	ConvertCard,
	NotificationBing,
} from 'iconsax-react';
import clsx from 'clsx';

import TabItem from './components/ItemTab';
import {ItemTab, PropsTabBar} from './interface';
import styles from './TabBar.module.scss';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import Logo from '~/components/common/Logo';
import {toogleTabBar} from '~/redux/reducers/interface';

function TabBar(props: PropsTabBar) {
	const dispatch = useDispatch();

	const {showTabBar} = useSelector((state: RootState) => state.interface);

	const listNav: Array<ItemTab> = [
		{
			icon: <Home2 size='24' />,
			iconActive: <Home2 size='24' variant='Bold' />,
			title: 'Trang chủ',
			href: '/',
		},
		// {
		// 	icon: <Note size='24' />,
		// 	iconActive: <Note1 size='24' variant='Bold' />,
		// 	title: 'Báo cáo',
		// 	href: '/report',
		// },
		// {
		// 	icon: <UserTick size='24' />,
		// 	iconActive: <UserTick size='24' variant='Bold' />,
		// 	title: 'Quản lý đại lý',
		// 	href: '/dealers',
		// },
		// {
		// 	icon: <MoneyTick size='24' />,
		// 	iconActive: <MoneyTick size='24' variant='Bold' />,
		// 	title: 'Duyệt thưởng đại lý',
		// 	href: '/browse-dealer-bonus',
		// },
		// {
		// 	icon: <People size='24' />,
		// 	iconActive: <People size='24' variant='Bold' />,
		// 	title: 'Quản lý thành viên',
		// 	href: '/member-management',
		// },
		// {
		// 	icon: <CardPos size='24' />,
		// 	iconActive: <CardPos size='24' variant='Bold' />,
		// 	title: 'Quản lý tài chính',
		// 	href: '/financial-management',
		// 	menu: [
		// 		{
		// 			icon: <MoneyChange size='24' />,
		// 			iconActive: <MoneyChange size='24' variant='Bold' />,
		// 			title: 'Giao dịch chung',
		// 			href: '/financial-management/general-transaction',
		// 			code: MENU_CODE.GDC_6_0_1,
		// 		},
		// 		{
		// 			icon: <EmptyWalletAdd size='24' />,
		// 			iconActive: <EmptyWalletAdd size='24' variant='Bold' />,
		// 			title: 'Nạp / rút tiền',
		// 			href: '/financial-management/deposit-withdrawal',
		// 			code: MENU_CODE.NRT_6_0_2,
		// 		},
		// 		{
		// 			icon: <ConvertCard size='24' />,
		// 			iconActive: <ConvertCard size='24' variant='Bold' />,
		// 			title: 'Chuyển tiền qua ví',
		// 			href: '/financial-management/transfer-money-wallet',
		// 			code: MENU_CODE.CTQV_6_0_3,
		// 		},
		// 		{
		// 			icon: <ReceiptAdd size='24' />,
		// 			iconActive: <ReceiptAdd size='24' variant='Bold' />,
		// 			title: 'Quản lý cược',
		// 			href: '/financial-management/manage-bets',
		// 			code: MENU_CODE.QLC_6_0_4,
		// 		},
		// 		{
		// 			icon: <ReceiptMinus size='24' />,
		// 			iconActive: <ReceiptMinus size='24' variant='Bold' />,
		// 			title: 'Chi',
		// 			href: '/financial-management/spend',
		// 			code: MENU_CODE.C_6_0_5,
		// 		},
		// 	],
		// },
		// {
		// 	icon: <EmptyWalletTime size='24' />,
		// 	iconActive: <EmptyWalletTime size='24' variant='Bold' />,
		// 	title: 'Gói thưởng',
		// 	href: '/bonus-package',
		// },
		// {
		// 	icon: <DiscountCircle size='24' />,
		// 	iconActive: <DiscountCircle size='24' variant='Bold' />,
		// 	title: 'Báo cáo lợi nhuận',
		// 	href: '/profit-report',
		// },
		// {
		// 	icon: <EmptyWalletTick size='24' />,
		// 	iconActive: <EmptyWalletTick size='24' variant='Bold' />,
		// 	title: 'Duyệt lệnh rút tiền',
		// 	href: '/withdrawal-orders',
		// },
		// {
		// 	icon: <NotificationBing size='24' />,
		// 	iconActive: <NotificationBing size='24' variant='Bold' />,
		// 	title: 'Quản lý thông báo',
		// 	href: '/notification',
		// },
		// {
		// 	icon: <Award size='24' />,
		// 	iconActive: <Award size='24' variant='Bold' />,
		// 	title: 'Sự kiện',
		// 	href: '/event',
		// },
	];

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				{showTabBar && (
					<div className={styles.logo}>{/* <Logo className={styles.size} /> */}</div>
				)}
				<div className={styles.toogleTab} onClick={() => dispatch(toogleTabBar())}>
					{showTabBar ? <CgMenuRight /> : <CgMenuLeft />}
				</div>
			</div>
			<div className={styles.nav}>
				{listNav.map((item, i) => (
					<TabItem
						key={i}
						item={item}
						index={i}
						showTabBar={showTabBar}
						onShowTabBar={() => dispatch(toogleTabBar())}
					/>
				))}
			</div>
			{/* <div className={styles.logout}>
				<div onClick={() => setOpenLogout(true)} className={clsx(styles.itemNav)}>
					<div className={styles.icon}>
						<Logout size='24' />
					</div>
					{showTabBar && <p className={styles.text}>Đăng xuất</p>}
				</div>

				<Popup open={openLogout} onClose={() => setOpenLogout(false)}>
					<div className={styles.formLogout}>
						<p className={styles.titlePopup}>Bạn muốn đăng xuất?</p>
						<div className={styles.groupButton}>
							<Button bg_black rounded_8 bold onClick={() => setOpenLogout(false)}>
								Hủy
							</Button>
							<Button onClick={handleLogout} primary1RG rounded_8 bold>
								Đăng xuất
							</Button>
						</div>
					</div>
				</Popup>
			</div> */}
		</div>
	);
}

export default TabBar;
