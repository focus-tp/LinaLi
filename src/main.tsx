import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    createRoot(rootElement).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  } catch (error) {
    console.error("Ошибка при рендеринге приложения:", error);
    rootElement.innerHTML = "<h1>Произошла ошибка при загрузке сайта.</h1>";
  }
} else {
  console.error("Не найден элемент с id='root'");
}