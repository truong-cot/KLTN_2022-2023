import HeadlessTippy from '@tippyjs/react/headless';
import clsx from 'clsx';
import {ArrowDown2} from 'iconsax-react';
import {memo, useEffect, useState} from 'react';
import {PropsSelect} from './interface';
import styles from './Select.module.scss';

function Select(props: PropsSelect) {
	const [show, setShow] = useState<boolean>(false);

	const handleSelect = (item: any) => {
		props.onSetValue(item);
		setShow(false);
	};

	return (
		<HeadlessTippy
			interactive
			visible={show}
			placement='bottom'
			render={(attrs) => (
				<div className={styles.listOptions} {...attrs}>
					{props.options &&
						props.options.map((item) => (
							<div
								key={item.id}
								className={clsx(styles.item, {
									[styles.active]: props.value?.id === item.id,
								})}
								onClick={() => handleSelect(item)}
							>
								{item.name}
							</div>
						))}
				</div>
			)}
			onClickOutside={() => setShow(false)}
		>
			<div className={styles.container} onClick={() => setShow(!show)}>
				<p>{props.value?.name ? props.value.name : props.placeholder}</p>
				<ArrowDown2 size='20' />
			</div>
		</HeadlessTippy>
	);
}

export default memo(Select);
