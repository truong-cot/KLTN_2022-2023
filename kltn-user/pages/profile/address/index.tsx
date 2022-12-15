import {ReactElement} from 'react';
import TagPage from '~/components/controls/TagPage';
import BaseLayout from '~/components/layout/BaseLayout';
import LayoutGrid from '~/components/layout/LayoutGrid';
import Page from '~/components/layout/Page';
import ProfileLayout from '~/components/layout/ProfileLayout';
import MainAddress from '~/components/pages/Profile/MainAddress';

import styles from './Address.module.scss';

function Address() {
	return (
		<Page title='Sổ địa chỉ'>
			<div className={styles.header}>
				<h4 className={styles.title_header}>Chào mừng bạn đến với MOLLA</h4>
				<p className={styles.text_header}>Sổ địa chỉ</p>
			</div>
			<LayoutGrid>
				<div className={styles.container}>
					<TagPage
						text_1='Home'
						href_1='/'
						text_2='Trang cá nhân'
						text_3='Sổ địa chỉ'
						href_2='/profile'
					/>
					<ProfileLayout>
						<MainAddress />
					</ProfileLayout>
				</div>
			</LayoutGrid>
		</Page>
	);
}

export default Address;

Address.getLayout = function (page: ReactElement) {
	return <BaseLayout>{page}</BaseLayout>;
};
