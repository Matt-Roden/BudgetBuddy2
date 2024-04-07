import React from "react";
import Navbar from "../../components/NavBar/Navbar";
import CreateBudgetButton from "../../components/CreateBudgetButton/CreateBudgetButton";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <div>Welcome to Budget Buddy! 👋</div>
      <CreateBudgetButton />
    </>
  );
};

export default HomePage;
