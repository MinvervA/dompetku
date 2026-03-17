import { useEffect } from "react";
import "./App.css";
import { useAuthStore } from "./store/authStore";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { MainLayout } from "./components/layout/MainLayout";

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
            path="/regist"
            element={!token ? <RegisterPage /> : <Navigate to="/" />}
          />

          <Route element={token ? <MainLayout /> : <Navigate to="/login" />}>
            <Route path="/" element={<div>DASHBOARD</div>} />
            <Route path="/transactions" element={<div>transaction</div>} />
            <Route path="/settings" element={<div>setting</div>} />
          </Route>

          {/* // jika ada route asal */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
