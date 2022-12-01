import {ReactNode} from 'react';
import Blanket from '../Blanket';
import Menu from '../Menu';
import styles from './Dropdown.module.scss';

function Dropdown({
	children,
	isOpen,
	target,
	onClose,
}: {
	children?: ReactNode;
	readonly isOpen: boolean;
	readonly target: ReactNode;
	readonly onClose: () => void;
}) {
	return (
		<div className={styles.dropdown}>
			{target}
			{isOpen ? <Menu>{children}</Menu> : null}
			{isOpen ? <Blanket onClick={onClose} /> : null}
		</div>
	);
}

export default Dropdown;
