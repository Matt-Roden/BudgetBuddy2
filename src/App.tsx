import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import BudgetForm from "./routes/BudgetForm/BudgetForm";
import BudgetsDisplay from "./routes/BudgetsDisplay";
import HomePage from "./routes/HomePage/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/create-budget",
    element: <BudgetForm />,
  },
  {
    path: "/budgets",
    element: <BudgetsDisplay />,
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
