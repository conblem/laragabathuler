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

function loader({ src, quality }) {
  return `/_next/image?url=${src}&w=1200&q=${quality || 75}`;
}

function Thumbnails({ projects }) {
  return (
    <CornerBoss>
      {(ref1, ref2) =>
        projects.map(({ id, cover, hover, title }, i) => (
          <Link key={id} href={`/projects/${id}`}>
            <a className="column is-half-desktop">
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
                  layout="fill"
                  objectFit="cover"
                />
              </Content>
            </a>
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
