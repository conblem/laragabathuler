import React, { useEffect } from "react";
import { m, useAnimation } from "framer-motion";
import { useMediaPredicate } from "react-media-hook";

import styles from "../styles/Content.module.scss";
import Maske from "../public/maske.svg";

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

const Content = React.forwardRef(
  ({ hover, children, aspectX, aspectY }, ref) => {
    const controls = useAnimation();
    const canHover = useMediaPredicate("(hover: hover)");

    useEffect(() => {
      if (canHover) {
        controls.start("animate");
      }
    });

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
            variants={variants}
            controls={controls}
            initial="initial"
            whileHover="hover"
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
