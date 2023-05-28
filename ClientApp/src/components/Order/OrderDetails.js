import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, CardText, Spinner } from "reactstrap";
import { fetchOrderByCode, fetchRestaurantById } from "../../Api/Api";
import { useParams } from "react-router-dom";
import "../../Css/Restaurant.css";

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const [restaurant, setRestaurant] = useState(null);
  const { code } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const fetchedOrder = await fetchOrderByCode(code);
      setOrder(fetchedOrder);

      // Assuming there's at least one order item
      if (fetchedOrder.orderItems.length > 0) {
        const restaurant = await fetchRestaurantById(
          fetchedOrder.orderItems[0].menuItem.restaurantId
        );
        setRestaurant(restaurant);
      }
    };

    fetchData();
  }, [code]);

  if (!order || !restaurant)
    return (
      <div className="loading-spinner">
        <Spinner cla />
      </div>
    ); // Show loading state
  const totalPrice = order.orderItems.reduce(
    (total, item) => total + item.menuItem.price * item.quantity,
    0
  );
  const transportationFee =
    totalPrice < restaurant.minimumOrder ? restaurant.standardDeliveryPrice : 0;
  const exceededDistance =
    order.distanceInKm > restaurant.standardDeliveryMaxDistance
      ? order.distanceInKm - restaurant.standardDeliveryMaxDistance
      : 0;
  const exceededDistanceFee = exceededDistance * restaurant.extraDeliveryFee;

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Order Details</CardTitle>
        <CardText>Name: {order.customerName}</CardText>
        <CardText>Address: {order.address}</CardText>
        <CardText>Distance: {order.distanceInKm} km</CardText>
        <CardText>Total Price: ${totalPrice.toFixed(2)}</CardText>
        <CardText>Transportation Fee: ${transportationFee.toFixed(2)}</CardText>
        <CardText>
          Exceeded Distance Fee: ${exceededDistanceFee.toFixed(2)}
        </CardText>
      </CardBody>
    </Card>
  );
};

export default OrderDetails;
