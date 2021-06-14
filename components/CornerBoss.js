import React, { useState, useEffect, useCallback, useContext } from "react";
import ReactDOM from "react-dom";

import useCallbackRef from "../lib/hook";
import styles from "../styles/CornerBoss.module.scss";
import Maske from "../public/maske.svg";

const TopContext = React.createContext(0);
const WidthContext = React.createContext(0);
const ObserverContext = React.createContext();

export function IntersectionRef({ children }) {
  const observer = useContext(ObserverContext);
  const ref = useCallbackRef(
    useCallback(
      (node) => {
        if (!observer) {
          return;
        }
        observer.observe(node);
        return () => observer.unobserve(node);
      },
      [observer]
    )
  );

  return children(ref);
}

export function TopProvider({ children }) {
  const [height, setHeight] = useState(0);
  const [top, setTop] = useState(0);
  const [width, setWidth] = useState(0);
  const [observer, setObserver] = useState();
  const [corners, setCorners] = useState([]);

  // intersection observer
  useEffect(() => {
    if (top == 0 || height == 0) {
      return;
    }
    console.log(height);
    const observer = new IntersectionObserver(
      (entries) => {
        console.log(entries);
      },
      {
        rootMargin: `-${top}px 0px -${height - top - 1}px 0px`,
      }
    );
    setObserver(observer);
    return () => observer.disconnect();
  }, [top, height]);

  // calculates body height and width on resize
  useEffect(() => {
    const onresize = () => {
      setWidth(document.body.clientWidth);
      setHeight(window.innerHeight);
    };
    window.addEventListener("resize", onresize);
    onresize();

    return () => window.removeEventListener("resize", onresize);
  }, []);

  // calculates the height of the header
  const ref = useCallback((node) => {
    if (node) {
      const { bottom } = node.getBoundingClientRect();
      setTop(bottom);
    }
  }, []);

  return (
    <>
      <TopContext.Provider value={top}>
        {top && ReactDOM.createPortal(corners, document.body)}
      </TopContext.Provider>
      <ObserverContext.Provider value={observer}>
        <WidthContext.Provider value={width}>
          {children(ref)}
        </WidthContext.Provider>
      </ObserverContext.Provider>
    </>
  );
}

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
  const width = useContext(WidthContext);
  const [elem1, setElem1] = useState();
  const [elem2, setElem2] = useState();
  const ref1 = calculate(setElem1, width);
  const ref2 = calculate(setElem2, width);

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
