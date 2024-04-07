import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/NavBar/Navbar";
import { budgets } from "../data/budgets";

const SingleBudgetDetails = () => {
  const { id } = useParams();
  const budget = budgets.find((budget) => budget.id === id);
  return (
    <>
      <Navbar />
      <div>SingleBudgetDetails</div>
      <div>ID: {id}</div>
      <div>Total Savings: ${budget?.totalSavings}</div>
    </>
  );
};

export default SingleBudgetDetails;
