import { Outlet } from "react-router-dom";
import styles from "./App.module.css";

function App() {
  return (
    <>
      <nav>Navbar</nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
