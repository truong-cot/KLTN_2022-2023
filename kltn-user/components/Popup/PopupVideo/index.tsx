import React from 'react';

import styles from './PopupVideo.module.scss';

function PopupVideo() {
	return (
		<div className={styles.container}>
			<iframe
				width='560'
				height='315'
				src='https://www.youtube.com/embed/okJMM8V6XL0'
				title='YouTube video player'
				frameBorder={0}
				allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
				allowFullScreen
			></iframe>
		</div>
	);
}

export default PopupVideo;
