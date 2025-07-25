import { Box } from "@/components/ui/box";
import Img from "@/components/ui/img";
import { theme } from "@/theme";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styles from "./carousel-item.module.css";

type Props = {
  src: string;
  title: string;
  width: number;
  height: number;
  isbn: string;
};

export default function CarouselItem(props: Props) {
  const { src, title, width, height, isbn } = props;

  const router = useRouter();

  const [showMenu, setShowMenu] = useState(false);
  const [mouseDownPosition, setMouseDownPosition] = useState<number | null>(null);
  const [mouseEnterTimeout, setMouseEnterTimeout] = useState<NodeJS.Timeout | null>(null);
  const [mouseLeaveTimeout, setMouseLeaveTimeout] = useState<NodeJS.Timeout | null>(null);

  function onMouseEnter() {
    if (mouseLeaveTimeout) clearTimeout(mouseLeaveTimeout);
    const timeout = setTimeout(() => {
      setShowMenu(true);
    }, 2000);

    setMouseEnterTimeout(timeout);
  }

  function onMouseLeave() {
    if (mouseEnterTimeout) clearTimeout(mouseEnterTimeout);
    const timeout = setTimeout(() => {
      setShowMenu(false);
    }, 1000);

    setMouseLeaveTimeout(timeout);
  }

  function onMouseDown(event: React.MouseEvent) {
    if (mouseEnterTimeout) clearTimeout(mouseEnterTimeout);
    setMouseDownPosition(event.clientX);
  }

  function onMouseUp(event: React.MouseEvent) {
    const position = event.clientX;

    if (mouseDownPosition && Math.abs(mouseDownPosition - position) > 40) return;
    setShowMenu(true);
  }

  return (
    <Box
      className={styles.carouselItemBase}
      style={{ minWidth: `${width / 16}rem` }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      <Box
        className={styles.carouselItemMenu}
        style={{
          width: width,
          height: height,
          backgroundColor: theme.colors.primary900 + "cc",
          opacity: showMenu ? 1 : 0,
        }}
      >
        <Box
          onClick={() => router.push(`/livro/${isbn}`)}
          className={styles.carouselItemMenuItem}
          style={{ backgroundColor: theme.colors.primary300 + "08" }}
        >
          Mais detalhes
        </Box>
        <Box className={styles.carouselItemMenuItem} style={{ backgroundColor: theme.colors.primary300 + "08" }}>
          Reservar
        </Box>
        <Box className={styles.carouselItemMenuItem} style={{ backgroundColor: theme.colors.primary300 + "08" }}>
          Marcar como favorito
        </Box>
      </Box>

      <Img src={"https://m.media-amazon.com/images/I/61pt9lG-PvL.jpg"} alt={title} width={width} height={height} />
    </Box>
  );
}
