import {memo, useCallback, useEffect, useState} from 'react';
import {RiCloseLine} from 'react-icons/ri';

import {PropsFilter} from './interface';
import styles from './Filter.module.scss';
import {toast} from 'react-toastify';
import {deleteItemStorage, getItemStorage, setItemStorage} from '~/common/func/localStorage';
import DatePicker from '~/components/controls/DatePicker';
import Select from '~/components/controls/Select';
import Button from '~/components/controls/Button';

function Filter({onClose, onSetFormData, nameSave, select, attrs}: PropsFilter) {
	const [formFilter, setFormFilter] = useState<any>({
		from: null,
		to: null,
	});

	/*---------- Get Filter local saved ----------*/
	useEffect(() => {
		const filter = getItemStorage(nameSave || 'Filter');
		filter && setFormFilter(filter);
	}, [nameSave]);

	const handleChange = useCallback((value: any, key: string) => {
		setFormFilter((prev: any) => ({...prev, [key]: value}));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const hanleSearch = () => {
		onSetFormData((prev: any) => ({...prev, ...formFilter}));
	};

	const handleReset = () => {
		setFormFilter({
			from: null,
			to: null,
		});
		deleteItemStorage(nameSave || 'Filter');
		toast.info('Đã đặt lại bộ lọc');
	};

	const handleSave = () => {
		setItemStorage(nameSave || 'Filter', formFilter);
		toast.info('Đã lưu bộ lọc');
	};
	return (
		<div className={styles.container} tabIndex={-1} {...attrs}>
			<div className={styles.header}>
				<p>Bộ lọc tìm kiếm</p>
				<div className={styles.icon} onClick={onClose}>
					<RiCloseLine />
				</div>
			</div>
			<div className={styles.body}>
				<div className={styles.groupInput}>
					<label className={styles.label}>Thời gian</label>
					<div className={styles.groupDate}>
						<DatePicker
							placeholder='Từ'
							value={formFilter.from}
							onSetValue={(v) => {
								handleChange(v, 'from');
							}}
						/>
						<DatePicker
							placeholder='Đến'
							value={formFilter.to}
							onSetValue={(v) => {
								handleChange(v, 'to');
							}}
						/>
					</div>
				</div>
				{select &&
					select.map((item, i) => {
						return (
							<div key={i} className={styles.groupInput}>
								<label className={styles.label}>{item.title}</label>
								<Select
									placeholder='Vui lòng chọn'
									options={item.options}
									value={formFilter[item.key]}
									onSetValue={(v) => {
										handleChange(v, item.key);
									}}
								/>
							</div>
						);
					})}

				<div className={styles.groupButton}>
					<Button rounded_8 primary1RG onClick={hanleSearch}>
						Tìm kiếm
					</Button>
				</div>
			</div>
			<div className={styles.footer}>
				<div className={styles.btn} onClick={handleReset}>
					Đặt lại bộ lọc
				</div>
				<div className={styles.btn} onClick={handleSave}>
					Lưu bộ lọc
				</div>
			</div>
		</div>
	);
}

export default memo(Filter);
