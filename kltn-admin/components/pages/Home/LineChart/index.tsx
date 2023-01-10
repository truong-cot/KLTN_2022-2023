import React, {Fragment, useEffect, useState} from 'react';
import Chart from 'chart.js/auto';
import {Line} from 'react-chartjs-2';

import {CategoryScale} from 'chart.js';
import styles from '~/styles/Home.module.scss';
import revenueService from '~/api/revenue';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import {toast} from 'react-toastify';
import LoadingData from '~/components/common/LoadingData';
import {TypeLineChart} from './interfaces';

function LineChart({year}: TypeLineChart) {
	Chart.register(CategoryScale);

	const [data, setData] = useState<Array<Number>>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const {token} = useSelector((state: RootState) => state.auth);

	const labels = [
		'Tháng 1',
		'Tháng 2',
		'Tháng 3',
		'Tháng 4',
		'Tháng 5',
		'Tháng 6',
		'Tháng 7',
		'Tháng 8',
		'Tháng 9',
		'Tháng 10',
		'Tháng 11',
		'Tháng 12',
	];

	// Call api
	useEffect(() => {
		(async () => {
			try {
				setIsLoading(true);
				const res: any = await revenueService.getRevenueMonthToYear({
					token: String(token),
					_type: year,
				});

				if (res.status === 1) {
					setData(res.data);
					setIsLoading(false);
				} else {
					setIsLoading(false);
				}
			} catch (error) {
				setIsLoading(false);
				console.log(error);
				toast.error('Có lỗi xảy ra!');
			}
		})();
	}, [year]);

	// Cấu hình biểu đồ
	const dataChart = {
		labels: labels,
		datasets: [
			{
				label: 'Doanh thu theo tháng',
				backgroundColor: 'rgb(255, 99, 132)',
				borderColor: 'rgb(255, 99, 132)',
				data: data,
			},
		],
	};

	return (
		<LoadingData isLoading={isLoading}>
			<div className={styles.container}>
				<Line data={dataChart} />
			</div>
		</LoadingData>
	);
}
export default LineChart;
