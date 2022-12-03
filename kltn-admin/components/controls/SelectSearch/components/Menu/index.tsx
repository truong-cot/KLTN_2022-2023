import styles from './Menu.module.scss';

function Menu(props: JSX.IntrinsicElements['div']) {
	return <div className={styles.menu} {...props} />;
}

export default Menu;
