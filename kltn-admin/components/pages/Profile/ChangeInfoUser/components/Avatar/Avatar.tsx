import {AiFillCamera} from 'react-icons/ai';
import Image from 'next/image';
import styles from './Avatar.module.scss';

function Avatar({src, name, onChange}: any) {
	return (
		<div className={styles.container}>
			{src ? <Image className={styles.avatar} src={src} layout='fill' alt='avatar' /> : null}
			<label className={styles.input}>
				<AiFillCamera />
				<input hidden type='file' name={name} onChange={onChange} />
			</label>
		</div>
	);
}

export default Avatar;
