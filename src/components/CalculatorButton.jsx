import React from "react";

function CalculatorButton(props) {

  function handleClick() {
    props.onClick(props.value)
  }

  return <button onClick={handleClick}>{props.value}</button>
}

export default CalculatorButton;
