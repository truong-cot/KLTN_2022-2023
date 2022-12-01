import React from 'react';
import LayoutGrid from '~/components/layout/LayoutGrid';

import styles from './CategoriesBaner.module.scss';
import CategoriesBanerItem from '../components/CategoriesBanerItem';

function CategoriesBaner() {
	const categories: Array<any> = [
		{
			title: "This Week's Most Wanted",
			img: 'https://d-themes.com/react/molla/demo-5/images/home/banners/banner-1.jpg',
		},
		{
			title: 'Trainers & Sportwear  Sale Up to 70% off',
			img: 'https://d-themes.com/react/molla/demo-5/images/home/banners/banner-2.jpg',
		},
		{
			title: "This Week'sMost Wanted",
			img: 'https://d-themes.com/react/molla/demo-5/images/home/banners/banner-3.jpg',
		},
	];

	return (
		<LayoutGrid>
			<div className={styles.container}>
				<div className={styles.left}>
					<CategoriesBanerItem image={categories[0].img} title={categories[0].title} />
				</div>
				<div className={styles.right}>
					<div>
						<CategoriesBanerItem
							image={categories[1].img}
							title={categories[1].title}
							textActive
						/>
					</div>
					<div>
						<CategoriesBanerItem
							image={categories[2].img}
							title={categories[2].title}
							textActive
						/>
					</div>
				</div>
			</div>
		</LayoutGrid>
	);
}

export default CategoriesBaner;
