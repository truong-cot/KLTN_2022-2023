import {Fragment, useState} from 'react';

import {PropsHeader} from './interface';
// import Avatar from '~/components/common/Avatar';
import {RootState} from '~/redux/store';
import {useSelector} from 'react-redux';
import PopupMenu from './components/PopupMenu';
import styles from './Header.module.scss';
import {RiCloseFill, RiMenuFill} from 'react-icons/ri';
import clsx from 'clsx';
// import Popup from '~/components/common/Popup';

function Header(props: PropsHeader) {
	const [open, setOpen] = useState<boolean>(false);
	const {userData} = useSelector((state: RootState) => state.user);

	return (
		<Fragment>
			<div className={styles.container}>
				<div className={styles.left}>
					{props?.toggleMenu && (
						<div className={styles.menu} onClick={props.toggleMenu}>
							<div
								className={clsx(styles.menuIcon, {[styles.open]: props.openMenu})}
							></div>
						</div>
					)}
					<p className={styles.title}>{props.title}</p>
				</div>
				<div className={styles.right} onClick={() => setOpen(true)}>
					{/* <Avatar email={userData?.username} /> */}
				</div>
			</div>
			{/* <Popup open={open} onClose={() => setOpen(false)}>
				<PopupMenu onClose={() => setOpen(false)} />
			</Popup> */}
		</Fragment>
	);
}

export default Header;
