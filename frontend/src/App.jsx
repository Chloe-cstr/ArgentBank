import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './pages/Home/Home';
import Signin from "./pages/Signin/Signin";

const router = createBrowserRouter(
  [
    { path: "/", element: <Home /> }, 
    { path : "/signin", element: <Signin />}
  ],
  {
    future: {
      v7_relativeSplatPath: true, // Enables relative paths in nested routes
      v7_fetcherPersist: true,   // Retains fetcher state during navigation
      v7_normalizeFormMethod: true, // Normalizes form methods (e.g., POST or GET)
      v7_partialHydration: true, // Supports partial hydration for server-side rendering
      v7_skipActionErrorRevalidation: true, // Prevents revalidation when action errors occur
    },
  }
);

function App() {
  return (
    <RouterProvider
      future={{ v7_startTransition: true }} // Enables React's startTransition API
      router={router}
    />
  );
}

export default App;