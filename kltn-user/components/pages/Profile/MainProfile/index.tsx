import React from 'react';

import {useRouter} from 'next/router';
import InfoProfile from './InfoProfile';
import ChangeInfoUser from './ChangeInfoUser';

function MainProfile() {
	const router = useRouter();
	const {_changeInfo} = router.query;

	return <div> {!!_changeInfo ? <ChangeInfoUser /> : <InfoProfile />}</div>;
}

export default MainProfile;
