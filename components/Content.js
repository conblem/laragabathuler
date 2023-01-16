import React from "react";

import styles from "../styles/Content.module.scss";
import Maske from "../public/maske.svg";

function Spinner() {
  return (
    <div className={`${styles.cover} ${styles.center}`}>
      <div className={styles.ring}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

const Content = React.forwardRef(function Content(
  { hover, children, aspectX, aspectY, spinner = true },
  ref
) {
  const paddingTop = `calc(${aspectY} / ${aspectX} * 100%)`;
  return (
    <div style={{ paddingTop }} className={styles.content}>
      {spinner ? <Spinner /> : null}
      <Spinner />
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
});

export default Content;
