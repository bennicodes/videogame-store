import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
  } from "react-router-dom";
  // Import pages
  import App from "../App";
  import Cart from "../pages/Cart/Cart";
  import Checkout from "../pages/Checkout/Checkout";
  import Contact from "../pages/Contact/Contact";
  import GameDetails from "../pages/GameDetails/GameDetails";
  import GamesList from "../pages/GamesList/GamesList";
  import Home from "../pages/Home/Home";
  import NotFound from "../pages/NotFound/NotFound";
  import OrderConfirmation from "../pages/OrderConfirmation/OrderConfirmation";
  import Profile from "../pages/Profile/Profile";
  import SignIn from "../pages/SignIn/SignIn";
  import SignUp from "../pages/SignUp/SignUp";
  import VerifyEmail from "../pages/VerifyEmail/VerifyEmail";

  export const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="/games" element={<GamesList />} />
        <Route path="/games/:id" element={<GameDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/*" element={<NotFound />} />
      </Route>
    )
  );
