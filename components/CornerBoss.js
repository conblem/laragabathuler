import React, { useState, useEffect, useCallback, useContext } from "react";
import ReactDOM from "react-dom";

import useCallbackRef from "../lib/hook";
import styles from "../styles/CornerBoss.module.scss";
import Maske from "../public/maske.svg";

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
        return () => {
          observer.unobserve(node);
        };
      },
      [observer]
    )
  );

  return children(ref);
}

export default function CornerBoss({ children }) {
  const [height, setHeight] = useState(0);
  const [top, setTop] = useState(0);
  const [width, setWidth] = useState(0);
  const [observer, setObserver] = useState();
  const [corners, setCorners] = useState(new Map());

  // intersection observer
  useEffect(() => {
    if (top == 0 || height == 0) {
      return;
    }
    const onobserve = (entries) =>
      setCorners((prevCorners) => {
        const corners = new Map(prevCorners);
        return entries.reduce((acc, { target, isIntersecting }) => {
          acc.set(target, isIntersecting);
          return acc;
        }, corners);
      });
    const observer = new IntersectionObserver(onobserve, {
      rootMargin: `-${top}px 0px -${height - top - 10}px 0px`,
    });
    setObserver(observer);
    return () => observer.disconnect();
  }, [top, height, width]);

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

  const cornersComponents = [...corners.entries()]
    .filter(([_, isIntersecting]) => isIntersecting)
    .map(([target], i) => <Corners key={i} top={top} target={target} />);

  console.log(cornersComponents);

  return (
    <>
      {top && ReactDOM.createPortal(cornersComponents, document.body)}
      <ObserverContext.Provider value={observer}>
        {children(ref)}
      </ObserverContext.Provider>
    </>
  );
}

function Corners({ top, target }) {
  const { left, right } = target.getBoundingClientRect();

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
