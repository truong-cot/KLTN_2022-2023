import {CgMenuRight, CgMenuLeft} from 'react-icons/cg';
import {AiOutlineHome} from 'react-icons/ai';
import {HiOutlineUserGroup} from 'react-icons/hi';

import TabItem from './ItemTab';
import {ItemTab, PropsTabBar} from './interface';
import styles from './TabBar.module.scss';
import {useDispatch, useSelector} from 'react-redux';
import {toogleTabBar} from '~/redux/reducers/interface';
import {RootState} from '~/redux/store';
import Logo from '~/components/common/Logo';

import {BsShop} from 'react-icons/bs';
import {MdAddchart} from 'react-icons/md';
import {TbListCheck} from 'react-icons/tb';
import {RiUserSettingsLine} from 'react-icons/ri';
import {BiCategoryAlt} from 'react-icons/bi';
import {TiShoppingCart} from 'react-icons/ti';

function TabBar(props: PropsTabBar) {
	const dispatch = useDispatch();

	const {showTabBar} = useSelector((state: RootState) => state.interface);

	const listNav: Array<ItemTab> = [
		{
			icon: <AiOutlineHome size='20' />,
			title: 'Trang chủ',
			href: '/',
		},
		{
			icon: <HiOutlineUserGroup size='20' />,
			title: 'Quản lý tài khoản',
			href: '/manage-user',
		},
		{
			icon: <BsShop size='20' />,
			title: 'Quản lý sản phẩm',
			href: '/manage-product',
			menu: [
				{
					icon: <MdAddchart size='20' />,
					title: 'Thêm sản phẩm',
					href: '/manage-product/add-product',
				},
				{
					icon: <TbListCheck size='20' />,
					title: 'Quản lý trạng thái sản phẩm',
					href: '/manage-product/list-product-status',
				},
				{
					icon: <BiCategoryAlt size='20' />,
					title: 'Quản lý loại sản phẩm',
					href: '/manage-product/list-product-category',
				},
			],
		},
		{
			icon: <TiShoppingCart size='20' />,
			title: 'Quản lý đơn hàng',
			href: '/manage-order',
		},
		{
			icon: <RiUserSettingsLine size='20' />,
			title: 'Thông tin tài khoản',
			href: '/profile',
		},
	];

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				{showTabBar && (
					<div className={styles.logo}>
						<Logo className={styles.size} />
					</div>
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
		</div>
	);
}

export default TabBar;
