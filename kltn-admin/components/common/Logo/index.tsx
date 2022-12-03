import clsx from 'clsx';
import Image from 'next/image';
import {images} from '~/constants/images';
import styles from './Logo.module.scss';

function Logo({className}: any) {
	return (
		<div className={clsx(styles.container, className)}>
			<Image src={images.logo} layout='fill' alt='logo' />
		</div>
	);
}

export default Logo;
