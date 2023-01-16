import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";

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

const isMaintenance = process.env.NEXT_PUBLIC_MAINTENANCE === "1";

function AboutLink() {
  if (isMaintenance) return null;

  return (
    <ActiveLink href="/about">
      {(active) => <a className={active}>About</a>}
    </ActiveLink>
  );
}

const LaraGabathuler = React.forwardRef(function LaraGabathuler({ onClick, href }, ref) {
  return (
    <a href={href} onClick={onClick} ref={ref}>
      Lara <span className={styles.lastName}>Gabathuler</span>
    </a>
  );
});

function Title() {
  if (isMaintenance) {
    return <LaraGabathuler />;
  }
  return (
    <Link href="/" passHref legacyBehavior>
      <LaraGabathuler />
    </Link>
  );
}

export default function Layout({ children }) {
  const currentYear = new Date().getFullYear();

  return (
    <TopProvider>
      {(ref) => (
        <div className={styles.layout}>
          <Cursor />
          <header ref={ref} className={styles.header}>
            <nav>
              <Title />
              <AboutLink />
            </nav>
          </header>
          <main className={styles.children}>{children}</main>
          <footer className={styles.footer}>
            <a className={styles.mail} href="mailto:laragaba@hotmail.ch">
              Mail <Arrow />
            </a>
            <p className={styles.copyright}>
              ©{currentYear} Lara Gabathuler.
              <br className="is-hidden-tablet" /> All rights reserved.
            </p>
          </footer>
        </div>
      )}
    </TopProvider>
  );
}
