import dynamic from "next/dynamic";
import React from "react";
import { LazyMotion } from "framer-motion";

import "../styles/globals.scss";
import Layout from "../components/Layout";

const loadFeatures = () => import("../lib/features").then((res) => res.default);

const ChildContext = React.createContext("AnimateSharedLayout");

const delay = (amount) =>
  new Promise((res) => {
    console.log("start delay");
    setTimeout(res, amount);
  });

const AnimateSharedLayout = dynamic(
  () =>
    delay(2000)
      .then(() => import("../lib/animateSharedLayout"))
      .then((res) => res.default)
      .then((AnimateSharedLayout) => () => {
        console.log("loaded animate shared layout");
        return (
          <ChildContext.Consumer>
            {(children) => (
              <AnimateSharedLayout>{children}</AnimateSharedLayout>
            )}
          </ChildContext.Consumer>
        );
      }),
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
    <LazyMotion features={loadFeatures}>
      <LazyAnimateSharedLayout>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </LazyAnimateSharedLayout>
    </LazyMotion>
  );
}

export default MyApp;
