import Page from '~/components/layout/Page';
import MainLogin from '~/components/pages/auth/MainLogin';
import RequiredLogout from '~/components/protected/RequiredLogout';

function Login() {
	return (
		<RequiredLogout>
			<Page title='Login'>
				<MainLogin />
			</Page>
		</RequiredLogout>
	);
}

export default Login;
