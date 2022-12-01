import {Fragment, useEffect, useState} from 'react';

// import Footer from "~/components/widgets/Footer";
// import Header from "~/components/widgets/Header";
// import HeaderContact from "~/components/widgets/HeaderContact";
import {PropsBaseLayout} from './interfaces';
import clsx from 'clsx';
import styles from './BaseLayout.module.scss';
import Footer from '~/components/widgets/Footer';
import HeaderContact from '~/components/widgets/HeaderContact';
import Header from '~/components/widgets/Header';

function BaseLayout({children, hiddenSidebar, hiddenHeader}: PropsBaseLayout) {
	const [active, setActive] = useState<boolean>(false);
	const [scroll, setSroll] = useState<boolean>(false);

	useEffect(() => {
		let scrollY = 0;
		const handleScroll = (event: any) => {
			if (window.scrollY > 0) {
				setActive(true);
			} else {
				setActive(false);
			}

			if (window.scrollY >= scrollY && window.scrollY > 80) {
				setSroll(true);
			} else {
				setSroll(false);
			}
			scrollY = window.scrollY;
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<div className={styles.app}>
			<div
				className={clsx(styles.header, {
					[styles.active]: active,
					[styles.scroll]: scroll,
				})}
			>
				{/* <HeaderContact /> */}
				<Header isScroll={scroll} />
			</div>
			<main>
				<div className={clsx(styles.main)}>{children}</div>
			</main>
			<div className={styles.footer}>
				<Footer />
			</div>
		</div>
	);
}

export default BaseLayout;
