import styles from "../styles/Cursor.module.scss";
import { useRef, useEffect, useState } from "react";

export default function Cursor() {
  const request = useRef();
  const ref = useRef();

  useEffect(() => {
    const body = document.body;

    const mouseenter = () => ref.current.classList.remove(styles.hide);
    body.addEventListener("mouseenter", mouseenter);

    const mouseleave = () => ref.current.classList.add(styles.hide);
    body.addEventListener("mouseleave", mouseleave);

    const mousemove = (event) => {
      request.current = window.requestAnimationFrame(() => {
        const x = event.x - ref.current.clientLeft;
        const y = event.y - ref.current.clientTop;
        ref.current.style.transform = `translate(${x}px, ${y}px)`;
      });
    };
    body.addEventListener("mousemove", mousemove);

    body.classList.add("hide-original-cursor");
    ref.current.classList.add(styles.hide);
    return () => {
      body.classList.remove("hide-original-cursor");
      body.removeEventListener("mouseenter", mouseenter);
      body.removeEventListener("mouseleave", mouseleave);
      body.removeEventListener("mousemove", mousemove);
      window.cancelAnimationFrame(request.current);
    };
  }, []);

  return <div className={styles.cursor} ref={ref}></div>;
}
