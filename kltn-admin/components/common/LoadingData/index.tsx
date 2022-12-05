import {Fragment} from 'react';
import Lottie from 'react-lottie';
import * as loading from '../../../public/static/anim/loading.json';
import style from './LoadingData.module.scss';

function LoadingData({isLoading, children}: {isLoading?: boolean; children: any}) {
	const defaultOptions2 = {
		loop: true,
		autoplay: true,
		animationData: loading,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
		},
	};
	return (
		<Fragment>
			{isLoading ? (
				<div className={style.container}>
					<div className={style.logo}>
						<Lottie options={defaultOptions2} />
					</div>
				</div>
			) : (
				<Fragment>{children}</Fragment>
			)}
		</Fragment>
	);
}

export default LoadingData;
