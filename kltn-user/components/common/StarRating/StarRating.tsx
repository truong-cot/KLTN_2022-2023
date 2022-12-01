import {BsStarFill} from 'react-icons/bs';
import {memo} from 'react';
import styles from './StarRating.module.scss';

function StarRating({star}: any) {
	const showStar = [];

	if (star) {
		for (let i = 0; i < 5; i++) {
			if (i < Math.round(star)) {
				showStar.push(
					<span key={i} className={styles.star}>
						<BsStarFill />
					</span>
				);
			} else {
				showStar.push(
					<span key={i} className={styles.notStar}>
						<BsStarFill />
					</span>
				);
			}
		}
	}

	return <span className={styles.container}>{showStar}</span>;
}

export default memo(StarRating);
