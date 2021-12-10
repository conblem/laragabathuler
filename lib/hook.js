import { useRef, useCallback, useEffect, useState } from "react";

// if rawCallback returns a cleanup function, it will be called when the hook is unmounted
// and when rawCallback changes
export function useCallbackWithCleanup(rawCallback, deps) {
  // ref to safe the cleanup function to of rawCallback
  const cleanupRef = useRef(null);

  const cleanup = () => {
    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }
  };

  // wrapped callback
  const callback = useCallback(
    (node) => {
      // run cleanup code eagerly to make sure it is run before the new cleanup codes gets set
      // on the first run this will do nothing because cleanupRef.current is null
      cleanup();

      if (node) {
        // node changed we run the callback and save the cleanup function
        cleanupRef.current = rawCallback(node);
      }
    },
    [rawCallback, ...deps]
  );

  // run cleanup once at the end when component unmounts
  useEffect(() => cleanup, []);

  return callback;
}

export function useWindowSize() {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
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

  return [width, height];
}
