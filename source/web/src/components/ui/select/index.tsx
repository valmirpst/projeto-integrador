import { useEffect, useRef, useState } from "react";
import styles from "./select.module.css";
import { CaretLeft, Check } from "phosphor-react";
import { theme } from "@/theme";

type Props = {
  options: string[];
  label: string;
  width?: number;
};

export default function Select(props: Props) {
  const { options, label, width } = props;

  const [selectActive, setSelectActive] = useState(false);
  const [activeValues, setActiveValues] = useState<string[]>([]);

  const selectRef = useRef<HTMLDivElement>(null);

  function handleActiveValues(option: string) {
    if (activeValues.includes(option)) {
      setActiveValues(activeValues.filter((item) => item !== option));
    } else {
      setActiveValues([...activeValues, option]);
    }
  }

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        event.target instanceof Node &&
        selectRef.current?.contains(event.target)
      )
        return;

      setSelectActive(false);
    }

    document.addEventListener("click", handleOutsideClick);

    return () => removeEventListener("click", handleOutsideClick);
  }, [selectActive]);

  return (
    <div ref={selectRef} className={styles.selectWrapper}>
      <div style={{ width: `${width ? width / 16 : 16}rem` }}>
        <label
          className={
            selectActive ? styles.selectLabelActive : styles.selectLabel
          }
        >
          {label}
        </label>
        <div
          className={styles.selectInput}
          style={{
            borderColor: selectActive
              ? theme.colors.primary300
              : theme.colors.gray300,
          }}
          onClick={() => setSelectActive(!selectActive)}
        >
          {activeValues.length ? (
            <span className={styles.selectTextContainer}>
              <p
                className={styles.selectText}
                style={{ width: `${width ? (width - 16 * 5) / 16 : 10}rem` }}
              >
                {activeValues.join(", ")}
              </p>
              <span>({activeValues.length})</span>
            </span>
          ) : null}
          <CaretLeft
            className={styles.selectArrowIcon}
            style={{ transform: selectActive ? "rotate(-90deg)" : "" }}
          />
        </div>
        {selectActive && (
          <div
            className={`
              ${styles.optionsContainer}
            `}
          >
            {options.map((option) => (
              <div
                key={option}
                className={styles.optionItem}
                onClick={() => handleActiveValues(option)}
              >
                <span>{option}</span>
                {activeValues.includes(option) && <Check />}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
