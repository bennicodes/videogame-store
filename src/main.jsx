import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { AuthProvider } from "./context/authContext.jsx";
import { router } from "./routes/routes.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <AuthProvider router={router} />
  // </StrictMode>,
);
