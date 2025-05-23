import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/authContext.jsx";
import { CartProvider } from "./context/cartContext.jsx";
import { router } from "./routes/routes.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <AuthProvider>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </AuthProvider>
  // </StrictMode>,
);
