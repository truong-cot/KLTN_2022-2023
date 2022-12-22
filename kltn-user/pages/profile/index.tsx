import React, {ReactElement} from 'react';
import TagPage from '~/components/controls/TagPage';
import BaseLayout from '~/components/layout/BaseLayout';
import LayoutGrid from '~/components/layout/LayoutGrid';
import Page from '~/components/layout/Page';
import ProfileLayout from '~/components/layout/ProfileLayout';
import MainProfile from '../../components/pages/Profile/MainProfile';

import styles from './Profile.module.scss';
import RequireAuth from '~/components/protected/RequiredAuth';

function Profile() {
	return (
		<RequireAuth>
			<Page title='Trang cá nhân'>
				<div className={styles.header}>
					<h4 className={styles.title_header}>Chào mừng bạn đến với MOLLA</h4>
					<p className={styles.text_header}>Trang cá nhân</p>
				</div>
				<LayoutGrid>
					<div className={styles.container}>
						<TagPage text_1='Home' href_1='/' text_2='Trang cá nhân' />
						<ProfileLayout>
							<MainProfile />
						</ProfileLayout>
					</div>
				</LayoutGrid>
			</Page>
		</RequireAuth>
	);
}

export default Profile;

Profile.getLayout = function (page: ReactElement) {
	return <BaseLayout>{page}</BaseLayout>;
};
