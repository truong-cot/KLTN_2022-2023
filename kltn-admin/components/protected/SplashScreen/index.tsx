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
import userService from '~/api/user';
import {getItemStorage} from '~/common/func/localStorage';

/*===========> INTERFACE <==========*/
interface props {
	name?: string;
	children: React.ReactNode;
}

/*===========> MAIN COMPONENT <==========*/
function SplashScreen({children}: props) {
	const dispatch = useDispatch();
	const {isLoading} = useSelector((state: RootState) => state.interface);
	const {userData} = useSelector((state: RootState) => state.user);

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
			const token = getItemStorage('accessToken');

			try {
				const res: any = await userService.getCurrentUser({
					token: token,
					idUser: userData._id,
				});

				// /*---------- current user logged, update state ----------*/
				if (res.status === 1) {
					dispatch(login({token: String(token)}));
					dispatch(updateDataUser({data: res.data}));
				}

				setTimeout(() => {
					dispatch(loadingComplete());
				}, 2000);
			} catch (err) {
				setTimeout(() => {
					dispatch(loadingComplete());
				}, 2000);
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
