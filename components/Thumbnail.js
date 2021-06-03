import styles from "./Thumbnail.module.css";
import Content from "./Content";

export default function Thumbnail({ src }) {
  return (
    <Content>
      <img class={styles.image} src={src} />
    </Content>
  );
}
