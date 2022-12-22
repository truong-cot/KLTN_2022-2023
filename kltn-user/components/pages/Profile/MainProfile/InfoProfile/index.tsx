import React from 'react';
import styles from './InfoProfile.module.scss';
import Button from '~/components/controls/Button';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import clsx from 'clsx';
import {RiCalendarLine, RiPhoneLine} from 'react-icons/ri';
import {useRouter} from 'next/router';
import Avatar from '~/components/common/Avatar';
import InfoText from '../../InfoText';

function InfoProfile() {
	const router = useRouter();

	const {userData} = useSelector((state: RootState) => state.user);

	return (
		<div className={clsx(styles.container)}>
			<div className={styles.header}>
				<h4 className={styles.title}>Thông tin cá nhân</h4>
				<div className={styles.btn}>
					<Button
						primary4
						bold
						rounded_6
						onClick={() =>
							router.push({
								pathname: router.pathname,
								query: {
									...router.query,
									_changeInfo: true,
								},
							})
						}
					>
						Chỉnh sửa
					</Button>
				</div>
			</div>
			<div className={clsx(styles.headerAvatar, 'effectShow')}>
				<div className={styles.avatarGroup}>
					<Avatar
						className={styles.avatar}
						src={
							userData.avatar
								? userData.avatar
								: 'https://futbolita.com/wp-content/uploads/2008/11/avatar-1577909_960_720.png'
						}
					/>
				</div>
				<div className={styles.infoGroup}>
					<p className={styles.username}>
						{userData.name}
						<span
							className={styles.tag}
							style={{
								backgroundColor: 'rgba(6, 194, 112, 0.1)',
								color: '#05A660',
							}}
						>
							Chủ tài khoản
						</span>
					</p>
					<p className={styles.tagItem}>
						<span>
							<RiPhoneLine />
						</span>
						{userData.phone ? userData.phone : 'Chưa cập nhật'}
					</p>
					<p className={styles.tagItem}>
						<span>
							<RiCalendarLine />
						</span>
						{userData.dateBirth && userData.monthBirth && userData.yearBirth
							? `${userData.dateBirth}/${userData.monthBirth}/${userData.yearBirth}`
							: 'Chưa cập nhật'}
					</p>
				</div>
			</div>
			<div className={clsx(styles.main, 'effectShow')}>
				<h3 className={styles.titleGroup}>Thông tin thêm</h3>
				<InfoText title='Tên đầy đủ' content={userData.name} />
				<InfoText title='Tên đăng nhập' content={userData.username} />
				<InfoText title='Email' content={userData.email} />
				<InfoText
					title='Số điện thoại'
					content={userData.phone ? userData.phone : '----'}
				/>
				<InfoText
					title='Giới tính'
					content={
						userData.sex
							? userData.sex === 1
								? 'Nam'
								: userData.sex === 2
								? 'Nữ'
								: 'Khác'
							: '----'
					}
				/>
			</div>
		</div>
	);
}

export default InfoProfile;
