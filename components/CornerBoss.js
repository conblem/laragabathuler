import React, { useState, useEffect, useCallback, useContext } from "react";
import ReactDOM from "react-dom";

import styles from "../styles/CornerBoss.module.scss";
import Maske from "../public/maske.svg";

const TopContext = React.createContext(0);

export function TopProvider({ children }) {
  const [top, setTop] = useState(0);

  const ref = useCallback((node) => {
    if (node) {
      const { bottom } = node.getBoundingClientRect();
      setTop(bottom);
    }
  }, []);

  return <TopContext.Provider value={top}>{children(ref)}</TopContext.Provider>;
}

function useCalculate(width) {
  const [elem, setElem] = useState();

  const ref = useCallback(
    (node) => {
      if (!node) {
        return;
      }
      const { left, right } = node.getBoundingClientRect();
      setElem({ left, right });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [width]
  );

  return [elem, ref];
}

export default function CornerBoss({ children }) {
  const [width, setWidth] = useState();
  const [elem1, ref1] = useCalculate(width);
  const [elem2, ref2] = useCalculate(width);

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
  const top = useContext(TopContext);
  return (
    <>
      <Maske
        className={styles.corner}
        style={{
          transform: `translate(${left - 1}px, ${top - 1}px) rotate(90deg)`,
        }}
      />
      <Maske
        className={styles.corner}
        style={{
          transform: `translate(${right - 15}px, ${top - 1}px) rotate(180deg)`,
        }}
      />
    </>
  );
}
