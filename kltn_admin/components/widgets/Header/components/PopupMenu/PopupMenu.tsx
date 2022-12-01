import clsx from 'clsx';
import {RiCloseFill, RiInformationFill} from 'react-icons/ri';
import {useSelector} from 'react-redux';
import Avatar from '~/components/common/Avatar';
import {RootState} from '~/redux/store';
import FormChangePass from '../FormChangePass';
import styles from './PopupMenu.module.scss';

function PopupMenu({onClose}: any) {
	const {userData} = useSelector((state: RootState) => state.user);
	return (
		<div className={clsx(styles.container, 'effectZoom')}>
			<div className={styles.header}>
				<div className={styles.title}>
					<div className={styles.icon}>
						<RiInformationFill />
					</div>
					<p>Thông tin</p>
				</div>
				<div className={styles.btnClose} onClick={onClose}>
					<RiCloseFill />
				</div>
			</div>
			<div className={styles.infoUser}>
				<div className={styles.avatar}>
					<Avatar />
				</div>
				<div className={styles.info}>
					<p className={styles.email}>Quản lý net88</p>
					<p className={styles.email}>Xin chào: {userData.username}</p>
				</div>
			</div>
			<div className={styles.form}>
				<FormChangePass />
			</div>
		</div>
	);
}

export default PopupMenu;
