import Link from "next/link";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { TopProvider } from "../components/CornerBoss";
import Arrow from "../public/arrow.svg";
import styles from "../styles/Layout.module.scss";

const Cursor = dynamic(() => import("./Cursor"), {
  ssr: false,
});

function ActiveLink({ href, children, ...props }) {
  const { asPath } = useRouter();

  const className = asPath == href ? styles.active : undefined;
  return (
    <Link href={href} {...props}>
      {children(className)}
    </Link>
  );
}

export default function Layout({ children }) {
  return (
    <TopProvider>
      {(ref) => (
        <div className={styles.layout}>
          <Cursor />
          <Head>
            <meta name="description" content="Lara Gabathuler" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <header ref={ref} className={styles.header}>
            <nav>
              <Link href="/">
                <a>
                  Lara <span className={styles.lastName}>Gabathuler</span>
                </a>
              </Link>
              <ActiveLink href="/about">
                {(active) => <a className={active}>About</a>}
              </ActiveLink>
            </nav>
          </header>
          <main className={styles.children}>{children}</main>
          <footer className={styles.footer}>
            <a className={styles.mail} href="mailto:laragaba@hotmail.ch">
              Mail <Arrow />
            </a>
            <p className={styles.copyright}>
              ©2021 Lara Gabathuler. All rights reserved.
            </p>
          </footer>
        </div>
      )}
    </TopProvider>
  );
}
