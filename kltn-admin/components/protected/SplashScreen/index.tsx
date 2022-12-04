import axios from 'axios';
import Lottie from 'react-lottie';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import * as loading from '~/public/static/anim/loading.json';
import {RootState} from '~/redux/store';
import {loadingComplete} from '~/redux/reducers/interface';
import styles from './SplashScreen.module.scss';
import {login} from '~/redux/reducers/authSlice';
import {updateDataUser} from '~/redux/reducers/userSlice';

/*===========> INTERFACE <==========*/
interface props {
	name?: string;
	children: React.ReactNode;
}

/*===========> MAIN COMPONENT <==========*/
function SplashScreen({children}: props) {
	const dispatch = useDispatch();
	const {isLoading} = useSelector((state: RootState) => state.interface);

	const defaultOptions2 = {
		loop: true,
		autoplay: true,
		animationData: loading,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
		},
	};

	useEffect(() => {
		(async () => {
			try {
				// const res: any = await axios.get<any>(`${origin}/api/check-login`);
				// const dataCheck = res.data;

				// /*---------- current user logged, update state ----------*/
				// if (dataCheck.errorCode === 0) {
				// 	dispatch(login({token: dataCheck.data.token}));
				// 	dispatch(updateDataUser({data: dataCheck.data.userData}));
				// }

				setTimeout(() => {
					dispatch(loadingComplete());
				}, 2000);
			} catch (err) {
				setTimeout(() => {
					dispatch(loadingComplete());
				}, 2000);
			}
		})();
	}, [dispatch]);

	if (!isLoading) {
		return <>{children}</>;
	}

	return (
		<div className={styles.container}>
			<div className={styles.loading}>
				<Lottie options={defaultOptions2} />
			</div>
		</div>
	);
}

export default SplashScreen;
