import React, {useEffect, useState} from 'react';
import {IoCloseOutline, IoSearchOutline} from 'react-icons/io5';
import HeadlessTippy from '@tippyjs/react/headless';

import styles from './Search.module.scss';

function Search() {
	const [value, setValue] = useState<String>('');

	const [show, setShow] = useState<boolean>(false);

	useEffect(() => {
		if (value) {
			setShow(true);
		} else {
			setShow(false);
		}
	}, [value]);

	return (
		<HeadlessTippy
			interactive
			visible={show}
			placement='bottom-end'
			onClickOutside={() => setShow(false)}
			render={(attrs: any) => <div>search</div>}
		>
			<div className={styles.search}>
				<input
					className={styles.search_input}
					placeholder='Search product...'
					onChange={(e) => setValue(e.target.value)}
					value={String(value)}
				/>
				<span className={styles.search_icon}>
					<IoSearchOutline />
				</span>
				{value && (
					<div className={styles.icon_close} onClick={() => setValue('')}>
						<IoCloseOutline />
					</div>
				)}
			</div>
		</HeadlessTippy>
	);
}

export default Search;
