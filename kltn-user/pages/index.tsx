import {ReactElement} from 'react';
import BaseLayout from '~/components/layout/BaseLayout';
import Page from '~/components/layout/Page';
import Banner from '~/components/pages/home/Banner';
import Brand from '~/components/pages/home/Brand';
import CategoriesBaner from '~/components/pages/home/CategoriesBaner';
import TrendyProducts from '~/components/pages/home/TrendyProducts';
import VideoIntro from '~/components/pages/home/VideoIntro';

export default function Home() {
	return (
		<Page title='Trang chủ'>
			<Banner />
			<Brand />
			<CategoriesBaner />
			<TrendyProducts />
			<VideoIntro />
		</Page>
	);
}

Home.getLayout = function (page: ReactElement) {
	return <BaseLayout>{page}</BaseLayout>;
};
