import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";

const OrderItemModal = ({ menuItem, addToCart, handleCloseModal }) => {
  const [modal, setModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [mentions, setMentions] = useState("");

  // Open the modal as soon as the component is mounted
  useEffect(() => {
    setModal(true);
  }, []);

  const handleSubmit = () => {
    const orderItem = {
      Quantity: quantity,
      Mentions: mentions,
      MenuItemId: menuItem.id,
      MenuItem: menuItem,
    };

    addToCart(orderItem);
    handleCloseModal();
    setModal(false);
  };

  return (
    <div>
      <Modal isOpen={modal}>
        <ModalHeader>Add {menuItem.name} to Order</ModalHeader>
        <ModalBody>
          <Input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
            min="1"
            placeholder="Quantity"
          />
          <Input
            type="text"
            value={mentions}
            onChange={(e) => setMentions(e.target.value)}
            placeholder="Mentions"
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>
            Add to Order
          </Button>
          <Button color="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default OrderItemModal;
