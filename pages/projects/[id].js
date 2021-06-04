import dynamic from "next/dynamic";
import Link from "next/link";
import Head from "next/head";

import { MDXRemote } from "next-mdx-remote";

import styles from "../../styles/Projects.module.scss";
import Image from "../../components/Image";
import { getProjectIds, getProject } from "../../lib/projects";
import East from "../../public/east.svg";
import West from "../../public/west.svg";

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

const defaultComponents = { Image };
const Lottie = dynamic(() => import("../../components/Lottie"));

export default function Project({
  source,
  summary,
  description,
  before,
  after,
  componentNames,
  title,
}) {
  const components = {
    ...defaultComponents,
    Lottie: componentNames.includes("Lottie") ? Lottie : null,
  };

  return (
    <div className="columns is-multiline is-desktop">
      <Head>
        <title>{title}</title>
      </Head>
      <div className="column is-half-desktop">
        <MDXRemote {...description} />
      </div>
      <div className="column is-half-desktop">
        <MDXRemote {...summary} />
      </div>
      <MDXRemote {...source} components={components} />

      <div className={`${styles.beforeafter} column is-full`}>
        <Link href={`/projects/${before}`}>
          <a>
            <West /> Previous Project
          </a>
        </Link>
        <Link href={`/projects/${after}`}>
          <a>
            Next Project <East />
          </a>
        </Link>
      </div>
    </div>
  );
}
