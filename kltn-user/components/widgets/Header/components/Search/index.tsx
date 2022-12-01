import React from 'react';
import {IoSearchOutline} from 'react-icons/io5';

import styles from './Search.module.scss';

function Search() {
	return (
		<div className={styles.search}>
			<input className={styles.search_input} placeholder='Search product...' />

			<span className={styles.search_icon}>
				<IoSearchOutline />
			</span>
		</div>
	);
}

export default Search;
