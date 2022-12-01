import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import {FaFacebook} from 'react-icons/fa';

import styles from './Footer.module.scss';
import Button from '~/components/controls/Button';
import {BsInstagram, BsPinterest, BsSuitHeartFill, BsTwitter, BsYoutube} from 'react-icons/bs';
import backgrounds from '~/constants/images/backgrounds';

function Footer() {
	return (
		<div className={styles.container}>
			<div className={styles.top}>
				<div className={styles.box__1}>
					<div className={styles.logo}>
						<Image
							className={styles.image}
							src={backgrounds.logo_black}
							alt='anh logo'
							layout='fill'
						/>
					</div>
					<p className={styles.text}>
						Chào mừng bạn đã ghé thăm webstie bán quần áo Molla, cảm ơn bạn đã sử dụng
						dịch vụ của Molla, chúc bạn có một trải nghiệm tốt với Molla và mong bạn
						luôn luôn ủng hộ Molla
					</p>
					<div className={styles.list}>
						<div className={styles.item}>
							<Link href='/' className={styles.link_logo}>
								<Image src={backgrounds.logo} alt='anh logo' layout='fill' />
							</Link>
						</div>
						<div className={styles.item}>
							<Link href='/' className={styles.link_logo}>
								<Image src={backgrounds.logo} alt='anh logo' layout='fill' />
							</Link>
						</div>
						<div className={styles.item}>
							<Link href='/' className={styles.link_logo}>
								<Image src={backgrounds.logo} alt='anh logo' layout='fill' />
							</Link>
						</div>
						<div className={styles.item}>
							<Link href='/' className={styles.link_logo}>
								<Image src={backgrounds.logo} alt='anh logo' layout='fill' />
							</Link>
						</div>
						<div className={styles.item}>
							<Link href='/' className={styles.link_logo}>
								<Image src={backgrounds.logo} alt='anh logo' layout='fill' />
							</Link>
						</div>
					</div>
				</div>
				<div className={styles.box__2}>
					<h3 className={styles.title}>QUICK LINKS</h3>
					<div className={styles.list_link}>
						<Link href='/' className={styles.item_link}>
							About
						</Link>
						<Link href='/blogs' className={styles.item_link}>
							Blogs
						</Link>
						<Link href='/' className={styles.item_link}>
							Contact
						</Link>
						<Link href='/' className={styles.item_link}>
							FAQ
						</Link>
					</div>
				</div>
				<div className={styles.box__3}>
					<h3 className={styles.title}>ACCOUNT</h3>
					<div className={styles.list_link}>
						<Link href='/' className={styles.item_link}>
							My Account
						</Link>
						<Link href='/' className={styles.item_link}>
							Orders Tracking
						</Link>
						<Link href='/' className={styles.item_link}>
							Checkout
						</Link>
						<Link href='/' className={styles.item_link}>
							Wishlis
						</Link>
					</div>
				</div>
				<div className={styles.box__4}>
					<h3 className={styles.title}>NEWSLETTER</h3>
					<form action='#' className={styles.form}>
						<input className={styles.input} type='text' placeholder='Email' />
						<Button className={styles.button}>Subscribe</Button>
						<div className={styles.list}>
							<div className={styles.item}>
								<Link href='/' className={styles.link_logo}>
									<FaFacebook />
								</Link>
							</div>
							<div className={styles.item}>
								<Link href='/' className={styles.link_logo}>
									<BsTwitter />
								</Link>
							</div>
							<div className={styles.item}>
								<Link href='/' className={styles.link_logo}>
									<BsYoutube />
								</Link>
							</div>
							<div className={styles.item}>
								<Link href='/' className={styles.link_logo}>
									<BsInstagram />
								</Link>
							</div>
							<div className={styles.item}>
								<Link href='/' className={styles.link_logo}>
									<BsPinterest />
								</Link>
							</div>
						</div>
					</form>
				</div>
			</div>

			<div className={styles.bottom}>
				<p className={styles.text}>
					Bản quyền thuộc về Đặng Bá Trường, This template is made with{' '}
					<span>
						<BsSuitHeartFill />
					</span>{' '}
					Đặng Bá Trường
				</p>
			</div>
		</div>
	);
}

export default Footer;
