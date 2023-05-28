import React, { useEffect, useState } from "react";
import MenuItem from "./RestaurantItem";
import { Button, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { useLocation, useNavigate } from "react-router-dom";
import useSessionStorage from "../SessionStorage";
import OrderItemModal from "../Order/OrderItemModal";
import { FaShoppingCart } from "react-icons/fa";

const RestaurantItems = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const location = useLocation();
  const [cart, setCart] = useSessionStorage("cart");
  const [selectedItem, setSelectedItem] = useState(null);
  // @ts-ignore
  const restaurant = location.state.data;
  useEffect(() => {
    fetchRestaurants(restaurant.id, currentPage, pageSize);
  }, [currentPage, pageSize]);

  const fetchRestaurants = async (restaurantId, pageNr, pageSize) => {
    try {
      const response = await fetch(
        `http://localhost:5218/api/item/restaurants/${restaurantId}/${pageNr}/${pageSize}`
      );
      if (response.ok) {
        const data = await response.json();
        setItems(data);
        setTotalPages(data.totalPages);
      } else {
        console.error("Error fetching restaurants:", response.status);
      }
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleAdd = (item) => {
    setSelectedItem(item);
  };
  const addToCart = (orderItem) => {
    if (!cart.restaurantId)
      setCart((currentCart) => {
        currentCart.restaurantId = restaurant.id;
        currentCart.restaurantName = restaurant.name;
        return { ...currentCart };
      });
    if (cart.restaurantId === restaurant.id)
      setCart((currentCart) => {
        // Add the new item to the cart
        currentCart.OrderItems.push(orderItem);

        // Calculate the new total price
        currentCart.totalPrice += orderItem.Quantity * orderItem.MenuItem.price;

        // Return the updated cart
        return { ...currentCart };
      });
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };
  return (
    restaurant && (
      <div>
        <h2>{restaurant.name}</h2>

        {items.length > 0 && (
          <div>
            {items.map((item) => (
              <MenuItem key={item.id} handleAdd={handleAdd} menuItem={item} />
            ))}
            <Pagination>
              <PaginationItem disabled={currentPage === 1}>
                <PaginationLink
                  previous
                  onClick={() => handlePageClick(currentPage - 1)}
                />
              </PaginationItem>
              {[...Array(totalPages)].map((_, index) => (
                <PaginationItem key={index} active={index + 1 === currentPage}>
                  <PaginationLink onClick={() => handlePageClick(index + 1)}>
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem disabled={currentPage === totalPages}>
                <PaginationLink
                  next
                  onClick={() => handlePageClick(currentPage + 1)}
                />
              </PaginationItem>
            </Pagination>
          </div>
        )}
        {selectedItem && (
          <OrderItemModal
            menuItem={selectedItem}
            addToCart={addToCart}
            handleCloseModal={handleCloseModal}
          />
        )}
      </div>
    )
  );
};

export default RestaurantItems;
