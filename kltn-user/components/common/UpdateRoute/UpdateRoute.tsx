import {memo, useEffect} from 'react';
import {useRouter} from 'next/router';
import {useDispatch} from 'react-redux';
import {updateRouterPrev} from '~/redux/reducers/siteSlice';
// import {updateRouterPrev} from '~/redux/reducers/interface';

function UpdateRoute() {
	const dispatch = useDispatch();
	const router = useRouter();

	useEffect(() => {
		return () => {
			if (router.pathname !== '/auth/login' && router.pathname !== '/auth/register') {
				dispatch(updateRouterPrev(router.asPath));
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router]);
	return null;
}

export default memo(UpdateRoute);
