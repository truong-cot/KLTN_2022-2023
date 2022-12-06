import {Fragment, useState} from 'react';

import {PropsHeader} from './interface';
import Avatar from '~/components/common/Avatar';
import styles from './Header.module.scss';
import clsx from 'clsx';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';

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
					<Avatar
						avatar={userData?.avatar}
						email={userData?.email}
						name={userData?.name}
					/>
				</div>
			</div>
		</Fragment>
	);
}

export default Header;
