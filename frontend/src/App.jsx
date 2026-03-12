import { useEffect } from "react";
import "./App.css";
import { useAuthStore } from "./store/authStore";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";

function App() {
  const { checkAuth, token, isLoading } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={!token ? <LoginPage /> : <Navigate to="/" />}
          />

          <Route
            path="/"
            element={token ? <div>DASHBOARD</div> : <Navigate to="/login" />}
          />

          {/* // jika ada route asal */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
