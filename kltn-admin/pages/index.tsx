import {ReactElement} from 'react';
import BaseLayout from '~/components/layout/BaseLayout';
import styles from '~/styles/Home.module.scss';

export default function Home() {
	return <div className={styles.container}>main</div>;
}

Home.getLayout = function (page: ReactElement) {
	return <BaseLayout title='Trang chủ'>{page}</BaseLayout>;
};
