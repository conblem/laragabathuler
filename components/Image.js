import NextImage from "next/future/image";

import styles from "../styles/Image.module.scss";
import Content from "./Content";

export default function Image({ src, full, alt }) {
  const aspect = full
    ? { aspectX: 2500, aspectY: 1441 }
    : { aspectX: 1250, aspectY: 1485 };

  const className = full ? "is-full" : "is-half-desktop";
  const sizes = full ? "100vw" : `(max-width: ${styles.desktop}) 100vw, 50vw`;

  return (
    <div className={`column ${className}`}>
      <Content {...aspect}>
        <NextImage
          className={styles.image}
          alt={alt}
          src={src}
          quality={100}
          fill
          sizes={sizes}
        />
      </Content>
    </div>
  );
}
