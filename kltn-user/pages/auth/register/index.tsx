import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import Button from '~/components/controls/Button';
import Form, {Input} from '~/components/controls/Form';

import styles from './Register.module.scss';
import {useRouter} from 'next/router';
import {updateDataUser} from '~/redux/reducers/userSlice';
import RequiredLogout from '~/components/protected/RequiredLogout';
import authService from '~/api/auth';
import {login} from '~/redux/reducers/authSlice';
import Link from 'next/link';
import LoadingData from '~/components/common/LoadingData';
import {RootState} from '~/redux/store';

function Register() {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const router = useRouter();

	const {routerPrev} = useSelector((state: RootState) => state.interface);

	const [form, setForm] = useState<any>({
		username: '',
		password: '',
		name: '',
		email: '',
	});

	const handleSubmit = () => {
		//Call api Register
		(async () => {
			setIsLoading(true);
			try {
				const res: any = await authService.register(form);
				const dataUser = res.data;

				if (res.status === 1) {
					router.push(routerPrev);
					dispatch(updateDataUser(dataUser));
					dispatch(login({token: dataUser.token}));
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
						<p className={styles.text}>
							Mời bạn đăng kí để có trải nghiệm về dịch vụ tốt hơn!
						</p>
						<Form form={form} setForm={setForm} onSubmit={handleSubmit}>
							<div className={styles.group}>
								<div>
									<Input
										type='text'
										placeholder='Username'
										name='username'
										label='Username'
									/>
								</div>
								<div>
									<Input
										type='text'
										placeholder='Name'
										name='name'
										label='Họ tên đầy đủ của bạn'
									/>
								</div>
							</div>
							<Input type='text' placeholder='Email' name='email' label='Email' />
							<Input
								type='password'
								placeholder='Password'
								name='password'
								label='Mật khẩu'
							/>
							<p className={styles.link}>
								Bạn đã có tài khoản?{' '}
								<Link className={styles.href} href='/auth/login'>
									Đăng nhập
								</Link>
							</p>
							<div className={styles.btn}>
								<Button primary4 p_8_24 rounded_6>
									Đăng kí
								</Button>
							</div>
						</Form>
					</div>
				</div>
			</LoadingData>
		</RequiredLogout>
	);
}

export default Register;
