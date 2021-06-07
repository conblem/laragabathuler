import { useRef, useEffect } from "react";
import { m } from "framer-motion";

const observer = new IntersectionObserver();

export default function NewImage({ src, placeholder, ...props }) {
  const ref = useRef();
  const loaded = useRef(false);

  const onLoad = () => {
    if (loaded.current) {
      return;
    }
    loaded.current = true;
  };

  useEffect(() => {
    if (ref.current?.complete) {
      onLoad();
    }
    let observer = new IntersectionObserver(entries);
  }, []);

  return (
    <div>
      {placeholder && <img src={placeholder} alt="palceholder"></img>}
      <m.img ref={ref} onLoad={onLoad} {...props} />
      <noscript>
        {placeholder && <img src={placeholder} alt="placeholder"></img>}
        <img src={src} {...props} />
      </noscript>
    </div>
  );
}
