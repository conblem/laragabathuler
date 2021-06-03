import styles from "../styles/Content.module.scss";

export default function Content({ hover, children, full }) {
  const className = full ? "column is-full-desktop" : "column is-half-desktop";

  return (
    <div className={className}>
      <div className={styles.content}>
        <div className={styles.cover}>{children}</div>
        {hover && (
          <div className={`${styles.hover} ${styles.cover}`}>{hover}</div>
        )}
      </div>
    </div>
  );
}
