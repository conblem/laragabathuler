import { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { useMediaPredicate } from "react-media-hook";

import styles from "../styles/Cursor.module.scss";

export default function CursorConditional() {
  const isFinePointer = useMediaPredicate("(pointer: fine)");
  return isFinePointer && <Cursor />;
}

function Cursor() {
  const animationFrame = useRef();
  const ref = useRef();

  useEffect(() => {
    const body = document.body;

    const mouseenter = () => ref.current.classList.remove(styles.hide);
    body.addEventListener("mouseenter", mouseenter);

    const mouseleave = () => ref.current.classList.add(styles.hide);
    body.addEventListener("mouseleave", mouseleave);

    let initialMove = false;
    const mousemove = (event) => {
      animationFrame.current = window.requestAnimationFrame(() => {
        if (!initialMove) {
          ref.current.classList.remove(styles.hide);
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
      window.cancelAnimationFrame(animationFrame.current);
    };
  }, []);

  return ReactDOM.createPortal(
    <div className={`${styles.cursor} ${styles.hide}`} ref={ref}></div>,
    document.body
  );
}
