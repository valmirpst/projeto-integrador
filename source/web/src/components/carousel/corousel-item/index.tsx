import Img from "@/components/ui/img";
import styles from "./carousel-item.module.css";
import { Box } from "@/components/ui/box";

type Props = {
  src: string;
  title: string;
  width: number;
  height: number;
};

export default function CarouselItem(props: Props) {
  const { src, title, width, height } = props;

  return (
    <Box>
      <Img
        className={styles.carouselItemImage}
        style={{ minWidth: `${width / 16}rem` }}
        src={src}
        alt={title}
        width={width}
        height={height}
      />
    </Box>
  );
}
