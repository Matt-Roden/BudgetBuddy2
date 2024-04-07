import React from "react";
import Navbar from "../components/NavBar/Navbar";
import { budgets } from "../data/budgets";
import { Link } from "react-router-dom";
import CreateBudgetButton from "../components/CreateBudgetButton/CreateBudgetButton";

const BudgetsDisplay = () => {
  const data = budgets;
  return (
    <>
      <Navbar />
      <CreateBudgetButton />
      {data.map((item) => {
        return (
          <Link to={`/budget/${item.id}`}>
            <div key={item.id}>{item.name}</div>
          </Link>
        );
      })}
    </>
  );
};

export default BudgetsDisplay;
