import styles from "./Thumbnail.module.scss";
import Content from "./Content";

export default function Thumbnail({ src, full }) {
  return (
    <Content full={full}>
      <img class={styles.image} src={src} />
    </Content>
  );
}
