import { Route, Routes } from "react-router";
import { Navbar } from "./components/Navbar/Navbar";
import TodoPage from "./pages/TodoPage/TodoPage";
import { SnackbarProvider } from "notistack";
import { lazy, useEffect } from "react";

const LoginSignupPage = lazy(() => import("./pages/LoginSignupPage/LoginSignupPage"));

export function App() {
    useEffect(() => {}, []);

    return (
        <>
            <Navbar />
            <SnackbarProvider hideIconVariant anchorOrigin={{ horizontal: "center", vertical: "bottom" }}>
                <div className="main-container">
                    <Routes>
                        <Route path="/" element={<TodoPage />} />
                        <Route path="/login" element={<LoginSignupPage />} />
                        <Route path="/signup" element={<LoginSignupPage signup />} />
                    </Routes>
                </div>
            </SnackbarProvider>
        </>
    );
}
