import React, {Fragment, useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';

import styles from './Register.module.scss';
import Input from '~/components/controls/Input';
import {HiLockClosed, HiOutlineMail} from 'react-icons/hi';
import {FaUser} from 'react-icons/fa';
import Button from '~/components/controls/Button';
import {toast} from 'react-toastify';
import Head from 'next/head';
import {useRouter} from 'next/router';
import backgrounds from '~/constants/images/backgrounds';

interface TypeForm {
	username: string;
	email: string;
	fullname: string;
	password: string;
	resPassword: string;
}

interface TypeFormSubmit {
	username: string;
	email: string;
	name: string;
	password: string;
}

function Register() {
	const router = useRouter();
	const [loading, setLoading] = useState<boolean>(false);
	const [form, setForm] = useState<TypeForm>({
		username: '',
		email: '',
		fullname: '',
		password: '',
		resPassword: '',
	});

	const handleChange = (e: any) => {
		const {name, value} = e.target;
		setForm((prev: any) => ({...prev, [name]: value}));
	};

	const handleSubmit = () => {};

	return (
		<Fragment>
			<Head>
				<title>Đăng kí</title>
			</Head>
			{/* <LoadingScreen isLoading={loading} /> */}
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
						mời bạn đăng kí tài khoản để trải nghiệm dịch vụ!!!
					</p>
					<div className={styles.main_input}>
						<div className={styles.top}>
							<div className={styles.input_name}>
								<Input
									label='Username :'
									type='text'
									placeholder='Username...'
									name='username'
									iconLeft={<FaUser />}
									onChange={handleChange}
								/>
							</div>
							<div className={styles.input_name}>
								<Input
									label='Email :'
									type='text'
									placeholder='Email...'
									name='email'
									iconLeft={<HiOutlineMail />}
									onChange={handleChange}
								/>
							</div>
						</div>
						<div className={styles.input_name}>
							<Input
								label='Full name :'
								type='text'
								placeholder='Full name...'
								name='fullname'
								iconLeft={<FaUser />}
								onChange={handleChange}
							/>
						</div>
						<div className={styles.input_name}>
							<Input
								label='Password :'
								type='password'
								name='password'
								placeholder='Password...'
								iconLeft={<HiLockClosed />}
								onChange={handleChange}
							/>
						</div>
						<div className={styles.input_name}>
							<Input
								label='Confirm password :'
								type='password'
								name='resPassword'
								placeholder='Confirm password...'
								iconLeft={<HiLockClosed />}
								onChange={handleChange}
							/>
						</div>
						<div className={styles.register}>
							<p>
								Bạn đã có tài khoản, mời bạn{' '}
								<Link href='/auth/login' className={styles.tetx}>
									Đăng nhập
								</Link>
							</p>
						</div>
						<Button
							onClick={handleSubmit}
							className={styles.btn}
							bg_gray
							p_14_16
							rounded_8
							bold
							primary3
							btn_form
						>
							Register
						</Button>
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export default Register;
