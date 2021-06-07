import { AnimateSharedLayout, LazyMotion, domAnimation } from "framer-motion";
export { default as Cursor } from "./Cursor";

export function Motion({ children }) {
  return (
    <LazyMotion features={domAnimation}>
      <AnimateSharedLayout>{children}</AnimateSharedLayout>
    </LazyMotion>
  );
}
