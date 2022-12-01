import styles from './Blanket.module.scss';

function Blanket(props: JSX.IntrinsicElements['div']) {
	return <div className={styles.blanket} {...props} />;
}

export default Blanket;
