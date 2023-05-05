import {
  Container,
  Row,
  Col,
  Form,
  Alert,
  ListGroup,
  InputGroup,
  Button,
  Modal,
} from "react-bootstrap";
import CartItemComponent from "../../../components/CartItemComponent";

import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import emailjs from "@emailjs/browser";

import { useDispatch } from "react-redux";
import QuoeteManagementApproval from "../../../components/SendEmail/QuoeteManagementApproval";

const UserCartDetailsPageComponent = ({
  cartItems,
  itemsCount,
  cartSubtotal,
  userInfo,
  editQuantity,
  removeFromCart,
  reduxDispatch,
  getUser,
  createOrder,
  getAllOrder,
  getOrdersInvNo,
  emptyCart,
}) => {
  /* popup window */
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [userAddress, setUserAddress] = useState(false);
  const [missingAddress, setMissingAddress] = useState("");
  /* 这个支付方式，useState要用下面的下拉里面的一个，设置为默认，随后的语句可以修改 */
  const [paymentMethod, setPaymentMethod] = useState("Invoice");
  const [purchaseNumber, setPurchaseNumber] = useState("");

  const [largestInvoice, setLargestInvoice] = useState(0);

  const [userNameEmail, setUserNameEmail] = useState();
  const [managerEmail, setManagerEmail] = useState();

  /* const dispatch = useDispatch(); */

  const navigate = useNavigate();

  const changeCount = (id, qty) => {
    reduxDispatch(editQuantity(id, qty));
  };

  const removeFromCartHandler = (productID, quantity, price) => {
    reduxDispatch(removeFromCart(productID, quantity, price));
  };

  // 找出最大的invoice number，然后就可以+1了，开心
  useEffect(() => {
    getOrdersInvNo().then((orders) => {
      // Extract the invoiceNumber of each order
      const invoiceNumbers = orders.map((order) => order.invoiceNumber);
      // Find the largest invoiceNumber
      // console.log('我是里面的, INV数组',invoiceNumbers);
      // console.log('我是里面的, ODER',orders);

      const newInvoiceNumbers = invoiceNumbers.map((item) => {
        return item.slice(3);
      });
      // console.log('我是没有SLR的',newInvoiceNumbers);

      setLargestInvoice(Math.max(...newInvoiceNumbers));
    });
  }, []);

  // console.log('我是外面的,最大的',largestInvoice);

  useEffect(() => {
    /* 下方的一系列判定，若有一个不符合，则get your quote的按钮就不可用 */
    getUser()
      .then((data) => {
        setUserNameEmail({
          email: data.email,
          name: data.name,
        });
        if (
          !data.location ||
          !data.city ||
          !data.postCode ||
          !data.state ||
          !data.phone
        ) {
          setMissingAddress(
            " In order to make order, fill out your profile with correct address, city etc."
          );
        } else {
          /* 这些是再下方的userAddress.location之类的信息，读取地址的。 */
          setUserAddress({
            location: data.location,
            city: data.city,
            postCode: data.postCode,
            state: data.state,
            phone: data.phone,
          });
          setMissingAddress(false);
        }
      })
      .catch((er) =>
        console.log(
          er.response.data.message ? er.response.data.message : er.response.data
        )
      );
  }, [userInfo._id]);

  const quotePriceData = {
    ...userNameEmail,
    cartItems,
    cartSubtotal,
    managerEmail,
  };

  const orderHandler = () => {
    const orderData = {
      orderTotal: {
        itemsCount: itemsCount,
        cartSubtotal: (cartSubtotal * 1.1).toFixed(2),
      },
      cartItems: cartItems.map((item) => {
        return {
          productID: item.productID,
          name: item.name,
          image: { path: item.image ? item.image.path ?? null : null },
          cartProducts: [
            {
              attrs: item.cartProducts[0].attrs,
              barcode: item.cartProducts[0].barcode,
              count: item.cartProducts[0].count,
              ctlsku: item.cartProducts[0].ctlsku,
              price: item.cartProducts[0].price,
              quantity: item.cartProducts[0].quantity,
              sales: item.cartProducts[0].sales ?? null,
              slrsku: item.cartProducts[0].slrsku,
              suppliersku: item.cartProducts[0].suppliersku,
              _id: item.cartProducts[0]._id,
            },
          ],
          /* quantity: item.quantity,
          price: item.price,
          count: item.count,
          ctlsku: item.ctlsku */
        };
      }),
      paymentMethod: paymentMethod,
      purchaseNumber: purchaseNumber,
      invoiceNumber: "SLR000" + (largestInvoice + 1),
    };

    createOrder(orderData)
      .then((data) => {
        if (data) {
          navigate("/user/order-details/" + data._id);
          reduxDispatch(emptyCart());
        }
      })
      .catch((err) => console.log(err));
  };

  /* 修改支付方式的vale */
  const choosePayment = (e) => {
    setPaymentMethod(e.target.value);
  };

  const enterPurchaseNum = (e) => {
    setPurchaseNumber(e.target.value);
    setButtonDisabled(false);
  };

  const enterManagerEmail = (e) => {
    setManagerEmail(e.target.value);
  };

  const removeAllItems = () => {
    reduxDispatch(emptyCart());
    window.location.href = "/product-list";
  };

  console.log("USERcartItems", cartItems);

  return (
    <>
      <Container>
        <Row className="mt-4">
          <h1>CART DETAILS</h1>

          <Col md={9}>
            {/*             <Row style={{ display: "none" }}>
              <Col md={5}>
                <h3>SHIPPING</h3>
                <b>Name</b>: {userInfo.name} {userInfo.lastName} <br />
                <b>Site Location</b>: {userAddress.location} <br />
                <b>Phone</b>: {userAddress.phone} <br />
                <b>Address</b>: {userAddress.city} {userAddress.state}{" "}
                {userAddress.postCode}
              </Col>
              <Col md={5}>
                <h3>PAYMENT METHOD</h3>
                <Form.Select onChange={choosePayment} disabled>
                  <option value="Invoice">Invoice</option>
                  <option value="PayPal">PayPal</option>
                </Form.Select>
              </Col>
              <Row>
                <Col md={5}>
                  <Alert className="mt-3 lh-1 h-50 pt-2" variant="danger">
                    Not Delivered.
                    {missingAddress}
                  </Alert>
                </Col>
                &nbsp;&nbsp;&nbsp;
                <Col md={5}>
                  <Alert className="mt-3 lh-1 h-50 pt-2 pl-2" variant="danger">
                    Not Paid Yet
                  </Alert>
                </Col>
              </Row>
            </Row> */}
            <ListGroup variant="flush">
              {cartItems.map((item, idx) => (
                <CartItemComponent
                  item={item}
                  key={idx}
                  changeCount={changeCount}
                  removeFromCartHandler={removeFromCartHandler}
                />
              ))}
            </ListGroup>
          </Col>
          <Col md={3}>
            <ListGroup hidden={cartItems.length === 0}>
              <ListGroup.Item>
                <h5 className="m-0">Need Management Approval?</h5>
              </ListGroup.Item>
              <ListGroup.Item controlId="validationMangerEmail">
                <Form.Control
                  onChange={enterManagerEmail}
                  type="string"
                  name="MangerEmail"
                  placeholder="Your Manager's Email"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please Enter Your Manager's Email.{" "}
                </Form.Control.Feedback>
              </ListGroup.Item>

              <ListGroup.Item>
                <div className="d-grid gap-2">
                  <QuoeteManagementApproval quotePriceData={quotePriceData} />
                </div>
              </ListGroup.Item>
            </ListGroup>
            <br />
            <ListGroup className="">
              <ListGroup.Item>
                <h4 className="m-0">Order Summary</h4>
              </ListGroup.Item>
              <ListGroup.Item>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <p className="p-0 m-0">
                    Total: <span className="fw-bold">{cartItems.length}</span>{" "}
                    {cartItems.length === 1 ? "Product" : "Products"}
                  </p>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={removeAllItems}
                    className="p-0 ps-1 pe-1"
                  >
                    Empty Cart <i className="bi bi-trash" />
                  </Button>
                </div>
              </ListGroup.Item>

              <ListGroup.Item>
                Item Price:{" "}
                <span className="fw-bold">
                  {" "}
                  $ {cartSubtotal.toFixed(2).toLocaleString()}
                </span>
              </ListGroup.Item>
              <ListGroup.Item>
                Total GST{" "}
                <span className="fw-bold">
                  $ {(cartSubtotal * 0.1).toFixed(2).toLocaleString()}
                </span>
              </ListGroup.Item>
              <ListGroup.Item>
                Invoice Amount:{" "}
                <span className="fw-bold text-danger">
                  $ {(cartSubtotal * 1.1).toFixed(2).toLocaleString()}
                </span>
              </ListGroup.Item>

              <ListGroup.Item controlId="validationSLRPurchaseNum">
                <Form.Label className="fw-bold text-danger">
                  PO Number
                </Form.Label>
                <Form.Control
                  onChange={enterPurchaseNum}
                  type="string"
                  name="SLRPurchaseNumber"
                  placeholder="PO Number"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please Enter Your Purchase Number.{" "}
                </Form.Control.Feedback>
                {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
              </ListGroup.Item>

              <ListGroup.Item>
                <div className="d-grid gap-2">
                  <Button
                    size="sm"
                    onClick={orderHandler}
                    variant="danger"
                    type="button"
                    disabled={buttonDisabled}
                  >
                    Comfirm Order
                  </Button>
                </div>
              </ListGroup.Item>
            </ListGroup>
            <br />
            {/* ******* shipping information ******* */}
            <ListGroup>
              <ListGroup.Item>
                <h5 className="m-0">Shipping Information</h5>
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Name</b>: {userInfo.name} {userInfo.lastName}
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Site</b>: {userAddress.location}
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Phone</b>: {userAddress.phone}
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Address</b>: {userAddress.city} {userAddress.state}{" "}
                {userAddress.postCode}
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserCartDetailsPageComponent;

/* 
Welcome to our software beta test.

*/
