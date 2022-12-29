import HeadlessTippy from '@tippyjs/react/headless';
import {Calendar as IconCalender} from 'iconsax-react';
import {memo, useEffect, useState} from 'react';

import convertDate from '~/common/func/convertDate';
import Calendar from './components/Calendar';
import {PropsDatePicker} from './interface';
import styles from './DatePicker.module.scss';

function DatePicker({placeholder, onSetValue, value}: PropsDatePicker) {
	const [show, setShow] = useState<boolean>(false);

	const handleClickDay = (time: number) => {
		setShow(false);
		onSetValue(new Date(time));
	};

	return (
		<HeadlessTippy
			interactive
			visible={show}
			placement='bottom-end'
			render={(attrs) => <Calendar onClickDay={handleClickDay} />}
			onClickOutside={() => setShow(false)}
		>
			<div className={styles.calendar} onClick={() => setShow(!show)}>
				<IconCalender size='20' />
				<div className={styles.value}>
					{value ? convertDate(value).getDate() : placeholder}
				</div>
			</div>
		</HeadlessTippy>
	);
}

export default memo(DatePicker);
