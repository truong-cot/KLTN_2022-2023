import Link from 'next/link';
import clsx from 'clsx';
import styles from './TabNavLink.module.scss';
import {useRouter} from 'next/router';
import {PropsTabNavLink} from './interface';

function TabNavLink({listHref, query}: PropsTabNavLink) {
	const router = useRouter();
	return (
		<div className={styles.container}>
			{listHref.map((item: any, i: any) => (
				<Link
					className={clsx(styles.item, {
						[styles.active]: router.query[`${query}`]
							? router.query[`${query}`] === item.query
							: !item.query,
					})}
					key={i}
					href={`${item.pathname}${item.query ? `?${query}=${item.query}` : ''}`}
					scroll={false}
				>
					{item.title}
				</Link>
			))}
		</div>
	);
}

export default TabNavLink;
