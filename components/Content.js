import React from "react";
import styles from "../styles/Content.module.scss";

const Content = React.forwardRef(
  ({ hover, children, full, onClick, href }, ref) => {
    const className = full
      ? "column is-full-desktop"
      : "column is-half-desktop";

    return (
      <a className={className} ref={ref} onClick={onClick} href={href}>
        <div className={styles.content}>
          <div className={styles.cover}>{children}</div>
          {hover && (
            <div className={`${styles.hover} ${styles.cover}`}>{hover}</div>
          )}
        </div>
      </a>
    );
  }
);

export default Content;
