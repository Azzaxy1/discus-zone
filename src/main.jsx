import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <App />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            fontWeight: "bold",
            fontFamily: "sans-serif",
          },
        }}
      />
    </Router>
  </React.StrictMode>
);

