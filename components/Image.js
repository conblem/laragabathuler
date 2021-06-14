import NextImage from "next/image";

import { IntersectionRef } from "../components/CornerBoss";
import styles from "../styles/Image.module.scss";
import Content from "./Content";

export default function Image({ src, full, alt }) {
  const aspect = full
    ? { aspectX: 2500, aspectY: 1441 }
    : { aspectX: 1250, aspectY: 1485 };

  const className = full ? "is-full" : "is-half-desktop";

  return (
    <div className={`column ${className}`}>
      <IntersectionRef>
        {(ref) => (
          <Content ref={ref} {...aspect}>
            <NextImage
              className={styles.image}
              alt={alt}
              src={src}
              layout="fill"
              objectFit="cover"
              quality={100}
            />
          </Content>
        )}
      </IntersectionRef>
    </div>
  );
}
