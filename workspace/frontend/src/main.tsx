import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import "./index.scss";
import { store } from "./store.ts";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <Routes>
                    <Route path="/" element={<App />} />
                </Routes>
            </Provider>
        </BrowserRouter>
    </StrictMode>
);
