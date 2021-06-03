import Image from "next/image";
import React from "react";
import Content from "./Content";

const Thumbnail = React.forwardRef(
  ({ alt, src, full, hover, onClick, href }, ref) => {
    return (
      <Content
        full={full}
        hover={hover}
        ref={ref}
        onClick={onClick}
        href={href}
      >
        <Image alt={alt} src={src} layout="fill" objectFit="cover" />
      </Content>
    );
  }
);

export default Thumbnail;
