import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import PersonalFinanceTracker from "./components/PersonalFinanceTracker";

function App() {
  return (
    <div className="dark">
      <PersonalFinanceTracker />
    </div>
  );
}

export default App;
