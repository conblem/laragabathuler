import styles from "./Content.module.scss";

export default function Content({ hover, children, full }) {
  let className = `${styles.content} column `;
  className += full ? "is-full-desktop" : "is-half-desktop";

  return (
    <div className={className}>
      <div className={styles.cover}>{children}</div>
      {hover && (
        <div className={`${styles.hover} ${styles.cover}`}>{hover}</div>
      )}
    </div>
  );
}
