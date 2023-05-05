import { Row, Col, ListGroup, Form } from "react-bootstrap";

import React from "react";
import "./CartItemDropDown.css"
import CartItemDropDownRemoveFromCart from "./CartItemDropDownRemoveFromCart";

const CartItemDropDown = ({
  item,
  removeFromCartHandler = false,
  orderCreated = false,
  changeCount = false,
}) => {


  return (
    <>
      <ListGroup.Item className="mt-1">
        <Row className="cartDropDownComponent_container">
          <Col md={1}>
            <div className="">
              {/* Image */}
              <img
                crossOrigin="anonymous"
                src={item.image ? item.image.path ?? null : null}
                className="w-100"
                alt="s"
              />
              {/* Image */}
            </div>
          </Col>
          <Col md={5}>
            <a href={`/product-details/${item.productID}`}>
              <p className="" style={{color:"#1E4881"}}>
                <span className="text-uppercase">{item.name}</span>
              </p>
            </a>
          </Col>
          <Col md={3}>
            <p className="m-0 cart_product_attr">Item: <span className="cart_product_detail">{item.cartProducts[0].attrs}</span></p>
            <p className="m-0 cart_product_attr">Each: $<span className="cart_product_detail">{item.cartProducts[0].price}</span></p>
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
          <Col md={1} className="remove_from_cart_btn">
            <CartItemDropDownRemoveFromCart
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

export default CartItemDropDown;
