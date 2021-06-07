import { useRef, useEffect, useState } from "react";
import { m } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function NewImage({ src, placeholder, ...props }) {
  const ref = useRef();
  const loaded = useRef(false);
  const [intersection, inView] = useInView();
  const [inViewMemoized, setInViewMemoized] = useState(false);

  const onLoad = () => {
    if (loaded.current) {
      return;
    }
    loaded.current = true;
  };

  useEffect(() => {
    if (!inViewMemoized && inView) {
      setInViewMemoized(true);
    }
  }, [inView]);

  useEffect(() => {
    if (ref.current?.complete) {
      onLoad();
    }
  }, []);

  return (
    <div ref={intersection}>
      {placeholder && <img src={placeholder} alt="palceholder"></img>}
      <m.img
        src={inViewMemoized ? src : undefined}
        ref={ref}
        onLoad={onLoad}
        {...props}
      />
      <noscript>
        {placeholder && <img src={placeholder} alt="placeholder"></img>}
        <img src={src} {...props} />
      </noscript>
    </div>
  );
}
