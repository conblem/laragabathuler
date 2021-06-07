import { m } from "framer-motion";
import styles from "../styles/Content.module.scss";

const variants = {
  initial: {
    opacity: 1,
  },
  animate: {
    opacity: 0,
  },
  hover: {
    opacity: 1,
  },
};

export default function Content({ hover, children, aspectX, aspectY }) {
  const paddingTop = `calc(${aspectY} / ${aspectX} * 100%)`;
  return (
    <div style={{ paddingTop }} className={styles.content}>
      <div className={`${styles.cover} ${styles.center}`}>
        <div className={styles.ripple}>
          <div></div>
          <div></div>
        </div>
      </div>
      <div className={styles.cover}>{children}</div>
      {hover && (
        <m.div
          initial="initial"
          animate="animate"
          whileHover="hover"
          variants={variants}
          className={`${styles.hover} ${styles.cover}`}
        >
          {hover}
        </m.div>
      )}
    </div>
  );
}
