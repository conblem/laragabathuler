import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import CornerBoss from "../components/CornerBoss";
import Content from "../components/Content";
import { getProjects } from "../lib/projects";
import styles from "../styles/Home.module.scss";

export async function getStaticProps() {
  let projects = await getProjects();
  return {
    props: {
      projects: projects.map(({ data }) => data),
    },
  };
}

function loader({ src, width, quality }) {
  return `/_next/image?url=${src}&w=${width}&q=${quality || 75}`;
}

function Thumbnails({ projects }) {
  const sizes = `(max-width: ${styles.desktop}) 100vw, 50vw`;

  return (
    <CornerBoss>
      {(ref1, ref2) =>
        projects.map(({ id, cover, hover, title }, i) => (
          <Link
            className="column is-half-desktop"
            key={id}
            href={`/projects/${id}`}
          >
            <Content
              hover={hover}
              aspectX={2500}
              aspectY={1441}
              // load cornerboss for first two images
              ref={i == 0 ? ref1 : i == 1 ? ref2 : undefined}
            >
              <Image
                className={styles.image}
                loader={loader}
                alt={title}
                src={cover}
                fill
                sizes={sizes}
                priority={i == 0 || i == 1}
              />
            </Content>
          </Link>
        ))
      }
    </CornerBoss>
  );
}

export default function Home({ projects }) {
  return (
    <div className="columns is-desktop is-multiline">
      <Head>
        <title>laragabathuler</title>
      </Head>
      <Thumbnails projects={projects} />
    </div>
  );
}
