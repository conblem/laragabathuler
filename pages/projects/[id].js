import dynamic from "next/dynamic";

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";

import { getAllProjectIds } from "../../lib/projects";

export async function getStaticPaths() {
  const paths = getAllProjectIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  let fileName = path.join(process.cwd(), `content/projects/${params.id}.mdx`);
  let file = fs.readFileSync(fileName);

  let { content, data } = matter(file);

  const componentNames = [/<Lottie/.test(content) ? "Lottie" : null].filter(
    Boolean
  );

  const source = await serialize(content, { scope: data });

  return {
    props: {
      source,
      componentNames,
    },
  };
}

const defaultComponents = {};
const Lottie = dynamic(() => import("../../components/Lottie"));

export default function Project({ source, componentNames }) {
  const components = {
    ...defaultComponents,
    Lottie: componentNames.includes("Lottie") ? Lottie : null,
  };

  return (
    <div>
      <MDXRemote {...source} components={components} />
    </div>
  );
}
