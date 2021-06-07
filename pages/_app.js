import dynamic from "next/dynamic";
import React from "react";

import "../styles/globals.scss";
import Layout from "../components/Layout";

const ChildContext = React.createContext("AnimateSharedLayout");

const AnimateSharedLayout = dynamic(
  () =>
    import("../components/Motion").then(({ Motion, Cursor }) => () => (
      <Motion>
        <Cursor />
        <ChildContext.Consumer>{(children) => children}</ChildContext.Consumer>
      </Motion>
    )),
  {
    loading: () => (
      <ChildContext.Consumer>{(children) => children}</ChildContext.Consumer>
    ),
    ssr: false,
  }
);

const LazyAnimateSharedLayout = ({ children }) => {
  return process.browser ? (
    <ChildContext.Provider value={children}>
      <AnimateSharedLayout />
    </ChildContext.Provider>
  ) : (
    children
  );
};

function MyApp({ Component, pageProps }) {
  return (
    <LazyAnimateSharedLayout>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </LazyAnimateSharedLayout>
  );
}

export default MyApp;
