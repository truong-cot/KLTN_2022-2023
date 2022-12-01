import styles from './CheckBox.module.scss';

interface PropsCheckBox {
	onChange: (data: any) => void;
	checked: boolean;
}

function CheckBox(props: PropsCheckBox) {
	return (
		<label className={styles.container}>
			<input type='checkbox' onChange={props.onChange} checked={props.checked} />
			<span className={styles.checkmark}></span>
		</label>
	);
}

export default CheckBox;
