import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {App} from './App.tsx'
import "./index.scss";
import TodoServiceProvider from './context/TodoServiceContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <TodoServiceProvider>
        <App />
      </TodoServiceProvider>
  </StrictMode>,
)
