import { useState } from "react";
import Home from "./scenes/Home-page";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="app">
        <Home />
      </div>
    </>
  );
}

export default App;
