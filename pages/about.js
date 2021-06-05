import Head from "next/head";

import MDX from "../components/MDX";
import { getAbout } from "../lib/about";

export async function getStaticProps() {
  let about = await getAbout();
  return {
    props: about,
  };
}

export default function About({ title, ...mdxProps }) {
  return (
    <MDX {...mdxProps}>
      <Head>
        <title>{title}</title>
      </Head>
    </MDX>
  );
}
