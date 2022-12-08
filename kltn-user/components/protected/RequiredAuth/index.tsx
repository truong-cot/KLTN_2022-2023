import {RootState} from '~/redux/store';
import {useRouter} from 'next/router';
import {useSelector} from 'react-redux';

interface IRequireAuthProps {
	children: React.ReactNode;
}

export default function RequireAuth(props: IRequireAuthProps) {
	const router = useRouter();

	const {isLogged} = useSelector((state: RootState) => state.auth);
	const {isLoading} = useSelector((state: RootState) => state.interface);

	if (!isLogged && !isLoading) {
		router.push('/auth/login');
	}

	if (isLogged && !isLoading) {
		return <>{props.children}</>;
	}

	return <></>;
}
