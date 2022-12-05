import {SearchNormal1} from 'iconsax-react';
import React from 'react';
import {VscClose} from 'react-icons/vsc';

import {PropsSearch} from './interface';
import styles from './Search.module.scss';

function Search({placeholder, keyword, onSetKeyword}: PropsSearch) {
	return (
		<div className={styles.input}>
			<div className={styles.icon}>
				<SearchNormal1 size='18' color='#989898' />
			</div>
			<input
				type='text'
				value={keyword}
				placeholder={placeholder}
				onChange={(e) => onSetKeyword(e.target.value)}
			/>
			{keyword.trim() !== '' && (
				<div className={styles.btnClose} onClick={() => onSetKeyword('')}>
					<VscClose size='20' />
				</div>
			)}
		</div>
	);
}

export default Search;
