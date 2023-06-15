import { Row, Col, ListGroup, Form, Table } from "react-bootstrap";
import RemoveFromOrderComponent from "./RemoveFromOrderComponent";
import { useState, useEffect } from "react";

import React from "react";

const CartItemForOrderComponent = ({
  item,
  id,
  removeFromOrderHandler = false,
  orderCreated = false,
  changeCount = false,
  edit,
}) => {
  const [qty, setQty] = useState(item.cartProducts[0].suppliedQty);

  useEffect(() => {
    if (item.saleunit) {
      setQty(item.cartProducts[0].suppliedQty);
    }
  }, [item]);

  const handleBlur = (e) => {
    const newValue = Math.round(e.target.value / item.saleunit) * item.saleunit;
    setQty(newValue);
    if (changeCount) {
      changeCount(orderId, item.cartProducts[0]._id, newValue);
    }
  };

  const orderId = id;

  const handleChange = (e) => {
    setQty(e.target.value);
    if (changeCount) {
      changeCount(orderId, item.cartProducts[0]._id, e.target.value);
    }
  };

  const backOrderQuantity = item.cartProducts[0].quantity - qty;

  // console.log("order Cart", id);


  return (
    <>
      <tbody>
        <tr>
          <td style={{ width: "7%" }}>
            <img
              crossOrigin="anonymous"
              src={item.image ? item.image ?? null : null}
              className="w-100 img_hovf"
              alt="s"
            />
          </td>
          <td style={{ width: "30%" }}>
            <a href={`/product-details/${item.productId}`}>
              <strong className="text-uppercase" style={{ color: "#1E4881" }}>
                {item.name}
              </strong>
            </a>
          </td>
          <td style={{ width: "10%" }}>
            <p className="m-0">
              Item:{" "}
              <span className="fw-bold">{item.cartProducts[0].attrs}</span>
            </p>
            <p className="m-0">
              Unit Price: $
              <span className="fw-bold">
                {item.cartProducts[0].price.toLocaleString()}
              </span>
            </p>
          </td>
          <td style={{ width: "10%" }}>
            <Form.Control
              type="number"
              min={item.saleunit}
              step={item.saleunit}
              className="form-control"
              value={item.cartProducts[0].quantity}
              disabled={orderCreated}
            />
          </td>
          <td style={{ width: "10%" }}>
            <Form.Control
              type="number"
              min="0"
              step={item.saleunit}
              onBlur={handleBlur}
              className="form-control pe-0"
              value={edit === false ? item.cartProducts[0].suppliedQty : qty}
              // value={qty}
              onChange={handleChange}
              disabled={edit === false}
            />
          </td>
          <td style={{ width: "10%" }}>
            <Form.Control
              type="number"
              className="form-control pe-0"
              value={
                edit === false
                  ? item.cartProducts[0].backOrder
                  : backOrderQuantity
              }
              disabled={orderCreated}
            />
          </td>
          <td style={{ width: "20%" }}>
            <RemoveFromOrderComponent
              orderId={orderId}
              itemId={item.cartProducts[0]._id}
              removeFromOrderHandler={
                removeFromOrderHandler ? removeFromOrderHandler : undefined
              }
            />
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default CartItemForOrderComponent;
