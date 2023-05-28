import axios from "axios";

export const createOrder = async (order) => {
  try {
    const response = await axios.post(
      "https://localhost:7005/api/order/create",
      order,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error("Error creating order");
    }
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};
export async function fetchRestaurantById(id) {
  const response = await axios.get(
    `https://localhost:7005/api/restaurants/${id}`
  );
  return response.data;
}

export async function fetchOrderByCode(code) {
  const response = await axios.get(
    `https://localhost:7005/api/order/unique-code/${code}`
  );
  return response.data;
}
