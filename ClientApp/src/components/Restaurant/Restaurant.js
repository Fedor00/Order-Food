import React from "react";
import { Button, Card, CardHeader } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../Css/Restaurant.css";
import { MdShoppingCart } from "react-icons/md";
import useSessionStorage from "../SessionStorage";

export const Restaurant = ({ restaurant }) => {
  const navigate = useNavigate();
  const [cart] = useSessionStorage("cart");

  const parseTime = (timeStr) => {
    const [hoursStr, minutesStr] = timeStr.split(":");
    let hours = parseInt(hoursStr);
    let minutes = minutesStr ? parseInt(minutesStr) : 0;

    // Convert to 24-hour format
    if (timeStr.endsWith("PM") && hours !== 12) {
      hours = (hours % 12) + 12;
    }
    if (timeStr.endsWith("AM") && hours === 12) {
      hours = 0;
    }

    // Return total minutes
    return hours * 60 + minutes;
  };

  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const currentMinutes = currentHour * 60 + currentTime.getMinutes();

  const [startTimeStr, endTimeStr] = restaurant.schedule.split(" - ");
  const startTime = parseTime(startTimeStr);
  const endTime = parseTime(endTimeStr);

  let isAvailable;
  if (startTime < endTime) {
    // Normal case: start and end on the same day
    isAvailable = currentMinutes >= startTime && currentMinutes < endTime;
  } else {
    // Special case: end time is on the next day (after midnight)
    isAvailable = currentMinutes >= startTime || currentMinutes < endTime;
  }

  const handle = () => {
    if (isAvailable) {
      navigate("/restaurant-items", { state: { data: restaurant } });
    } else {
      const availabilityHours = `${startTimeStr} to ${endTimeStr}`;
      toast.error(
        `This restaurant is currently unavailable. Available hours: ${availabilityHours}`,
        { autoClose: 5000 }
      );
    }
  };

  const handleClick = () => {
    if (
      (cart && Number(cart.restaurantId) === 0) ||
      Number(cart.restaurantId) === Number(restaurant.id)
    ) {
      handle();
    } else {
      toast.error(
        `Please complete your order at ${
          cart && cart.restaurantName
            ? cart.restaurantName
            : "another restaurant"
        } before adding items from ${restaurant.name}.`,
        { autoClose: 5000 }
      );
    }
  };

  return (
    <Card color="dark" inverse>
      <CardHeader className="card-header-container">
        <div>{restaurant.name}</div>
        <Button onClick={handleClick} disabled={!isAvailable}>
          <MdShoppingCart />
        </Button>
      </CardHeader>
    </Card>
  );
};

export default Restaurant;
