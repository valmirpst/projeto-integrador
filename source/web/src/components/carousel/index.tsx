"use client";
/** React */
import { HTMLAttributes, useCallback, useEffect, useRef, useState } from "react";

/** Types */
import { BookType } from "@/@types/book";

/** Components */
import * as Icon from "phosphor-react";
import { Box } from "../ui/box";
import { Text } from "../ui/text";
import CarouselItem from "./corousel-item";

/** Styles */
import { theme } from "@/theme";
import styles from "./carousel.module.css";

/** Libs */
import { cnModules } from "@/lib/cnModules";

type Props = HTMLAttributes<HTMLDivElement> & {
  title: string;
  books: BookType[];
  scrollbarColor?: string;
};

/**
 * Carousel
 *
 * Componente que renderiza um carrossel horizontal de livros com suporte a arrastar com o mouse.
 * Exibe o título da seção e uma lista de livros navegáveis por gestos de mouse (drag).
 *
 * ## Props:
 * @param {string} title - Título exibido acima do carrossel.
 * @param {Book[]} books - Lista de objetos do tipo `Book` a serem exibidos no carrossel.
 *
 * ## Funcionalidades:
 * - Scroll horizontal por clique e arrasto com o mouse.
 * - Calcula automaticamente os "steps" de movimento para o carrossel com base no número de livros.
 * - Bloqueia movimento além dos limites do carrossel.
 *
 * ## Observações:
 * - O evento global `mouseup` é usado para detectar quando o usuário solta o mouse fora do carrossel.
 * - Cada "step" corresponde a dois livros.
 * - Utiliza `window.innerWidth`, portanto só deve ser executado no lado do cliente.
 *
 * @component
 * @example
 * <Carousel title="Livros Populares" books={livros} />
 */
export default function Carousel(props: Props) {
  const { title, books, scrollbarColor = theme.colors.gray200, className, ...rest } = props;

  const [moveActive, setMoveActive] = useState(false);
  const [moveStart, setMoveStart] = useState(0);
  const [moveDistance, setMoveDistance] = useState(0);
  const [position, setPosition] = useState(0);
  const [isTransistionActive, setIsTransistionActive] = useState(true);
  const [steps, setSteps] = useState<number[]>([]);
  const [stepsScrollBar, setStepsScrollBar] = useState<number[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  const carrouselRef = useRef<HTMLDivElement>(null);

  const itemWidth = 240;
  const amountMovement = 1.2;
  const scrollBarWidth = 800 - books.length * 20;

  useEffect(() => {
    const carrousel = carrouselRef.current;
    if (carrousel) {
      /* Calculando steps do carrousel */
      const stepsList = [0];

      const carrouselWidth = carrousel?.scrollWidth;
      const lastStep = (carrouselWidth - carrousel?.clientWidth + 48) * -1;

      for (let i = 2; i <= books.length; i += 2) {
        const value = (i * itemWidth + 40 * i - itemWidth / 2) * -1;
        if (value <= lastStep + 100) break;
        stepsList.push(value);
      }
      stepsList.push(lastStep);
      setSteps(stepsList);

      /* Calculando steps da scrollbar */
      const lastScrollbarStep = carrousel?.clientWidth - scrollBarWidth - 48;

      const stepsScrollBarList = stepsList.map((_, index) => {
        return index * (lastScrollbarStep / (stepsList.length - 1));
      });
      setStepsScrollBar(stepsScrollBarList);
    }
  }, [books.length, scrollBarWidth]);

  const changeStep = useCallback(
    (moved: number) => {
      if (Math.abs(moved) > 40) {
        if (moved > 0 && currentStep < steps.length - 1) {
          setCurrentStep(prev => prev + 1);
          setMoveDistance(steps[currentStep + 1]);
          setPosition(steps[currentStep + 1]);
        } else if (moved < 0 && currentStep > 0) {
          setCurrentStep(prev => prev - 1);
          setMoveDistance(steps[currentStep - 1]);
          setPosition(steps[currentStep - 1]);
        } else {
          setMoveDistance(steps[currentStep]);
        }
      } else {
        setMoveDistance(steps[currentStep]);
      }
    },
    [currentStep, steps]
  );

  function handleMouseDown(event: React.MouseEvent) {
    setMoveActive(true);
    setIsTransistionActive(false);
    setMoveStart(event.clientX);
  }

  const handleMouseUp = useCallback(
    (event: React.MouseEvent) => {
      setMoveActive(false);
      setIsTransistionActive(true);

      changeStep(moveStart - event.clientX);
    },
    [changeStep, , moveStart]
  );

  function handleMouseMove(event: React.MouseEvent) {
    if (!moveActive) return;

    const moved = moveStart - event.clientX;
    const distance = position ? position + moved * -amountMovement : moved * -amountMovement;

    setMoveDistance(distance);
  }

  const classes = cnModules(styles.carouselWrapper, className);

  return (
    <Box ref={carrouselRef} className={classes} {...rest}>
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
          transition: isTransistionActive ? "transform 0.5s" : "",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={moveActive ? handleMouseMove : undefined}
        onMouseUp={handleMouseUp}
        onMouseEnter={event => {
          if (moveActive) {
            handleMouseUp(event);
            setMoveActive(false);
          }
        }}
        onDragStart={e => e.preventDefault()}
      >
        {books.map(book => (
          <CarouselItem
            isbn={book.isbn}
            key={book.isbn}
            src={book.caminho_img || ""}
            title={book.titulo}
            width={itemWidth}
            height={340}
          />
        ))}
      </Box>
      <Box
        className={styles.scroolBar}
        style={{
          transform: `translateX(${stepsScrollBar[currentStep]}px)`,
          width: `${scrollBarWidth / 16}rem`,
          backgroundColor: scrollbarColor,
        }}
      />
    </Box>
  );
}
