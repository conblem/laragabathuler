import NextImage from "next/image";

import Content from "./Content";

export default function Image({ src, full, alt }) {
  const aspect = full
    ? { aspectX: 2500, aspectY: 1441 }
    : { aspectX: 1250, aspectY: 1485 };

  const className = full ? "is-full" : "is-half-desktop";

  return (
    <div className={`column ${className}`}>
      <Content {...aspect}>
        <NextImage
          alt={alt}
          src={src}
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </Content>
    </div>
  );
}
