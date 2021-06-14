import React from "react";

import styles from "../styles/Content.module.scss";
import Maske from "../public/maske.svg";

const Content = React.forwardRef(
  ({ hover, children, aspectX, aspectY }, ref) => {
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
        <div ref={ref} className={styles.cover}>
          {children}
        </div>
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
);

export default Content;
