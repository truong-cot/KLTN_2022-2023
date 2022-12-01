import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import React, {Fragment} from 'react';

import styles from './PopupLogin.module.scss';
import backgrounds from '~/constants/images/backgrounds';
import Input from '~/components/controls/Input';
import {FaUser} from 'react-icons/fa';
import {HiLockClosed} from 'react-icons/hi';
import Button from '~/components/controls/Button';
import {useRouter} from 'next/router';

function PopupLogin() {
	const router = useRouter();

	return (
		<Fragment>
			<Head>
				<title>Đăng nhập</title>
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
						mời bạn đăng nhập để trải nghiệm dịch vụ tốt hơn!!!
					</p>
					<div className={styles.main_input}>
						<div className={styles.input_name}>
							<Input
								// onChange={handleChange}
								label='Username :'
								type='text'
								name='acc'
								placeholder='User name, Email...'
								iconLeft={<FaUser />}
							/>
						</div>
						<div className={styles.input_name}>
							<Input
								// onChange={handleChange}
								label='Password :'
								type='password'
								name='password'
								placeholder='Password...'
								iconLeft={<HiLockClosed />}
							/>
						</div>
						<div className={styles.checkbox}>
							{/* <ButtonRemember /> */}
							<Link href='#' className={styles.forgot_pass}>
								Forgot Password?
							</Link>
						</div>
						<div className={styles.register}>
							<p>
								Bạn chưa có tài khoản, mời bạn{' '}
								<span
									onClick={() =>
										router.replace(
											{
												pathname: router.pathname,
												query: {...router.query, auth: 'resgiter'},
											},
											undefined,
											{shallow: true, scroll: false}
										)
									}
									className={styles.tetx}
								>
									Đăng kí
								</span>
							</p>
						</div>
						<Button
							// onClick={handleLogin}
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

export default PopupLogin;
