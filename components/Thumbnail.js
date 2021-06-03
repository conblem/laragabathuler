import styles from "../styles/Thumbnail.module.scss";
import Content from "./Content";

export default function Thumbnail({ src, full, hover }) {
  return (
    <Content full={full} hover={hover}>
      <img className={styles.image} src={src} />
    </Content>
  );
}
