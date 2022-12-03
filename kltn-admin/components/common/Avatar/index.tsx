import Image from 'next/image';
import {PropsAvatar} from './interface';

import styles from './Avatar.module.scss';
import clsx from 'clsx';
import {images} from '~/constants/images';

function Avatar(props: PropsAvatar) {
	return (
		<div className={clsx(styles.container)}>
			<div className={clsx(styles.avatar, props.className)}>
				<Image
					className={styles.image}
					src={images.placehokder}
					alt='avatar'
					layout='fill'
				/>
			</div>
			<div className={styles.info}>
				<p className={styles.name}>{props.name}</p>
				<p className={styles.email}>{props.email}</p>
			</div>
		</div>
	);
}

export default Avatar;
