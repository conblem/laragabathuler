import dynamic from "next/dynamic";

import { MDXRemote } from "next-mdx-remote";

import Image from "./Image";

const defaultComponents = { Image };
const Lottie = dynamic(() => import("./Lottie"));

export default function Project({
  source,
  summary,
  description,
  componentNames,
  children,
}) {
  const components = {
    ...defaultComponents,
    Lottie: componentNames.includes("Lottie") ? Lottie : null,
  };

  return (
    <div className="columns is-multiline is-desktop">
      <div className="column is-half-desktop">
        <MDXRemote {...description} />
      </div>
      <div className="column is-half-desktop">
        <MDXRemote {...summary} />
      </div>
      <MDXRemote {...source} components={components} />

      {children}
    </div>
  );
}