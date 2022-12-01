import React, {Fragment, useState} from 'react';
import {FaPlay} from 'react-icons/fa';
import Popup from '~/components/common/Popup';
import PopupVideo from '~/components/Popup/PopupVideo';

import styles from './VideoIntro.module.scss';

function VideoIntro() {
	const [open, setOpen] = useState<boolean>(false);
	return (
		<Fragment>
			<div className={styles.container}>
				<p className={styles.text_1}>NEW COLLECTION</p>
				<h5 className={styles.text_2}>Winter’19 / Spring’20</h5>
				<div className={styles.div_3} onClick={() => setOpen(true)}>
					<div className={styles.icon}>
						<FaPlay />
					</div>
				</div>
			</div>

			<Popup open={open} onClose={() => setOpen(false)}>
				<PopupVideo />
			</Popup>
		</Fragment>
	);
}

export default VideoIntro;
