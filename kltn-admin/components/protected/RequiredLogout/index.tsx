//**********************
//* COMPONENT PROTECTED SCREEN THEN LOGIN
//**********************

import React from 'react';
import {RootState} from '~/redux/store';
import {useRouter} from 'next/router';
import {useSelector} from 'react-redux';

interface props {
	children: React.ReactNode;
}

function RequiredLogout({children}: props) {
	const router = useRouter();
	const {isLogged} = useSelector((state: RootState) => state.auth);
	const {isLoading} = useSelector((state: RootState) => state.interface);

	var route;
	if (router.locale === ' undefined') {
		route = '/';
	} else {
		route = router.locale;
	}

	/********** redirect home when user login  **********/
	if (isLogged && !isLoading) {
		router.push(`/`);
	}

	if (!isLogged && !isLoading) {
		return <>{children}</>;
	}

	return <div className='loading-page'></div>;
}

export default RequiredLogout;
