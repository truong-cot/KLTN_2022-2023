import {convertCoin} from '~/common/func/convertCoin';
import Avatar from '~/components/common/Avatar';
import {Data} from '../../interface';
import styles from './ItemUser.module.scss';

function ItemUser({email, totalDeposit, userName}: Data) {
	return (
		<div className={styles.container}>
			<div className={styles.info}>
				<Avatar className={styles.avatar} />
				<div className={styles.text}>
					<h5 className={styles.user}>{userName[0]}</h5>
					<p className={styles.mail}>{email[0] || 'Chưa xác thực email'}</p>
				</div>
			</div>
			<div className={styles.coin}>${convertCoin(totalDeposit)}</div>
		</div>
	);
}

export default ItemUser;
