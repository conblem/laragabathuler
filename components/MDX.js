import { MDXRemote } from "next-mdx-remote";

import Image from "./Image";
import styles from "../styles/MDX.module.scss";
import Arrow from "../public/arrow.svg";

function Link({ children, ...props }) {
  return (
    <a className={styles.link} {...props}>
      {children} <Arrow className={styles.icon} />
    </a>
  );
}

export default function Project({ source, summary, description, children }) {
  const components = {
    a: Link,
  };

  return (
    <div className="columns is-multiline is-desktop">
      <div className={`${styles.text} column is-half-desktop`}>
        <MDXRemote {...description} components={components} />
      </div>
      <div className={`${styles.text} column is-half-desktop`}>
        <MDXRemote {...summary} components={components} />
      </div>
      <MDXRemote {...source} components={{ Image }} />

      {children}
    </div>
  );
}
