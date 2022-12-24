import React, {useEffect, useState} from 'react';
import {IoCloseOutline, IoSearchOutline} from 'react-icons/io5';
import HeadlessTippy from '@tippyjs/react/headless';

import styles from './Search.module.scss';
import BoxSearch from '../BoxSearch';

function Search() {
	const [value, setValue] = useState<String>('');

	const [show, setShow] = useState<boolean>(false);

	useEffect(() => {
		if (value && value.trim() !== '') {
			setShow(true);
		} else {
			setShow(false);
		}
	}, [value]);

	useEffect(() => {
		if (!show) {
			setValue('');
		}
	}, [show]);

	return (
		<HeadlessTippy
			interactive
			visible={show}
			placement='bottom-end'
			onClickOutside={() => setShow(false)}
			render={(attrs: any) => <BoxSearch hide={() => setShow(false)} value={value} />}
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
				{value.trim() !== '' && (
					<div className={styles.icon_close} onClick={() => setValue('')}>
						<IoCloseOutline />
					</div>
				)}
			</div>
		</HeadlessTippy>
	);
}

export default Search;
