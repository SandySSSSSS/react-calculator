import React, { useState, Fragment } from "react";
import CalculatorButton from "./CalculatorButton";

function Calculator() {
  const [prevValue, setPrevValue] = useState(null);
  const [nextValue, setNextValue] = useState("0");
  const [op, setOp] = useState(null);
  const [history, setHistory] = useState([]);
  const [visible, setVisible] = useState(false);

  const calculatorOperations = {
    "/": (firstValue, secondValue) => firstValue / secondValue,
    "*": (firstValue, secondValue) => firstValue * secondValue,
    "+": (firstValue, secondValue) => firstValue + secondValue,
    "-": (firstValue, secondValue) => firstValue - secondValue,
    "=": (firstValue, secondValue) => secondValue
  };

  function performOperation() {
    let result = calculatorOperations[op](
      parseFloat(prevValue),
      parseFloat(nextValue)
    );
    setNextValue(String(result));
    const inputHistory = prevValue + op + nextValue + "=" + result + "\n";
    setHistory((prevValue) => {
      return [...prevValue, inputHistory];
    });
    setPrevValue(null);
    setOp(null);
  }

  function handleNum(num) {
    setNextValue(nextValue === "0" ? String(num) : nextValue + num);
  }

  function percentage() {
    let result = parseFloat(nextValue) / 100;
    setNextValue(String(result));
    const inputHistory = "%" + "=" + result + "\n";
    setHistory((prevValue) => {
      return [...prevValue, inputHistory];
    });
  }

  function clearData() {
    setNextValue("0");
    setPrevValue(null);
    setOp(null);
    setHistory([]);
  }

  function handleOperation(value) {
    if (Number.isInteger(value)) {
      handleNum(parseInt(value, 10));
    } else if (value in calculatorOperations) {
      if (op === null) {
        setOp(value);
        setPrevValue(nextValue);
        setNextValue("");
      }
      if (op) {
        setOp(value);
      }
      if (prevValue && op && nextValue) {
        performOperation();
      }
    } else if (value === "C") {
      clearData();
    } else if (value === "%") {
      percentage();
    }
  }

  function handleHistory() {
    setVisible(!visible);
  }

  return (
    <Fragment>
      <div className="calculator">
        <div className="calculator-result">
          <div className="result">{nextValue}</div>
        </div>
        <div className="calculator-keypad">
          <div className="keypad-functions">
            <CalculatorButton onClick={handleHistory} value="H" />
            <CalculatorButton onClick={handleOperation} value="C" />
            <CalculatorButton onClick={handleOperation} value="%" />
          </div>
          <div className="keypad-operators">
            <CalculatorButton onClick={handleOperation} value="+" />
            <CalculatorButton onClick={handleOperation} value="-" />
            <CalculatorButton onClick={handleOperation} value="*" />
            <CalculatorButton onClick={handleOperation} value="/" />
            <CalculatorButton onClick={handleOperation} value="=" />
          </div>
          <div className="keypad-numbers">
            <CalculatorButton onClick={handleOperation} value={9} />
            <CalculatorButton onClick={handleOperation} value={8} />
            <CalculatorButton onClick={handleOperation} value={7} />
            <CalculatorButton onClick={handleOperation} value={6} />
            <CalculatorButton onClick={handleOperation} value={5} />
            <CalculatorButton onClick={handleOperation} value={4} />
            <CalculatorButton onClick={handleOperation} value={3} />
            <CalculatorButton onClick={handleOperation} value={2} />
            <CalculatorButton onClick={handleOperation} value={1} />
          </div>
          <div className="keypad-zero">
            <CalculatorButton onClick={handleOperation} value={0} />
          </div>
        </div>
      </div>
      <div className="history">
        <p className={visible ? "element-visible" : "element-hide"}>
          {history}
        </p>
      </div>
    </Fragment>
  );
}

export default Calculator;
