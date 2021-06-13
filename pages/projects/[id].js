import Link from "next/link";
import Head from "next/head";

import styles from "../../styles/Projects.module.scss";
import MDX from "../../components/MDX";
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

export default function Project({ before, after, title, ...mdxProps }) {
  return (
    <MDX {...mdxProps}>
      <Head>
        <title>{title}</title>
      </Head>
      <div className={`${styles.beforeafter} column is-full`}>
        <Link href={`/projects/${before}`}>
          <a>
            ← Previous <span className={styles.project}>Project</span>
          </a>
        </Link>
        <Link href={`/projects/${after}`}>
          <a>
            Next <span className={styles.project}>Project</span> →
          </a>
        </Link>
      </div>
    </MDX>
  );
}
