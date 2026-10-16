
  import { createRoot } from "react-dom/client";
  import App from "./01_app/App.tsx";
  import AppThemeProvider from "./01_app/AppThemeProvider";
  import { MotionProvider } from "./03_shared/04_motion/MotionProvider";
  import "./04_styles/index.css";

  createRoot(document.getElementById("root")!).render(
    <AppThemeProvider><MotionProvider><App /></MotionProvider></AppThemeProvider>,
  );

