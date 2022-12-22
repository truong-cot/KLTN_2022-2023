import styles from "./InfoText.module.scss";

function InfoText({ title, content }: any) {
  return (
    <div className={styles.container}>
      <p className={styles.label}>{title}</p>
      <p className={styles.text}>{content}</p>
    </div>
  );
}

export default InfoText;
