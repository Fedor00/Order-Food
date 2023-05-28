import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { toast } from "react-toastify";
import CodeModal from "./UniqueCode";
import useFetchRestaurant from "./Restaurant/UseFetchRestaurant";
import { createOrder } from "../Api/Api";

const CompleteOrder = ({ modal, toggleModal, cart, resetCart }) => {
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  const [distanceInKm, setDistanceInKm] = useState("");
  const [orderMentions, setOrderMentions] = useState("");
  const [isModalCodeOpen, setIsModalCodeOpen] = useState(false);
  const [uniqueCode, setUniqueCode] = useState("XYZ123");

  const { restaurant, error: restaurantError } = useFetchRestaurant(
    cart.restaurantId
  );

  const toggleModalCode = () => setIsModalCodeOpen(!isModalCodeOpen);

  const isFormValid =
    customerName !== "" && address !== "" && distanceInKm !== "";

  const handleSubmit = async () => {
    if (!isFormValid) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const order = {
      CustomerName: customerName,
      Address: address,
      DistanceInKm: parseInt(distanceInKm),
      OrderMentions: orderMentions,
      OrderItems: cart.OrderItems,
    };

    if (
      restaurant &&
      restaurant.minimumOrder &&
      calculateTotalPrice() < restaurant.minimumOrder
    ) {
      const confirmed = window.confirm(
        `The minimum order amount for ${restaurant.name} is $${restaurant.minimumOrder}. Do you still want to proceed?`
      );

      if (!confirmed) {
        return;
      }
    }

    try {
      const responseData = await createOrder(order);

      setUniqueCode(responseData);
      setIsModalCodeOpen(true);

      if (!responseData) {
        toast.error("There was a problem submitting your order.");
      }
      resetCart();
      toggleModal();
    } catch (error) {
      console.error("There was an error!", error);
      toast.error("There was an error submitting your order.");
    }
  };

  const calculateTotalPrice = () => {
    try {
      // Calculate the sum of prices of items in the cart
      return cart.OrderItems.reduce(
        (total, item) => total + (item.Quantity * item.MenuItem.price || 0),
        0
      );
    } catch (error) {
      console.error("Error calculating total price:", error);
      return 0;
    }
  };

  if (restaurantError) {
    return <div>Error fetching restaurant: {restaurantError.message}</div>;
  }

  return (
    <div className="complete-order-button">
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Complete Order</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="customerName">Name</Label>
              <Input
                type="text"
                name="customerName"
                id="customerName"
                placeholder="Name"
                required
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="address">Address</Label>
              <Input
                type="text"
                name="address"
                id="address"
                placeholder="Address"
                required
                onChange={(e) => setAddress(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="distanceInKm">Distance in km</Label>
              <Input
                type="number"
                name="distanceInKm"
                id="distanceInKm"
                placeholder="Distance in km"
                required
                onChange={(e) => setDistanceInKm(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="orderMentions">Order mentions</Label>
              <Input
                type="textarea"
                name="orderMentions"
                id="orderMentions"
                onChange={(e) => setOrderMentions(e.target.value)}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>
            Submit Order
          </Button>{" "}
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <CodeModal
        isOpen={isModalCodeOpen}
        toggle={toggleModalCode}
        uniqueCode={uniqueCode}
      />
    </div>
  );
};

export default CompleteOrder;
