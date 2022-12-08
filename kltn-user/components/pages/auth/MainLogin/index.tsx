import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {toast} from 'react-toastify';
import authService from '~/api/auth';
import Button from '~/components/controls/Button';
import Form, {Input} from '~/components/controls/Form';

import styles from './MainLogin.module.scss';
import {useRouter} from 'next/router';
import {updateDataUser} from '~/redux/reducers/userSlice';
import {login} from '~/redux/reducers/authSlice';
import RequiredLogout from '~/components/protected/RequiredLogout';

function MainLogin() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [form, setForm] = useState<any>({
		acc: '',
		password: '',
	});

	const dispatch = useDispatch();
	const router = useRouter();

	const handleSubmit = () => {
		//Call api login
		(async () => {
			setIsLoading(true);
			try {
				const res: any = await authService.login(form);
				const dataLogin = res.data.user;

				if (res.status === 1) {
					dispatch(updateDataUser(dataLogin));
					dispatch(login({token: dataLogin.token}));

					router.push('/');

					toast.success(res.message || 'Đăng nhập thành công!');
				} else {
					toast.warn(res.message || 'Đăng nhập thất bại');
				}
				setIsLoading(false);
			} catch (err) {
				setIsLoading(false);
				toast.error('Đã xảy ra lỗi');
			}
		})();
	};

	return (
		<RequiredLogout>
			<div className={styles.conatiner}>
				<div className={styles.main}>
					<p className={styles.title}>Chào mừng bạn đến với hệ thống quản trị MOLLA</p>
					<p className={styles.text}>Đăng nhập trang quản trị</p>
					<Form form={form} setForm={setForm} onSubmit={handleSubmit}>
						<Input type='text' placeholder='Username' name='acc' />
						<Input type='password' placeholder='Password' name='password' />
						<Button>Đăng nhập</Button>
					</Form>
				</div>
			</div>
		</RequiredLogout>
	);
}

export default MainLogin;
