import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css"
import AppContent from "./App.tsx";

console.log("Main.tsx is executing!");

const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error("Root element not found!");
} else {
  console.log("Root element found, mounting...");
  createRoot(rootElement).render(
    <StrictMode>
      <AppContent />
    </StrictMode>
  );
}
