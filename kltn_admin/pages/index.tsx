import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layout/BaseLayout';

const Home = () => {
	return (
		<Fragment>
			<Head>
				<title>Trang chủ</title>
			</Head>
			<div>main</div>
		</Fragment>
	);
};

export default Home;

Home.getLayout = function (page: ReactElement) {
	return <BaseLayout title='Trang chủ'>{page}</BaseLayout>;
};
