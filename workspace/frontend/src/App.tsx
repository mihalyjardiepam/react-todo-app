import { Route, Routes } from "react-router";
import { Navbar } from "./components/Navbar/Navbar";
import TodoPage from "./pages/TodoPage/TodoPage";
import { LoginPage } from "./pages/LoginPage/LoginPage";

export function App() {
    return (
        <>
            <Navbar />
            <div className="main-container">
                <Routes>
                    <Route path="/" element={<TodoPage />} />
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
            </div>
        </>
    );
}
