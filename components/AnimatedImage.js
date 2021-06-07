import Image from "next/image";
import { m, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

const variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

export default function AnimatedImage(props) {
  const controls = useAnimation();
  const ref = useRef();

  const onLoad = () => {
    controls.start("animate");
  };

  useEffect(() => {
    if (ref.current?.firstChild?.firstChild?.complete) {
      onLoad();
    }
    return () => {
      controls.stop();
    };
  }, []);

  return (
    <m.div
      initial="initial"
      animate={controls}
      variants={variants}
      transition={{ duration: 1 }}
      ref={ref}
    >
      <Image onLoad={onLoad} {...props} />
    </m.div>
  );
}
