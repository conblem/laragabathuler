import Link from "next/link";
import Head from "next/head";
import dynamic from "next/dynamic";

import NorthEast from "../public/northEast.svg";
import styles from "../styles/Layout.module.scss";

const Cursor = dynamic(() => import("./Cursor"), {
  ssr: false,
});

export default function Layout({ children }) {
  return (
    <div className={styles.layout}>
      <Cursor />
      <Head>
        <meta name="description" content="Lara Gabathuler" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://use.typekit.net/qoh8unn.css"
        ></link>
      </Head>
      <header className={styles.header}>
        <nav>
          <Link href="/">
            <a>Lara Gabathuler</a>
          </Link>
          <Link href="/about">
            <a>About</a>
          </Link>
        </nav>
      </header>
      <div className={styles.children}>{children}</div>
      <footer className={styles.footer}>
        <a className={styles.mail} href="mailto:larataba@gmail.com">
          Mail <NorthEast />
        </a>
        <p className={styles.copyright}>
          ©2021 Lara Gabathuler. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
