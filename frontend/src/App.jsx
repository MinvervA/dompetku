import { useEffect } from "react";
import "./App.css";
import { useAuthStore } from "./store/authStore";

function App() {
  const initialize = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    initialize();
  }, []);
  return (
    <>
      <div className="text-4xl font-bold">Hallo dunia</div>
    </>
  );
}

export default App;
