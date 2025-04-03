import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux"; // Importer Provider de react-redux
import { store } from "./app/store"; // Importer le store Redux
import Home from './pages/Home/Home';
import Signin from "./pages/Signin/Signin";
import User from "./pages/User/User";

const router = createBrowserRouter(
  [
    { path: "/", element: <Home /> }, 
    { path: "/signin", element: <Signin /> },
    { path: "/user", element: <User />}
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

function App() {
  return (
    <Provider store={store}> 
      <RouterProvider
        future={{ v7_startTransition: true }}
        router={router}
      />
    </Provider>
  );
}

export default App;
