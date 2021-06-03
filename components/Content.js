import styles from "./Content.module.css";

export default function Content({ hover, children }) {
  return (
    <div class={styles.content}>
      <div class={style.cover}>{children}</div>
      {hover && <div class={`${style.hover} ${style.cover}`}>{hover}</div>}
    </div>
  );
}
