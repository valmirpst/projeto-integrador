"use client";
import { Book } from "@/@types/boook";
import { Text } from "../ui/text";
import * as Icon from "phosphor-react";
import styles from "./carousel.module.css";
import { Box } from "../ui/box";
import Img from "../ui/img";
import { useEffect, useRef, useState } from "react";

type Props = {
  title: string;
  books: Book[];
};

export default function Carousel(props: Props) {
  const { title, books } = props;

  const [moveActive, setMoveActive] = useState(false);
  const [moveStart, setMoveStart] = useState(0);
  const [moveDistance, setMoveDistance] = useState(0);
  const [position, setPosition] = useState(0);
  const [isTransistionActive, setIsTransistionActive] = useState(true);

  const carrouselRef = useRef<HTMLDivElement>(null);

  const imageWidth = 240;

  function handleMouseDown(event: React.MouseEvent) {
    setMoveActive(true);
    setIsTransistionActive(false);
    setMoveStart(event.clientX);
  }

  function handleMouseUp() {
    setMoveActive(false);
    setIsTransistionActive(true);

    const carrouselWidth = imageWidth * books.length + 40 * (books.length - 1);
    const maxMoveDistance =
      (carrouselWidth - (window.innerWidth - 300 - 48 - 48)) * -1;

    if (moveDistance > 0) {
      setMoveDistance(0);
      setPosition(0);
    } else if (moveDistance < maxMoveDistance) {
      setMoveDistance(maxMoveDistance);
      setPosition(maxMoveDistance);
    } else {
      setPosition(moveDistance);
    }
  }

  function handleMouseMove(event: React.MouseEvent) {
    if (!moveActive) return;

    const moved = moveStart - event.clientX;
    const distance = position ? position + moved * -1.2 : moved * -1.2;

    setMoveDistance(distance);
  }

  useEffect(() => {
    addEventListener("mouseup", handleMouseUp);

    return () => removeEventListener("mouseup", handleMouseUp);
  });

  return (
    <Box ref={carrouselRef} className={styles.carouselWrapper}>
      <Box className={styles.carouselTitle}>
        <Text size="xl" weight="medium">
          {title}
        </Text>
        <Icon.CaretDoubleRight />
      </Box>

      <Box
        className={styles.carousel}
        style={{
          transform: `translateX(${moveDistance}px)`,
          transition: isTransistionActive ? "0.5s" : "",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={moveActive ? handleMouseMove : undefined}
        onDragStart={(e) => e.preventDefault()}
      >
        {books.map((book) => (
          <Box key={book.isbn} className={styles.bookCard}>
            <Img
              className={styles.bookImage}
              style={{ minWidth: `${imageWidth / 16}rem` }}
              src={book.caminho_img}
              alt="Livro do Crepúsculo"
              width={240}
              height={340}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
