import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import styles from './Banner.module.scss';
import BannerItem from '../components/BannerItem';

function NextArrow(props: any) {
	const {style, onClick} = props;
	return (
		<div
			style={{...style, display: 'none', background: 'red', right: '100px'}}
			onClick={onClick}
		/>
	);
}

function PrevArrow(props: any) {
	const {style, onClick} = props;
	return <div style={{...style, display: 'none', background: 'green'}} onClick={onClick} />;
}

function Banner() {
	const banners: Array<any> = [
		{
			background: 'https://d-themes.com/react/molla/demo-5/images/home/sliders/slide-1.jpg',
			title: 'Mystery Deals',
			bottomSuggest: 'Online only',
			topSuggest: "Don't miss",
			btnContent: 'DISCOVER NOW',
		},
		{
			background: 'https://d-themes.com/react/molla/demo-5/images/home/sliders/slide-2.jpg',
			title: 'Treat your self',
			bottomSuggest: 'Limited time only',
			topSuggest: 'Up to 50% off',
			btnContent: 'DISCOVER NOW',
		},
	];

	return (
		<div className={styles.container}>
			<Slider
				dots={true}
				infinite={true}
				speed={300}
				slidesToShow={1}
				slidesToScroll={1}
				autoplay={true}
				autoplaySpeed={3000}
				cssEase='linear'
				nextArrow={<NextArrow />}
				prevArrow={<PrevArrow />}
				arrows={true}
				swipeToSlide={true}
				focusOnSelect={true}
				customPaging={(i: any) => (
					<div className='ft-slick__dots--custom'>
						<div className='loading' />
					</div>
				)}
			>
				{banners.map((item, index) => (
					<BannerItem key={index} {...item} />
				))}
			</Slider>
		</div>
	);
}

export default Banner;
