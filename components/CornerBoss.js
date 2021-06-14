import { useState, useEffect, useRef, useCallback } from "react";
import ReactDOM from "react-dom";

import Maske from "../public/maske.svg";

const calculate = (setElem, width) =>
  useCallback(
    (node) => {
      if (!node) {
        return;
      }
      const { left, right } = node.getBoundingRect();
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
    const observer = new ResizeObserver(onresize);
    observer.observe(document.body);
    onresize();

    return () => observer.disconnect();
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
        style={{
          transform: `transform: translateX(${left}px) rotate(90deg) translateY(100px)`,
          width: 15,
          height: 15,
        }}
      />
      <Maske
        style={{
          transform: `transform: translateX(${
            right - 15
          }px) rotate(180deg) translateY(100px)`,
          width: 15,
          height: 15,
        }}
      />
    </>
  );
}
