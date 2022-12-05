import {useState} from 'react';
import useDebounce from '~/common/hooks/useDebounce';
import CheckDataEmpty from '~/components/common/CheckDataEmpty';
import DataTable from '~/components/common/DataTable';
import LoadingData from '~/components/common/LoadingData';
import Pagination from '~/components/controls/Pagination';
import Search from '~/components/controls/Search';
import styles from './TableAdmin.module.scss';

function TableAdmin() {
	const [isLoading, setIsloading] = useState<boolean>(false);
	const [keyword, setKeyword] = useState<string>('');
	const [totalItem, setTotalItem] = useState<number>(0);
	const [limit, setLimit] = useState<number>(10);
	const [page, setPage] = useState<number>(1);
	const debounceKeyword = useDebounce(keyword, 500);

	const [data, setData] = useState<any>([
		{
			id: 1,
			name: 'truong',
		},
		{
			id: 1,
			name: 'truong',
		},
	]);

	return (
		<div className={styles.container}>
			<Search
				placeholder='Tìm kiếm theo tên tài khoản , tên user'
				keyword={keyword}
				onSetKeyword={setKeyword}
			/>
			<div className={styles.main}>
				<p className={styles.count}>
					TẤT CẢ TÀI KHOẢN: <span>123</span>
				</p>
			</div>
			<LoadingData isLoading={isLoading}>
				<CheckDataEmpty isEmpty={data?.length <= 0}>
					<DataTable
						data={data}
						columns={[
							{
								title: 'ID giao dịch',
								template: (data: any) => <p>{data.id || 'Chưa cập nhật'}</p>,
							},
							{
								title: 'ID giao dịch',
								template: (data: any) => <p>{data.name || 'Chưa cập nhật'}</p>,
							},
						]}
					></DataTable>
				</CheckDataEmpty>
			</LoadingData>
			<Pagination
				pageCurrent={page}
				pageSize={limit}
				onSetPage={setPage}
				onSetPageSize={setLimit}
				totalItem={totalItem}
			/>
		</div>
	);
}

export default TableAdmin;
