import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)



// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import './index.css';
// import App from './App.tsx';
// import { ThemeProvider } from './context/ThemeContext';
// import { RouterProvider } from './router';

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <ThemeProvider>
//       <RouterProvider>
//         <App />
//       </RouterProvider>
//     </ThemeProvider>
//   </StrictMode>
// );
