import Head from 'next/head';
import {useRouter} from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import React, {Fragment, useState} from 'react';
import {FaUser} from 'react-icons/fa';
import {HiLockClosed} from 'react-icons/hi';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './Login.module.scss';
import Button from '~/components/controls/Button';
import backgrounds from '~/constants/images/backgrounds';
import Input from '~/components/controls/Input';
interface TypeLogin {
	acc: string;
	password: string;
}

function Login() {
	const [loading, setLoading] = useState<boolean>(false);
	const [formData, setFormData] = useState<TypeLogin>({
		acc: '',
		password: '',
	});

	const handleChange = (e: any) => {
		const {name, value} = e.target;
		setFormData((prev: any) => ({...prev, [name]: value}));
	};

	const handleLogin = () => {};

	return (
		<Fragment>
			<Head>
				<title>Đăng nhập</title>
			</Head>
			<div className={styles.container}>
				<div className={styles.main}>
					<div className={styles.logo}>
						<Link href='/' className={styles.link_logo}>
							<Image
								className={styles.image}
								src={backgrounds.logo_black}
								alt='anh logo'
								layout='fill'
							/>
						</Link>
					</div>
					<p className={styles.text}>
						Chào mừng bạn đến với shop ASHION, cảm ơn bạn đã sử dụng dịch vụ của ASHION,
						mời bạn đăng nhập để trải nghiệm dịch vụ tốt hơn!!!
					</p>
					<div className={styles.main_input}>
						<div className={styles.input_name}>
							<Input
								onChange={handleChange}
								label='Username :'
								type='text'
								name='acc'
								placeholder='User name, Email...'
								iconLeft={<FaUser />}
							/>
						</div>
						<div className={styles.input_name}>
							<Input
								onChange={handleChange}
								label='Password :'
								type='password'
								name='password'
								placeholder='Password...'
								iconLeft={<HiLockClosed />}
							/>
						</div>
						<div className={styles.checkbox}>
							<Link href='#' className={styles.forgot_pass}>
								Forgot Password?
							</Link>
						</div>
						<div className={styles.register}>
							<p>
								Bạn chưa có tài khoản, mời bạn{' '}
								<Link href='/auth/register' className={styles.tetx}>
									Đăng kí
								</Link>
							</p>
						</div>
						<Button
							onClick={handleLogin}
							className={styles.btn}
							bg_gray
							p_14_16
							rounded_8
							bold
							primary3
							btn_form
						>
							Login
						</Button>
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export default Login;
