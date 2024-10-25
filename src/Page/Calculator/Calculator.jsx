import React, { useState } from "react";
import './Calulator.css'


const Calculator = () => {
  const [displayValue, setDisplayValue] = useState("");
  const [supDisplayValue, setSupDisplayValue] = useState("");
  const [num1, setNum1] = useState(undefined);
  const [num2, setNum2] = useState(undefined);
  const [action, setAction] = useState(undefined);
  const [lastOperator, setLastOperator] = useState(undefined);

  // Helper to format numbers with commas
  const formatNumber = (number) => {
    const parts = number.split(".");
    let integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts[1] ? `${integerPart}.${parts[1]}` : integerPart;
  };

  // Update the display value
  const updateDisplay = (value) => {
    setDisplayValue(formatNumber(value));
  };

  // Handle numeric and decimal input
  const handleNumberInput = (value) => {
    // Break repeat on number input
    setNum2(undefined); // Reset num2 to break repeat
    setLastOperator(undefined); // Reset the last operator

    setDisplayValue((prev) => {
      let newValue = prev + value;

      // Limit the integer part to 9 digits
      if (newValue.replace(/[^0-9]/g, "").length > 9) {
        return prev;
      }

      return formatNumber(newValue);
    });
  };

  // Handle operator input
  const handleOperator = (op) => {
    // Break repeat on operator input
    setNum2(undefined); // Reset num2 to break repeat
    setLastOperator(undefined); // Reset the last operator

    if (displayValue === "" && num1 !== undefined) {
      setAction(op);
      setSupDisplayValue(`${num1} ${op}`);
      return;
    }

    if (num1 === undefined) {
      setNum1(displayValue.replace(/,/g, ""));
    } else if (displayValue !== "") {
      calculate();
      setNum1(displayValue.replace(/,/g, ""));
    }

    setAction(op);
    setDisplayValue("");
    setSupDisplayValue(`${num1 || displayValue} ${op}`);
  };

  // Perform calculation
  const calculate = (repeat = false) => {
    if (!action || (!num1 && !repeat) || (!displayValue && !repeat)) return;

    let num1Parsed = parseFloat(num1.replace(/,/g, ""));
    let num2Parsed = parseFloat(displayValue.replace(/,/g, ""));

    if (repeat && num2 !== undefined) {
      // For repeated `=` presses, reuse the stored num2 and action
      num2Parsed = num2;
      num1Parsed = parseFloat(displayValue.replace(/,/g, ""));
    } else {
      setNum2(num2Parsed); // Save num2 for repeated calculations
    }

    let result;
    switch (action) {
      case "+":
        result = num1Parsed + num2Parsed;
        break;
      case "-":
        result = num1Parsed - num2Parsed;
        break;
      case "*":
        result = num1Parsed * num2Parsed;
        break;
      case "/":
        result = num1Parsed / num2Parsed;
        break;
      default:
        return;
    }

    setDisplayValue(formatNumber(result.toString()));
    setSupDisplayValue(`${num1} ${action} ${num2Parsed} =`);
    setNum1(result.toString()); // Store the result as num1 for the next calculation
    setAction(action); // Keep the same action for repeated `=` presses
  };

  // Clear the display
  const clearAll = () => {
    setDisplayValue("");
    setSupDisplayValue("");
    setNum1(undefined);
    setNum2(undefined);
    setAction(undefined);
  };

  // Handle delete
  const deleteLastChar = () => {
    setDisplayValue((prev) => prev.slice(0, -1));
  };

  return (
    <main className="calculator-container">
      <div className="calculator">
        <div className="display">
          <input
            type="text"
            className="calc-display"
            value={displayValue}
            disabled
          />
          <h2 className="sup-calc-display">{supDisplayValue}</h2>
        </div>
        <div className="button">
          <div className="action percent">%</div>
          <div className="action" onClick={() => setDisplayValue("")}>
            CE
          </div>
          <div className="red action" onClick={clearAll}>
            C
          </div>
          <div className="red action" onClick={deleteLastChar}>
            Del
          </div>

          <div className="action" onClick={() => handleOperator("/")}>
            &#247;
          </div>
          <div className="action" onClick={() => handleNumberInput("7")}>
            7
          </div>
          <div className="action" onClick={() => handleNumberInput("8")}>
            8
          </div>
          <div className="action" onClick={() => handleNumberInput("9")}>
            9
          </div>
          <div className="action" onClick={() => handleOperator("*")}>
            &#215;
          </div>

          <div className="action" onClick={() => handleNumberInput("4")}>
            4
          </div>
          <div className="action" onClick={() => handleNumberInput("5")}>
            5
          </div>
          <div className="action" onClick={() => handleNumberInput("6")}>
            6
          </div>
          <div className="action" onClick={() => handleOperator("+")}>
            &#43;
          </div>

          <div className="action" onClick={() => handleNumberInput("1")}>
            1
          </div>
          <div className="action" onClick={() => handleNumberInput("2")}>
            2
          </div>
          <div className="action" onClick={() => handleNumberInput("3")}>
            3
          </div>
          <div className="action" onClick={() => handleOperator("-")}>
            &#8722;
          </div>

          <div className="action" onClick={() => handleNumberInput("0")}>
            0
          </div>
          <div className="action" onClick={() => handleNumberInput(".")}>
            .
          </div>
          <div className="red action" onClick={() => calculate(true)}>
            &#61;
          </div>
        </div>
      </div>
    </main>
  );
};

export default Calculator;
