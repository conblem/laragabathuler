import Head from "next/head";

export default function Maintenance() {
  return (
    <>
      <Head>
        <title>Maintenance</title>
      </Head>
      <div>Maintenance {process.env.NEXT_PUBLIC_MAINTENANCE}</div>
    </>
  );
}
