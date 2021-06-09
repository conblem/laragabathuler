import React, { useContext, useCallback, useEffect, useState } from "react";

const Context = React.createContext();

export function MaskProvider({ children }) {
  const [mask, setMask] = useState();
  const ref = useCallback((node) => {
    if (node) {
      setMask(node);
    }
  }, []);
  return (
    <>
      <svg width={0} height={0}>
        <defs>
          <mask ref={ref}>
            <path d="M50,29.5v1161a50,50,0,0,0,50,50H1370a50,50,0,0,1,50,50v130a50,50,0,0,0,50,50H2550V29.5Z" />
          </mask>
        </defs>
      </svg>
      <Context.Provider value={mask}>{children}</Context.Provider>
    </>
  );
}

export function Mask({ children }) {
  const mask = useContext(Context);
  const [url, setUrl] = useState();
  useEffect(() => {
    if (!mask) {
      return;
    }
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 2600 1500");
    svg.innerHTML = mask.innerHTML;
    const str = new XMLSerializer().serializeToString(svg);
    const url = "data:image/svg+xml;charset=utf8," + encodeURIComponent(str);
    setUrl(url);
  });

  return url ? children(url) : null;
}
