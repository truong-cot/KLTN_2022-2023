import clsx from 'clsx';
import Link from 'next/link';
import {useRouter} from 'next/router';
import DisplayProtected from '~/components/protected/DisplayProtected';
import {PropsTabNavLink} from './interface';
import styles from './TabNavLink.module.scss';

function TabNavLink({listHref, query}: PropsTabNavLink) {
	const router = useRouter();
	return (
		<div className={styles.container}>
			{listHref.map((item, i) => (
				<DisplayProtected key={i} code={item.code}>
					<Link href={`${item.pathname}${item.query ? `?${query}=${item.query}` : ''}`}>
						<a
							className={clsx(styles.item, {
								[styles.active]: router.query[`${query}`]
									? router.query[`${query}`] === item.query
									: !item.query,
							})}
						>
							{item.title}
						</a>
					</Link>
				</DisplayProtected>
			))}
		</div>
	);
}

export default TabNavLink;
