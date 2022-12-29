import {useRouter} from 'next/router';
import styles from './MainProductAmount.module.scss';
import TabNavLink from '~/components/controls/TabNavLink';
import TableProductAmount from './TableProductAmount';

function MainProductAmount() {
	const router = useRouter();
	const _type = router.query._type;

	const listTab: Array<any> = [
		{
			title: 'Tất cả sản phẩm',
			query: null,
			pathname: '/manage-product/product-amount',
		},
	];

	return (
		<div className={styles.container}>
			<h4 className={styles.title}>Quản lý số lượng của tất cả các loại sản phẩm</h4>
			<TabNavLink listHref={listTab} query='_type' />
			<div className={styles.main}>{!_type && <TableProductAmount />}</div>
		</div>
	);
}

export default MainProductAmount;
