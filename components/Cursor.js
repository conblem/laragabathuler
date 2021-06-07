import { useRef, useEffect } from "react";
import { useMediaPredicate } from "react-media-hook";
import { m, useAnimation } from "framer-motion";

import styles from "../styles/Cursor.module.scss";

export default function CursorConditional() {
  const isFinePointer = useMediaPredicate("(pointer: fine");
  return isFinePointer && <Cursor />;
}

const variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

function Cursor() {
  const controls = useAnimation();
  const ref = useRef();

  useEffect(() => {
    const body = document.body;

    const mouseenter = () => ref.current.classList.remove(styles.hide);
    body.addEventListener("mouseenter", mouseenter);

    const mouseleave = () => ref.current.classList.add(styles.hide);
    body.addEventListener("mouseleave", mouseleave);

    let initialMove = false;
    let animationFrame;
    const mousemove = (event) => {
      animationFrame = window.requestAnimationFrame(() => {
        if (!initialMove) {
          controls.start("animate");
          body.classList.add("hide-original-cursor");
        }
        initialMove = true;
        const x = event.x - ref.current.clientLeft;
        const y = event.y - ref.current.clientTop;
        ref.current.style.transform = `translate(${x}px, ${y}px)`;
      });
    };
    body.addEventListener("mousemove", mousemove);

    return () => {
      body.classList.remove("hide-original-cursor");
      body.removeEventListener("mouseenter", mouseenter);
      body.removeEventListener("mouseleave", mouseleave);
      body.removeEventListener("mousemove", mousemove);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <m.div
      variants={variants}
      initial="initial"
      animate={controls}
      className={`${styles.cursor}`}
      ref={ref}
    ></m.div>
  );
}
