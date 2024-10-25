import Counter from "./Counter/Counter.jsx";
import Timer from "./Timer/Timer.jsx";
import Add from "./Add/Add.jsx";
import Temperature from "./Temperatures/Temperatures.jsx";

import "./components.css";
function Components() {
  return (
    <div className="App-container">
      <h1 className="apptext">React Components</h1>
      <div className="container">
        <div className="top">
          <Counter name="D.va" />
          <Add aValue={4} bValue={5} />
          <Timer />
        </div>
        <div className="bottom">
          <Temperature />
        </div>
      </div>
    </div>
  );
}

export default Components;
