import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";
import ThemeSwitcher from "./components/ThemeSwitcher";

import React, { useState } from "react";

const btnValues = [
  [7, 8, 9, "del"],
  [4, 5, 6, "+"],
  [1, 2, 3, "-"],
  [".", 0, "/", "x"],
  ["reset", "="],
];

const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num) => num.toString().replace(/\s/g, "");

const App = () => {
  let [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
    class: "dark",
  });

  const handleChangeTheme = () => {
    if (calc.class === "dark") {
      setCalc({
        ...calc,
        class: "light",
      });
    } else if (calc.class === "light") {
      setCalc({ ...calc, class: "violet" });
    } else {
      setCalc({ ...calc, class: "dark" });
    }
  };

  const componentDidUpdate = () => {
    const body = document.querySelector("body");

    if (body.className === "dark") {
      body.classList.remove("dark");
    } else if (body.className === "light") {
      body.classList.remove("light");
    } else if (body.className === "violet") {
      body.classList.remove("violet");
    }

    body.classList.add(calc.class);
  };

  const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    if (removeSpaces(calc.num).length < 16) {
      setCalc({
        ...calc,
        num:
          calc.num === 0 && value === "0"
            ? "0"
            : removeSpaces(calc.num) % 1 === 0
            ? toLocaleString(Number(removeSpaces(calc.num + value)))
            : toLocaleString(calc.num + value),
        res: !calc.sign ? 0 : calc.res,
      });
    }
  };

  const commaClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    });
  };

  const signClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,
    });
  };

  const equalsClickHandler = () => {
    if (calc.sign && calc.num) {
      const math = (a, b, sign) =>
        sign === "+"
          ? a + b
          : sign === "-"
          ? a - b
          : sign === "x"
          ? a * b
          : a / b;

      setCalc({
        ...calc,
        res:
          calc.num === "0" && calc.sign === "/"
            ? "Can't divide with 0"
            : toLocaleString(
                math(
                  Number(removeSpaces(calc.res)),
                  Number(removeSpaces(calc.num)),
                  calc.sign
                )
              ),
        sign: "",
        num: 0,
      });
    }
  };

  const deleteClickHandler = () => {
    if (calc.num) {
      setCalc({
        ...calc,
        num: calc.num.slice(0, -1),
      });
    }
  };

  const resetClickHandler = () => {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      res: 0,
    });
  };

  const className = calc.class;

  componentDidUpdate();

  return (
    <Wrapper>
      <ThemeSwitcher onClick={handleChangeTheme} className={className} />
      <Screen value={calc.num ? calc.num : calc.res} className={className} />
      <ButtonBox className={className}>
        {btnValues.flat().map((btn, i) => {
          return (
            <Button
              key={i}
              className={
                (btn === "="
                  ? "equals "
                  : btn === "del"
                  ? "delete "
                  : btn === "reset"
                  ? "reset "
                  : "") + className
              }
              value={btn}
              onClick={
                btn === "del"
                  ? deleteClickHandler
                  : btn === "reset"
                  ? resetClickHandler
                  : btn === "="
                  ? equalsClickHandler
                  : btn === "/" || btn === "x" || btn === "-" || btn === "+"
                  ? signClickHandler
                  : btn === "."
                  ? commaClickHandler
                  : numClickHandler
              }
            />
          );
        })}
      </ButtonBox>
    </Wrapper>
  );
};

export default App;
