import {Fragment} from 'react';
import clsx from 'clsx';
import Link from 'next/link';

import {useStyleClass} from '~/common/hooks/usStyleClass';
import {PropsButton} from './interface';
import style from './Button.module.scss';

function Button({children, onClick, href, className, target, ...props}: PropsButton): JSX.Element {
	const styleClass = useStyleClass(props, style);

	return (
		<Fragment>
			{!href || href === undefined ? (
				<button onClick={onClick} className={clsx([styleClass, style.btn, className])}>
					{children}
				</button>
			) : (
				<Link
					href={`${href}`}
					className={clsx([styleClass, style.btn, className])}
					target={target}
				>
					{children}
				</Link>
			)}
		</Fragment>
	);
}

export default Button;
