import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import authService from '~/api/auth';
import Button from '~/components/controls/Button';
import Form, {Input} from '~/components/controls/Form';

import styles from './MainLogin.module.scss';
import {updateDataUser} from '~/redux/reducers/userSlice';
import {login} from '~/redux/reducers/authSlice';
import RequiredLogout from '~/components/protected/RequiredLogout';
import Link from 'next/link';
import LoadingData from '~/components/common/LoadingData';
import {useRouter} from 'next/router';
import {RootState} from '~/redux/store';

function MainLogin() {
	const dispatch = useDispatch();
	const router = useRouter();

	const {routerPrev} = useSelector((state: RootState) => state.interface);

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [form, setForm] = useState<any>({
		acc: '',
		password: '',
	});

	const handleSubmit = () => {
		//Call api login
		(async () => {
			setIsLoading(true);
			try {
				const res: any = await authService.login(form);
				const dataLogin = res.data.user;

				if (res.status === 1) {
					router.push(routerPrev);
					dispatch(updateDataUser(dataLogin));
					dispatch(login({token: dataLogin.token}));
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
			<LoadingData isLoading={isLoading}>
				<div className={styles.conatiner}>
					<div className={styles.main}>
						<p className={styles.title}>Chào mừng bạn đến với hệ thống MOLLA</p>
						<p className={styles.text}>Mời bạn đăng nhập để có trải nghiệm tốt hơn!</p>
						<Form form={form} setForm={setForm} onSubmit={handleSubmit}>
							<Input
								type='text'
								placeholder='Username'
								name='acc'
								label='Tài khoản đăng nhập'
							/>
							<Input
								type='password'
								placeholder='Password'
								name='password'
								label='Mật khẩu đăng nhập'
							/>
							<p className={styles.link}>
								Bạn chưa có tài khoản?{' '}
								<Link className={styles.href} href='/auth/register'>
									Đăng kí
								</Link>
							</p>
							<div className={styles.btn}>
								<Button primary4 p_8_24 rounded_6>
									Đăng nhập
								</Button>
							</div>
						</Form>
					</div>
				</div>
			</LoadingData>
		</RequiredLogout>
	);
}

export default MainLogin;
