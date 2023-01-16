import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

import styles from "../../styles/Projects.module.scss";
import MDX from "../../components/MDX";
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

const RIGHT_ARROW = 39;
const LEFT_ARROW = 37;

export default function Project({ before, after, title, ...mdxProps }) {
  const router = useRouter();
  useEffect(() => {
    const onKeyPress = ({ keyCode }) => {
      if (keyCode === LEFT_ARROW) {
        router.push(`/projects/${before}`);
      }
      if (keyCode === RIGHT_ARROW) {
        router.push(`/projects/${after}`);
      }
    };
    document.addEventListener("keyup", onKeyPress);
    return () => document.removeEventListener("keyup", onKeyPress);
  });

  return (
    <MDX {...mdxProps}>
      <Head>
        <title>{title}</title>
      </Head>
      <div className={`${styles.beforeafter} column is-full`}>
        <Link href={`/projects/${before}`}>
          ← Previous <span className="is-hidden-mobile">Project</span>
        </Link>
        <Link href={`/projects/${after}`}>
          Next <span className="is-hidden-mobile">Project</span> →
        </Link>
      </div>
    </MDX>
  );
}
