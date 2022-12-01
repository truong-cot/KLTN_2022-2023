import {IoChevronBackOutline, IoChevronForwardOutline} from 'react-icons/io5';
import {memo, useMemo} from 'react';

import clsx from 'clsx';
import style from './Pagination.module.scss';

function Pagination({total, onSetPage, pageSize, currentPage, isShowBtn = true}: any) {
	const items = useMemo(() => {
		const items = [];
		const max = Math.ceil(total / pageSize);
		for (let i = 1; i <= max; i++) {
			if (
				i === currentPage - 1 ||
				i === currentPage + 1 ||
				i === currentPage ||
				i === 1 ||
				i === max
			) {
				items.push(
					<li
						key={i}
						className={clsx([style.item, {[style.active]: currentPage === i}])}
						onClick={() => onSetPage(i)}
					>
						{i}
					</li>
				);
			}

			if ((i === currentPage - 2 && currentPage >= 4) || (i === currentPage + 2 && i < max)) {
				items.push(
					<li key={i} className={clsx([style.item, {[style.active]: currentPage === i}])}>
						...
					</li>
				);
			}
		}
		return items;
	}, [total, pageSize, currentPage, onSetPage]);

	const handlePrev = () => {
		if (currentPage > 1) {
			onSetPage((prev: any) => prev - 1);
		}
	};

	const handleNext = () => {
		if (currentPage < Math.ceil(total / pageSize)) {
			onSetPage((prev: any) => prev + 1);
		}
	};

	return (
		<div className={style.main}>
			{isShowBtn && currentPage > 1 && (
				<button className={clsx([style.btn, style.left])} onClick={handlePrev}>
					<IoChevronBackOutline />
				</button>
			)}

			<ul className={style.list}>{items}</ul>
			{isShowBtn && currentPage < Math.ceil(total / pageSize) && (
				<button className={clsx([style.btn, style.right])} onClick={handleNext}>
					<IoChevronForwardOutline />
				</button>
			)}
		</div>
	);
}

export default memo(Pagination);
