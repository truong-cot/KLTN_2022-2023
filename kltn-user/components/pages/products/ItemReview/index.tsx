import React from 'react';

import styles from './ItemReview.module.scss';
import {AiFillStar} from 'react-icons/ai';
import clsx from 'clsx';
import {TypeReview} from './interfaces';

function ItemReview({data}: TypeReview) {
	const list_star: Array<any> = [
		{
			id: 1,
			star: <AiFillStar size={16} />,
		},
		{
			id: 2,
			star: <AiFillStar size={16} />,
		},
		{
			id: 3,
			star: <AiFillStar size={16} />,
		},
		{
			id: 4,
			star: <AiFillStar size={16} />,
		},
		{
			id: 5,
			star: <AiFillStar size={16} />,
		},
	];
	return (
		<div className={styles.container}>
			<div className={styles.main}>
				<div className={styles.left}>
					<p className={styles.name}>{data.nameUser}</p>
					<div className={styles.list_star}>
						{list_star.map((v, i) => (
							<div
								key={i}
								className={clsx(styles.star, {
									[styles.active_star]: v.id <= Number(data.numberStar),
								})}
							>
								{v.star}
							</div>
						))}
					</div>
					{/* <p className={styles.time}>20/21/2000</p> */}
				</div>
				<div className={styles.right}>
					<p className={styles.type}>
						{data.numberStar >= 1 && data.numberStar < 3
							? 'Kém'
							: data.numberStar >= 3 && data.numberStar <= 4
							? 'Tuyệt vời'
							: 'Xuất sắc'}
					</p>
					<p className={styles.content}>{data.content}</p>
				</div>
			</div>
		</div>
	);
}

export default ItemReview;
