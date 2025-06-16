import { cnModules } from "@/lib/cnModules";
import Image, { ImageProps } from "next/image";
import styles from "./img.module.css";

type Props = ImageProps;

export default function Img(props: Props) {
  const { src, width, height, alt, className, ...rest } = props;

  const classes = cnModules(styles.img, className);

  return <Image className={classes} src={src} width={width} height={height} alt={alt} {...rest} />;
}
