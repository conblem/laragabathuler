import NextImage from "next/image";

import Content from "./Content";

export default function Image({ src, full, alt }) {
  const aspect = full
    ? { aspectX: 16, aspectY: 9 }
    : { aspectX: 8, aspectY: 9 };

  const className = full ? "is-full" : "is-half-desktop";

  return (
    <div className={`column ${className}`}>
      <Content {...aspect}>
        <NextImage alt={alt} src={src} layout="fill" objectFit="cover" />
      </Content>
    </div>
  );
}
