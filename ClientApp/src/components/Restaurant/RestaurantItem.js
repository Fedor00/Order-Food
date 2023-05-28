import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardTitle,
} from "reactstrap";
import "../../Css/Restaurant.css";

export const MenuItem = ({ menuItem, handleAdd }) => {
  return (
    <Card color="dark" inverse>
      <CardHeader className="card-header-container">
        <CardTitle>{menuItem.name}</CardTitle>
        <Button onClick={() => handleAdd(menuItem)}>Add</Button>
      </CardHeader>
      <CardBody>
        <CardText>{menuItem.description}</CardText>
        <CardText>{menuItem.price}</CardText>
      </CardBody>
    </Card>
  );
};

export default MenuItem;
