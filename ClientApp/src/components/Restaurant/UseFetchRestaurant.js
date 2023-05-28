import { useState, useEffect } from "react";
import axios from "axios";

const useFetchRestaurant = (restaurantId) => {
  const [restaurant, setRestaurant] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7005/api/Restaurants/${restaurantId}`
        );

        setRestaurant(response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchRestaurant();
  }, [restaurantId]);

  return { restaurant, error };
};

export default useFetchRestaurant;
