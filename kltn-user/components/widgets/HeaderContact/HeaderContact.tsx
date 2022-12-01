import LayoutGrid from '~/components/layout/LayoutGrid';
import styles from './HeaderContact.module.scss';

function HeaderContact() {
	return (
		<div className={styles.container}>
			<LayoutGrid>
				<div className={styles.main}>
					<p>Hotline hỗ trợ: 092905847 | Trung tâm trợ giúp</p>
					<div className={styles.contact}>Trở thành đối tác của ASHION</div>
				</div>
			</LayoutGrid>
		</div>
	);
}

export default HeaderContact;
