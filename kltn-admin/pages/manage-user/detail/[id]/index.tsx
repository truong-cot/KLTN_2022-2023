import {ReactElement} from 'react';
import BaseLayout from '~/components/layout/BaseLayout';
import Page from '~/components/layout/Page';
import MainDetailUser from '~/components/pages/ManageUser/MainDetailUser';

export default function DetailUser() {
	return (
		<Page title='Chi tiết user'>
			<MainDetailUser />;
		</Page>
	);
}

DetailUser.getLayout = function (page: ReactElement) {
	return <BaseLayout title='Chi tiết user'>{page}</BaseLayout>;
};
