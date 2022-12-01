import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import Button from '~/components/controls/Button';
import styles from './BannerItem.module.scss';

function BannerItem({background, topSuggest, title, bottomSuggest, btnContent}: any) {
	const styleBackground = {
		background: `url(${background})`,
		backgroundRepeat: 'no-repeat',
		backgroundPosition: '50%',
		backgroundSize: 'cover',
	};
	return (
		<div className={styles.wrapper} style={styleBackground}>
			<div className={styles.inner}>
				<span className={styles.top_suggest}>{topSuggest}</span>
				<h1 className={styles.tiltle}> {title}</h1>
				<span className={styles.bottom_suggest}>{bottomSuggest}</span>
				<Button outline_3>{btnContent}</Button>
			</div>
		</div>
	);
}

export default BannerItem;
