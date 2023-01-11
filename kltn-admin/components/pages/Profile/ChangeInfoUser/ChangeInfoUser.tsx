import {Cake, Call, Sms, User} from 'iconsax-react';
import Form, {Input} from '~/components/controls/Form';

import Button from '~/components/controls/Button';
import {PropsChangeInfoUser} from './interfaces';
import clsx from 'clsx';
import styles from './ChangeInfoUser.module.scss';
import {useRouter} from 'next/router';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import {toast} from 'react-toastify';
import userService from '~/api/user';
import {updateDataUser} from '~/redux/reducers/userSlice';
import {ImPencil} from 'react-icons/im';
import Image from 'next/image';
import Popup from '~/components/common/Popup';
import PopupChangeAvatar from '~/components/Popup/PopupChangeAvatar';

function ChangeInfoUser({}: PropsChangeInfoUser) {
	const router = useRouter();
	const dispatch = useDispatch();
	const {token} = useSelector((state: RootState) => state.auth);
	const {userData} = useSelector((state: RootState) => state.user);

	const [open, setOpen] = useState<boolean>(false);

	const handleClose = () => {
		const {_changeInfo, ...rest} = router.query;
		router.push({
			pathname: router.pathname,
			query: rest,
		});
	};

	// Lấy giới tính
	const [sex, setSex] = useState<Number>(Number(userData.sex));

	// Form data
	const [form, setForm] = useState<any>({
		name: userData.name,
		phone: userData.phone,
		email: userData.email,
		dateBirth: userData.dateBirth,
		monthBirth: userData.monthBirth,
		yearBirth: userData.yearBirth,
	});

	const handleSubmit = async () => {
		try {
			const res: any = await userService.changeUser({
				token: String(token),
				idUser: String(userData._id),
				name: form.name,
				email: form.email,
				phone: form.phone,
				dateBirth: form.dateBirth,
				monthBirth: form.monthBirth,
				yearBirth: form.yearBirth,
				sex: Number(sex),
			});

			if (res.status === 1) {
				toast.success(res.message || 'Thay đổi thông tin thành công');
				handleClose();
				dispatch(updateDataUser(res.data));
			} else if (res.status) {
				toast.warn(res.message || 'Thay đổi thông tin thất bại');
			}
		} catch (error) {
			console.log(error);
			toast.error('Có lỗi xảy ra!');
		}
	};

	return (
		<div className={clsx(styles.container)}>
			<div className={styles.header}>
				<h4 className={styles.title}>Sửa thông tin cá nhân</h4>
			</div>
			<div className={clsx(styles.avatar, 'effectShow')}>
				<div className={styles.box_change_avatar}>
					<Image
						className={styles.image}
						objectFit='cover'
						src={
							userData.avatar
								? userData.avatar
								: 'https://futbolita.com/wp-content/uploads/2008/11/avatar-1577909_960_720.png'
						}
						alt='avatar'
						layout='fill'
					/>
					<div className={styles.box_icon} onClick={() => setOpen(true)}>
						<ImPencil className={styles.icon} />
					</div>
				</div>
				<div className={styles.text}>
					<p>Upload image với dung lượng &lt; 15MB</p>
					<p>Định dạng hỗ trợ: JPG, JPEG, PNG</p>
				</div>
			</div>
			<Form form={form} setForm={setForm} onSubmit={() => {}}>
				<div className={clsx(styles.form, 'effectShow')}>
					<h3 className={styles.titleGroup}>Thông tin hồ sơ</h3>
					<div className={styles.col_2}>
						<div className={styles.inputElement}>
							<label className={styles.label}>
								Họ và tên <span style={{color: 'red'}}>*</span>
							</label>
							<Input
								rounded_8
								bgGrey
								name='name'
								icon={<User />}
								placeholder='Họ và tên'
								rounde
							/>
						</div>
						<div className={styles.inputElement}>
							<label className={styles.label}>
								Giới tính <span style={{color: 'red'}}>*</span>
							</label>
							<div className={styles.groupInputRadio}>
								<label className={styles.groupRadio}>
									<input
										type='radio'
										name='sex'
										value={1}
										checked={sex === 1}
										onChange={(e) => setSex(Number(e.target.value))}
									/>
									<p>Nam</p>
								</label>
								<label className={styles.groupRadio}>
									<input
										type='radio'
										name='sex'
										value={2}
										checked={sex === 2}
										onChange={(e) => setSex(Number(e.target.value))}
									/>
									<p>Nữ</p>
								</label>
								<label className={styles.groupRadio}>
									<input
										type='radio'
										name='sex'
										value={3}
										checked={sex === 3}
										onChange={() => setSex(3)}
									/>
									<p>Giới tính khác</p>
								</label>
							</div>
						</div>
					</div>

					<div className={styles.groupElements}>
						<div className={styles.col_2}>
							<div className={styles.inputElement}>
								<label className={styles.label}>
									Số điện thoại <span style={{color: 'red'}}>*</span>
								</label>
								<Input
									bgGrey
									icon={<Call />}
									placeholder='Số điện thoại'
									name='phone'
								/>
							</div>
							<div className={styles.inputElement}>
								<label className={styles.label}>Email</label>
								<Input bgGrey icon={<Sms />} placeholder='Email' name='email' />
							</div>
						</div>
					</div>
					<div className={styles.groupElements}>
						<div className={styles.col_3}>
							<div className={styles.inputElement}>
								<label className={styles.label}>
									Ngày sinh <span style={{color: 'red'}}>*</span>
								</label>
								<Input
									rounded_8
									bgGrey
									icon={<Cake />}
									placeholder='Ngày sinh (VD: 03)'
									type='number'
									rounde
									name='dateBirth'
								/>
							</div>
							<div className={styles.inputElement}>
								<label className={styles.label}>
									Tháng sinh <span style={{color: 'red'}}>*</span>
								</label>
								<Input
									rounded_8
									bgGrey
									icon={<Cake />}
									placeholder='Tháng sinh (VD: 01)'
									rounde
									type='number'
									name='monthBirth'
								/>
							</div>
							<div className={styles.inputElement}>
								<label className={styles.label}>
									Năm sinh <span style={{color: 'red'}}>*</span>
								</label>
								<Input
									rounded_8
									bgGrey
									type='number'
									icon={<Cake />}
									placeholder='Năm sinh (VD: 1994)'
									rounde
									name='yearBirth'
								/>
							</div>
						</div>
					</div>
				</div>
				<div className={styles.btn}>
					<Button primary2 p_8_24 rounded_6 onClick={handleClose}>
						Huỷ
					</Button>
					<Button primary4 p_8_24 rounded_6 onClick={handleSubmit}>
						Lưu lại
					</Button>
				</div>
			</Form>
			{/* Popup */}
			<Popup open={open} onClose={() => setOpen(false)}>
				<PopupChangeAvatar onClose={() => setOpen(false)} />
			</Popup>
		</div>
	);
}

export default ChangeInfoUser;
