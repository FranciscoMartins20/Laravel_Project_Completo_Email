
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from "./router.jsx";
import { ContextProvider } from './contexts/ContextProvider.jsx';
import "./index.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <ContextProvider>
    <RouterProvider router={router} />
  </ContextProvider>
);
