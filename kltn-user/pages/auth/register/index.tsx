import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {toast} from 'react-toastify';
import Button from '~/components/controls/Button';
import Form, {Input} from '~/components/controls/Form';

import styles from './Register.module.scss';
import {useRouter} from 'next/router';
import {updateDataUser} from '~/redux/reducers/userSlice';
import RequiredLogout from '~/components/protected/RequiredLogout';
import authService from '~/api/auth';
import {login} from '~/redux/reducers/authSlice';

function Register() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [form, setForm] = useState<any>({
		acc: '',
		password: '',
	});

	const dispatch = useDispatch();
	const router = useRouter();

	const handleSubmit = () => {
		//Call api Register
		(async () => {
			setIsLoading(true);
			try {
				const res: any = await authService.login(form);
				const dataUser = res.data.user;

				if (res.status === 1) {
					dispatch(updateDataUser(dataUser));
					dispatch(login({token: dataUser.token}));

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
					<p className={styles.title}>Chào mừng bạn đến với trang web thời trang MOLLA</p>
					<p className={styles.text}>Đăng nhập vào hệ thống</p>
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

export default Register;
