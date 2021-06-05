import { useEffect, useState } from "react";
import LottieUpstream from "lottie-react";

import Content from "./Content";

export default function Lottie({ src, full }) {
  const aspect = full
    ? { aspectX: 16, aspectY: 9 }
    : { aspectX: 8, aspectY: 9 };

  const className = full ? "is-full" : "is-half-desktop";

  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      let res = await fetch(src);
      let data = await res.json();
      setData(data);
    };

    fetchData();
  }, []);

  return (
    <div className={`column ${className}`}>
      <Content {...aspect}>
        <LottieUpstream animationData={data} />
      </Content>
    </div>
  );
}
