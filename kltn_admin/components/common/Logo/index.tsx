import clsx from 'clsx';
import Image from 'next/image';
import icons from '~/constants/images/icons';
import styles from './Logo.module.scss';

function Logo({className}: any) {
	return (
		<div className={clsx(styles.container, className)}>
			<Image src={icons.logo} layout='fill' alt='logo net88' />
		</div>
	);
}

export default Logo;
