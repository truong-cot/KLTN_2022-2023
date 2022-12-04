import {useSelector} from 'react-redux';
import RequireAuth from '~/components/protected/RequiredAuth';
import {RootState} from '~/redux/store';

function MainHome() {
	const {userData} = useSelector((state: RootState) => state.user);
	const {token} = useSelector((state: RootState) => state.auth);

	console.log(userData, token);

	return (
		<RequireAuth>
			<div>MainHome</div>
		</RequireAuth>
	);
}

export default MainHome;
