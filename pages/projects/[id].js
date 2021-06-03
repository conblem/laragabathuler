import dynamic from "next/dynamic";
import Link from "next/link";

import { MDXRemote } from "next-mdx-remote";

import Thumbnail from "../../components/Thumbnail";
import { getProjectIds, getProject } from "../../lib/projects";

export async function getStaticPaths() {
  const projects = await getProjectIds();
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

const defaultComponents = { Thumbnail };
const Lottie = dynamic(() => import("../../components/Lottie"));

export default function Project({
  source,
  summary,
  description,
  before,
  after,
  componentNames,
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
      <Link href={before}>Before</Link>
      <Link href={after}>After</Link>
    </div>
  );
}
