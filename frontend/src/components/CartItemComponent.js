import { Row, Col, ListGroup, Form } from "react-bootstrap";
import RemoveFromCartComponent from "./RemoveFromCartComponent";

import React from "react";

const CartItemComponent = ({
  item,
  removeFromCartHandler = false,
  orderCreated = false,
  changeCount = false,
}) => {


  return (
    <>
      <ListGroup.Item className="mt-1">
        <Row>
          <Col md={1}>
            <div className="">
              {/* Image */}
              <img
                crossOrigin="anonymous"
                src={item.image ? item.image.path ?? null : null}

                className="w-100 img_hovf"
                alt="s"
              />
              {/* Image */}
            </div>
          </Col>
          <Col md={6}>
            <a href={`/product-details/${item.productID}`}>
              <p className="" style={{color:"#1E4881"}}>
                <strong className="text-uppercase">{item.name}</strong>
              </p>
            </a>
          </Col>
          <Col md={2}>
            <p className="m-0">Item: <span className="fw-bold">{item.cartProducts[0].attrs}</span></p>
            <p className="m-0">Unit Price: $<span className="fw-bold">{item.cartProducts[0].price}</span></p>
            {/*  */}
          </Col>
          <Col md={2}>
            <Form.Control
              type="number"
              min={1}
              className="form-control"
              value={item.cartProducts[0].quantity}
              onChange={changeCount ? (e) => changeCount(item.cartProducts[0]._id, e.target.value) : undefined} disabled={orderCreated}
            />
          </Col>
          {/* delete button trash */}
          <Col md={1}>
            <RemoveFromCartComponent
              orderCreated={orderCreated}
              productID={item.cartProducts[0]._id}
              quantity={item.quantity}
              price={item.price}
              removeFromCartHandler={removeFromCartHandler ? removeFromCartHandler : undefined}
            />
          </Col>
        </Row>
      </ListGroup.Item>
    </>
  );
};

export default CartItemComponent;
