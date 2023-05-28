import React, { useState } from "react";
import { Button, Input } from "reactstrap";
import "../Css/Home.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Home = () => {
  const navigate = useNavigate();
  const [uniqueCode, setUniqueCode] = useState("");

  const goToRestaurants = () => {
    navigate("/restaurants");
  };

  const checkOrder = () => {
    uniqueCode
      ? navigate(`/orderdetails/${uniqueCode}`)
      : toast.error("Invalid Code.");
  };

  const handleInputChange = (e) => {
    setUniqueCode(e.target.value);
  };

  return (
    <div className="home-container">
      <div className="check-order-form">
        <Input
          placeholder="Unique code"
          value={uniqueCode}
          onChange={handleInputChange}
        />
        <Button className="check-order" onClick={checkOrder}>
          Check Order
        </Button>
        <Button className="redirect-to-restaurants" onClick={goToRestaurants}>
          Restaurants
        </Button>
      </div>
    </div>
  );
};

export default Home;
