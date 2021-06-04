import styles from "../styles/Content.module.scss";

export default function Content({ hover, children, aspectX, aspectY }) {
  const paddingTop = `calc(${aspectY} / ${aspectX} * 100%)`;
  return (
    <div style={{ paddingTop }} className={styles.content}>
      <div className={styles.cover}>{children}</div>
      {hover && (
        <div className={`${styles.hover} ${styles.cover}`}>{hover}</div>
      )}
    </div>
  );
}
