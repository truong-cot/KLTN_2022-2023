const md5 = require('md5');
import axios from 'axios';
import clsx from 'clsx';
import {useRouter} from 'next/router';
import {Fragment, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import Popup from '~/components/common/Popup';
import Button from '~/components/controls/Button';
import Form, {Input} from '~/components/controls/Form';
import {MENU_CODE} from '~/constants/enum/permission';
import {logout} from '~/redux/reducers/auth';
import {RootState} from '~/redux/store';
import authService from '~/services/authService';
import styles from './FormChangePass.module.scss';

function FormChangePass() {
	const dispatch = useDispatch();
	const router = useRouter();
	const {token} = useSelector((state: RootState) => state.auth);
	const [openLogout, setOpenLogout] = useState<boolean>(false);
	const [openForm, setOpenForm] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);

	const [form, setForm] = useState<any>({
		password: '',
		newPassword: '',
		rePassword: '',
	});

	const handleLogout = async () => {
		await axios.get('/api/logout');
		dispatch(logout());
	};
	const handleSubmit = () => {
		if (token) {
			(async () => {
				try {
					setLoading(true);
					const res: any = await authService.changePass(
						{
							token: token,
							password: md5(process.env.NEXT_PUBLIC_KEY_HASH + form.password),
							language: 'en',
							newPassword: md5(process.env.NEXT_PUBLIC_KEY_HASH + form.newPassword),
						},
						MENU_CODE.TC_1_0
					);

					if (res.errorCode === 0) {
						setLoading(false);
						toast.success('Thay đổi mật khẩu thành công!');
						setOpenForm(false);
						setForm({password: '', newPassword: '', rePassword: ''});
					} else {
						setLoading(false);
						toast.error(res.errorMessage);
					}
				} catch (error) {
					setLoading(false);
				}
			})();
		}
	};
	return (
		<Fragment>
			<Popup open={openLogout} onClose={() => setOpenLogout(false)}>
				<div className={clsx(styles.formLogout, 'effectZoom')}>
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
			<Form form={form} setForm={setForm} onSubmit={handleSubmit}>
				{openForm ? (
					<Fragment>
						<Input
							placeholder='Nhập mật khẩu hiện tại'
							label='Mật khẩu hiện tại'
							type='password'
							name='password'
							isRequired
						/>
						<Input
							placeholder='Nhập mật khẩu mới'
							label='Mật khẩu mới'
							type='password'
							name='newPassword'
							isRequired
						/>
						<Input
							placeholder='Nhập lại mật khẩu'
							label='Xác nhận mật khẩu'
							type='password'
							name='rePassword'
							isRequired
							valueConfirm={form.newPassword}
						/>
					</Fragment>
				) : null}
				<div className={styles.groupBtn}>
					{openForm ? (
						<Button className={styles.btnChange}>Thay đổi mật khẩu</Button>
					) : (
						<div className={styles.btnOpen} onClick={() => setOpenForm(true)}>
							Thay đổi mật khẩu
						</div>
					)}
					<div className={styles.btnLogout} onClick={() => setOpenLogout(true)}>
						Đăng xuất
					</div>
				</div>
			</Form>
		</Fragment>
	);
}

export default FormChangePass;
