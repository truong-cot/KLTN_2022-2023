import clsx from 'clsx';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import CheckDataEmpty from '~/components/common/CheckDataEmpty';
import backgrounds from '~/constants/images/backgrounds';
import {RootState} from '~/redux/store';
import CMSDepositWithdrawService from '~/services/CMSDepositWithdraw';
import ItemUser from './components/ItemUser';
import {Data} from './interface';
import styles from './TableRight.module.scss';

function TableRight() {
	const {token} = useSelector((state: RootState) => state.auth);
	const [data, setData] = useState<Array<Data>>([]);

	useEffect(() => {
		if (token) {
			(async () => {
				try {
					const res: any = await CMSDepositWithdrawService.getTop10Deposit({
						language: 'vi',
						token,
						limit: 10,
						page: 1,
					});

					if (res.errorCode === 0) {
						setData(res.data.top);
					}
				} catch (err) {}
			})();
		}
	}, [token]);

	return (
		<div className={clsx('table-color', styles.container)}>
			<div className={styles.head}>
				<h2>Top 10 nạp nhiều</h2>
			</div>
			<CheckDataEmpty
				isEmpty={data.length <= 0}
				image={backgrounds.empty43}
				msg='Hiện tại chưa có dữ liệu liên quan'
			>
				<div className={styles.table}>
					{data.map((item: Data, index: number) => (
						<ItemUser key={index} {...item} />
					))}
				</div>
			</CheckDataEmpty>
		</div>
	);
}

export default TableRight;
