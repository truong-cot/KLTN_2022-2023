import React from 'react';
import Slider from 'react-slick';

import styles from './Brand.module.scss';

function Brand() {
	const brands: Array<string> = [
		'https://d-themes.com/react/molla/demo-5/images/brands/1.png',
		'https://d-themes.com/react/molla/demo-5/images/brands/2.png',
		'https://d-themes.com/react/molla/demo-5/images/brands/3.png',
		'https://d-themes.com/react/molla/demo-5/images/brands/4.png',
		'https://d-themes.com/react/molla/demo-5/images/brands/5.png',
		'https://d-themes.com/react/molla/demo-5/images/brands/6.png',
		'https://d-themes.com/react/molla/demo-5/images/brands/7.png',
		'https://d-themes.com/react/molla/demo-5/images/brands/8.png',
		'https://d-themes.com/react/molla/demo-5/images/brands/9.png',
	];

	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 7,
		slidesToScroll: 1,
		swipeToSlide: true,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 6,
				},
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 5,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 4,
				},
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 3,
				},
			},
		],
	};
	return (
		<div className={styles.brand__wrappe}>
			<Slider {...settings} className={styles.slider}>
				{brands.length &&
					brands.map((brand, index) => (
						<div className={styles.item} key={index}>
							<img className={styles.img} src={brand} alt={brand} />
						</div>
					))}
			</Slider>
		</div>
	);
}

export default Brand;
