import React from 'react';

import InfoProfile from '../InfoProfile';
import ChangeInfoUser from '../ChangeInfoUser';
import {useRouter} from 'next/router';

function MainProfile() {
	const router = useRouter();
	const {_changeInfo} = router.query;

	return <div>{!!_changeInfo ? <ChangeInfoUser /> : <InfoProfile />}</div>;
}

export default MainProfile;
