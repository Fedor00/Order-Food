import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import "../../Css/Cart.css";
import useSessionStorage from "../SessionStorage";
import CompleteOrder from "../CompleteOrder";
import { FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";
import { RiShoppingCart2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart, resetValue] = useSessionStorage("cart");
  const [dropdownOpen, setDropdownOpen] = useState([]);
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  const goToRestaurants = () => {
    navigate("/restaurants");
  };
  const toggleModal = () => setModal(!modal);
  useEffect(() => {
    setDropdownOpen(new Array(cart.OrderItems.length).fill(false));
  }, [cart]);

  const toggle = (index) => {
    let newArray = [...dropdownOpen];
    newArray[index] = !newArray[index];
    setDropdownOpen(newArray);
  };
  const [expandedItems, setExpandedItems] = useState([]);
  const handleDropdownOption = (index, option) => {
    setCart((prevCart) => {
      // Deep copy of the prevCart object
      const updatedCart = JSON.parse(JSON.stringify(prevCart));

      // Update the copied state based on the option
      switch (option) {
        case "+":
          updatedCart.OrderItems[index].Quantity++;
          break;
        case "-":
          if (updatedCart.OrderItems[index].Quantity > 1) {
            updatedCart.OrderItems[index].Quantity--;
          }
          break;
        case "Remove":
          updatedCart.OrderItems.splice(index, 1);
          break;
        default:
          console.error("Unknown option:", option);
      }
      if (updatedCart.OrderItems.length === 0) {
        updatedCart.restaurantId = "";
        updatedCart.restaurantName = "";
        updatedCart.totalPrice = 0;
      }
      return updatedCart;
    });
  };

  const toggleItemExpansion = (index) => {
    setExpandedItems((prevExpandedItems) => {
      if (prevExpandedItems.includes(index)) {
        return prevExpandedItems.filter((item) => item !== index);
      } else {
        return [...prevExpandedItems, index];
      }
    });
  };

  return cart.OrderItems.length === 0 ? (
    <div className="big-empty-cart">
      <Button className="order-now-button" onClick={goToRestaurants}>
        ORDER NOW
      </Button>
      <RiShoppingCart2Line className="empty-cart-icon" size={200} />
    </div>
  ) : (
    <div className="cart-container">
      {cart.OrderItems.map((orderItem, index) => (
        <Card key={index} color="dark" inverse>
          <CardHeader
            className="item-dropdown-option"
            onClick={() => toggleItemExpansion(index)}
          >
            {orderItem.MenuItem.name}
            <Dropdown
              isOpen={dropdownOpen[index]}
              toggle={(e) => {
                e.stopPropagation();
                toggle(index);
              }}
            >
              <DropdownToggle caret onClick={(e) => e.stopPropagation()}>
                Options
              </DropdownToggle>
              <DropdownMenu onClick={(e) => e.stopPropagation()}>
                <DropdownItem
                  onClick={() => handleDropdownOption(index, "Remove")}
                >
                  <FaTrashAlt />
                </DropdownItem>
                <DropdownItem onClick={() => handleDropdownOption(index, "-")}>
                  <FaMinus />
                </DropdownItem>
                <DropdownItem onClick={() => handleDropdownOption(index, "+")}>
                  <FaPlus />
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </CardHeader>
          {expandedItems.includes(index) && (
            <CardBody>
              <div>Quantity: {orderItem.Quantity}</div>
              <div>Price: {orderItem.MenuItem.price}</div>
            </CardBody>
          )}
        </Card>
      ))}
      <div className="complete-order-button">
        <Button onClick={toggleModal}>Complete Order</Button>
      </div>
      <CompleteOrder
        modal={modal}
        toggleModal={toggleModal}
        cart={cart}
        resetCart={resetValue}
      />
    </div>
  );
};

export default Cart;
