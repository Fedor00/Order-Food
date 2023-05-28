import React, { useState, useEffect } from "react";
import { Button, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import "../../Css/Restaurant.css";
import Restaurant from "./Restaurant";

export const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Or any other default page size
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetch(
      `https://localhost:7005/api/restaurants/page/${currentPage}/${pageSize}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setRestaurants(data);
        setTotalPages(data.totalPages);
      })
      .catch((error) => console.error("There was an error!", error));
  }, [currentPage, pageSize]);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const createPagination = () => {
    let pagination = [];
    for (let page = 1; page <= totalPages; page++) {
      pagination.push(
        <PaginationItem active={page === currentPage} key={page}>
          <PaginationLink onClick={() => handlePageClick(page)}>
            {page}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return pagination;
  };

  return (
    <div>
      {restaurants.map((restaurant) => (
        <Restaurant key={restaurant.id} restaurant={restaurant} />
      ))}
      <Pagination>{createPagination()}</Pagination>
    </div>
  );
};

export default Restaurants;
