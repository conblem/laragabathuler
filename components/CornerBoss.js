import { useState, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";

import styles from "../styles/CornerBoss.module.scss";
import Maske from "../public/maske.svg";

const calculate = (setElem, width) =>
  useCallback(
    (node) => {
      if (!node) {
        return;
      }
      const { left, right } = node.getBoundingClientRect();
      setElem({ left, right });
    },
    [width]
  );

export default function CornerBoss({ children }) {
  const [width, setWidth] = useState();
  const [elem1, setElem1] = useState();
  const [elem2, setElem2] = useState();
  const ref1 = calculate(setElem1, width);
  const ref2 = calculate(setElem2, width);

  useEffect(() => {
    const onresize = () => {
      setWidth(document.body.clientWidth);
    };
    window.addEventListener("resize", onresize);
    onresize();

    return () => window.removeEventListener("resize", onresize);
  }, []);

  return (
    <>
      {elem1 && ReactDOM.createPortal(<Corners {...elem1} />, document.body)}
      {children(ref1, ref2)}
      {elem2 && ReactDOM.createPortal(<Corners {...elem2} />, document.body)}
    </>
  );
}

function Corners({ left, right }) {
  return (
    <>
      <Maske
        className={styles.corner}
        style={{
          transform: `translateX(${left - 1}px) rotate(90deg)`,
        }}
      />
      <Maske
        className={styles.corner}
        style={{
          transform: `translateX(${right - 14}px) rotate(180deg)`,
        }}
      />
    </>
  );
}