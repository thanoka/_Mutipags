import { useState } from "react";

import "./Variable.css";

function Variable({name, value, setValue, type}) {


  return (
    <div className="val">
      <h3>{name || "Counter"}</h3>
      <div className="bottom">
        <button className="btn btn-danger" onClick={() => setValue(value - 1)}>
          -
        </button>
        <span>{type && type === 'int'? value : value.toFixed(2)}</span>
        <button className="btn btn-success" onClick={() => setValue(value + 1)}>
          +
        </button>
      </div>
    </div>
  );
}

export default Variable;

