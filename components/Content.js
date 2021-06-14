import React from "react";
import { m } from "framer-motion";
import { useMediaPredicate } from "react-media-hook";

import styles from "../styles/Content.module.scss";
import Maske from "../public/maske.svg";

const Content = React.forwardRef(
  ({ hover, children, aspectX, aspectY }, ref) => {
    const canHover = useMediaPredicate("(hover: hover)");

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
          <m.div
            initial={{
              opacity: 1,
            }}
            whileHover={{
              opacity: 1,
            }}
            animate={{
              opacity: canHover ? 0 : 1,
            }}
            className={`${styles.hover} ${styles.cover}`}
          >
            <Maske className={styles.top} />
            <div className={styles.textWrapper}>
              <div className={styles.text}>{hover}</div>
            </div>
            <Maske className={styles.right} />
          </m.div>
        )}
      </div>
    );
  }
);

export default Content;
