import styles from "../styles/Content.module.scss";
import Maske from "../public/maske.svg";

export default function Content({ hover, children, aspectX, aspectY }) {
  const paddingTop = `calc(${aspectY} / ${aspectX} * 100%)`;
  return (
    <div style={{ paddingTop }} className={styles.content}>
      <div className={`${styles.cover} ${styles.center}`}>
        <div className={styles.ring}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div className={styles.cover}>{children}</div>
      {hover && (
        <div className={`${styles.hover}`}>
          <Maske className={styles.top} />
          <div className={styles.textWrapper}>
            <div className={styles.text}>{hover}</div>
          </div>
          <Maske className={styles.right} />
        </div>
      )}
    </div>
  );
}
