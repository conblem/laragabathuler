import Head from "next/head";
import Image from "../components/Image";

import styles from "../styles/Maintenance.module.scss";

export default function Maintenance() {
  return (
    <>
      <Head>
        <title>Maintenance</title>
      </Head>
      <div className={styles.container}>
        <Image
          spinner={false}
          alt="Site is under maintenance"
          full={true}
          src="/maintenance.png"
          quality={75}
        ></Image>
        <h2 className={styles.title}>Maintenance</h2>
      </div>
    </>
  );
}
