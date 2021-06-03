import dynamic from "next/dynamic";

import { MDXRemote } from "next-mdx-remote";

import { getAllProjectIds, getProject } from "../../lib/projects";

export async function getStaticPaths() {
  const projects = await getAllProjectIds();
  const paths = projects.map((id) => {
    return {
      params: {
        id,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  let project = await getProject(params.id);
  return {
    props: project,
  };
}

const defaultComponents = {};
const Lottie = dynamic(() => import("../../components/Lottie"));

export default function Project({
  source,
  summary,
  description,
  componentNames,
}) {
  const components = {
    ...defaultComponents,
    Lottie: componentNames.includes("Lottie") ? Lottie : null,
  };

  return (
    <div>
      <MDXRemote {...description} />
      <MDXRemote {...summary} />
      <MDXRemote {...source} components={components} />
    </div>
  );
}
