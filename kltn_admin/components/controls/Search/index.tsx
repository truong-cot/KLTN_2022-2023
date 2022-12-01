import {useState} from 'react';
import clsx from 'clsx';
import HeadlessTippy from '@tippyjs/react/headless';
import {CloseCircle, SearchNormal1} from 'iconsax-react';
import {RiFilter3Fill} from 'react-icons/ri';

import {PropsSearch} from './interface';
import styles from './Search.module.scss';

function Search({
	placeholder,
	Filter,
	formData,
	select,
	nameSave,
	onSetFormData,
	keyword,
	onSetKeyword,
}: PropsSearch) {
	const [showFilter, setShowFilter] = useState<boolean>(false);
	const handleHideFilter = () => {
		setShowFilter(false);
	};
	return (
		<div className={styles.container}>
			<div className={styles.search}>
				<div className={clsx(styles.icon, 'flex')}>
					<SearchNormal1 size='20' />
				</div>
				<div className={styles.input}>
					<input
						type='text'
						value={keyword}
						placeholder={placeholder}
						onChange={(e) => onSetKeyword(e.target.value)}
					/>
				</div>
				{keyword.trim() !== '' && (
					<div className={styles.btnClose} onClick={() => onSetKeyword('')}>
						<CloseCircle size='24' variant='Bold' />
					</div>
				)}
			</div>
			{Filter ? (
				<HeadlessTippy
					interactive
					visible={showFilter}
					placement='bottom-start'
					render={(attrs) => (
						<Filter
							onClose={handleHideFilter}
							onSetFormData={onSetFormData}
							formData={formData}
							select={select}
							nameSave={nameSave}
							attrs={attrs}
						/>
					)}
					onClickOutside={handleHideFilter}
				>
					<div
						className={clsx(styles.filter, {[styles.active]: showFilter})}
						onClick={() => setShowFilter(!showFilter)}
					>
						<RiFilter3Fill />
					</div>
				</HeadlessTippy>
			) : null}
		</div>
	);
}

export default Search;
