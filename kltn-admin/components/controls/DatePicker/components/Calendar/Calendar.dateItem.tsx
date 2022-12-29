import clsx from 'clsx';
import {memo} from 'react';
import style from './Calendar.module.scss';

interface props {
	date: any;
	status: string;
	time: any;
	isActive?: boolean;
	onClick?: (any: any) => void;
	onChoose: (any: any) => void;
}

function DateItem({date, status, time, isActive, onClick, onChoose}: props) {
	const handleClick = () => {
		onChoose(time);
		if (onClick) {
			onClick(time);
		}
	};
	return (
		<div
			className={clsx(style.dateItem, style[`${status}`], {
				[style.active]: isActive,
			})}
			onClick={handleClick}
		>
			<span className={style.dateText}>{date}</span>
		</div>
	);
}

export default memo(DateItem);
