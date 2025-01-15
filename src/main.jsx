import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import OkamiRoutes from "./routes/OkamiRoutes";
import { ThemeProvider } from "@mui/material";
import theme from "./utils/theme";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <OkamiRoutes />
    </ThemeProvider>
  </React.StrictMode>
);
