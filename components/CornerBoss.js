import React, { useState, useEffect, useCallback, useContext } from "react";
import ReactDOM from "react-dom";

import { useCallbackWithCleanup, useWindowSize } from "../lib/hook";
import styles from "../styles/CornerBoss.module.scss";
import Maske from "../public/maske.svg";

const ObserverContext = React.createContext();

export function IntersectionRef({ children }) {
  const observer = useContext(ObserverContext);
  const ref = useCallbackWithCleanup(
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
  );

  return children(ref);
}

export default function CornerBoss({ children }) {
  const [top, setTop] = useState(0);
  const [width, height] = useWindowSize();
  const [observer, setObserver] = useState();
  const [corners, setCorners] = useState(new Map());

  // intersection observer
  useEffect(() => {
    if (!top || !height) {
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

  // passed to children so we can receive the header
  // calculates the height of the header
  const headerRef = useCallback((node) => {
    if (node) {
      const { bottom } = node.getBoundingClientRect();
      setTop(bottom);
    }
  }, []);

  return (
    <>
      <Corners top={top} corners={corners} />
      <ObserverContext.Provider value={observer}>
        {children(headerRef)}
      </ObserverContext.Provider>
    </>
  );
}

function Corners({ top, corners }) {
  const cornerComponents = [...corners.entries()]
    .filter(([_, isIntersecting]) => isIntersecting)
    .map(([target], i) => (
      <LeftRightCorner key={i} top={top} target={target} />
    ));

  if (top) {
    return ReactDOM.createPortal(cornerComponents, document.body);
  }
  return null;
}

function LeftRightCorner({ top, target }) {
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
