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

function LineChart() {
	Chart.register(CategoryScale);

	const [list, setList] = useState<Array<Number>>([]);
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
				});

				if (res.status === 1) {
					setList(res.data);
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
	}, [token]);

	// Cấu hình biểu đò
	const data = {
		labels: labels,
		datasets: [
			{
				label: 'Doanh thu theo tháng',
				backgroundColor: 'rgb(255, 99, 132)',
				borderColor: 'rgb(255, 99, 132)',
				data: list,
			},
		],
	};

	return (
		<LoadingData isLoading={isLoading}>
			<div className={styles.container}>
				<Line data={data} />
			</div>
		</LoadingData>
	);
}
export default LineChart;
