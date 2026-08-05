import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// THIS IS THE MAIN ENTRY POINT OF A REACT APP
// TARGET THE INDEX.HTML ROOT AND CALLS A FUNCTION RENDER, EVERYTHING HAPPENS HERE
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
