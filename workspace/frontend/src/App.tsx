import { Route, Routes } from "react-router";
import { Navbar } from "./components/Navbar/Navbar";
import TodoPage from "./pages/TodoPage/TodoPage";
import { SnackbarProvider } from "notistack";
import { LoginSignupPage } from "./pages/LoginSignupPage/LoginSignupPage";
import { useAppDispatch } from "./store";
import { fetchUser } from "./features/auth/authSlice";
import { useEffect } from "react";

export function App() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchUser());
    }, []);

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
