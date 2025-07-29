import { useState } from "react";
import Roulette from "./components/Roulette.jsx";
function App() {
  const [lots, setLots] = useState([{ lot: "", color: "#FFFFFF", votes: 1 }]);

  return (
    <>
      <Roulette lots={lots} setLots={setLots} />
    </>
  );
}

export default App;
