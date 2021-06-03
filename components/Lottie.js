import { useEffect, useState } from "react";
import LottieUpstream from "lottie-react";

import Content from "./Content";

export default function Lottie({ src, full }) {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      let res = await fetch(`/${src}`);
      let data = await res.json();
      setData(data);
    };

    fetchData();
  }, []);

  return (
    <Content full={full}>
      <LottieUpstream animationData={data} />
    </Content>
  );
}
