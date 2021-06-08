import { useRef, useEffect, useState } from "react";
import { m } from "framer-motion";
import { useInView } from "react-intersection-observer";

import styles from "../styles/NewImages.module.scss";

export default function NewImage({ src, onLoad, placeholder, ...props }) {
  const ref = useRef();
  const loaded = useRef(false);
  const [intersection, inView] = useInView();
  const [inViewMemoized, setInViewMemoized] = useState(false);

  const onLoadWrapper = () => {
    if (loaded.current) {
      return;
    }
    loaded.current = true;
    onLoad && onLoad();
  };

  useEffect(() => {
    if (!inViewMemoized && inView) {
      setInViewMemoized(true);
    }
  }, [inView]);

  useEffect(() => {
    if (ref.current?.complete) {
      onLoadWrapper();
    }
  }, []);

  return (
    <div ref={intersection} className={styles.image}>
      {placeholder && (
        <img
          src={placeholder}
          alt="palceholder"
          className={`${styles.placeholder} ${styles.cover}`}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            width: "100%",
            height: "100%",
            filter: "blur(2rem)",
            transform: "scale(1.2)",
          }}
        />
      )}
      <m.img
        src={inViewMemoized ? src : undefined}
        ref={ref}
        onLoad={onLoadWrapper}
        className={styles.cover}
        {...props}
      />
      <noscript>
        <img className={styles.cover} src={src} {...props} />
      </noscript>
    </div>
  );
}
