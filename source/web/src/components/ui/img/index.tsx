import Image, { ImageProps } from "next/image";
import styles from "./img.module.css";

type Props = {} & ImageProps;

export default function Img(props: Props) {
  const { src, width, height, alt } = props;
  return (
    <Image
      className={styles.img}
      src={src}
      width={width}
      height={height}
      alt={alt}
    />
  );
}
