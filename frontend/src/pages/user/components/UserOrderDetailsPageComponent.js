import {
  Container,
  Row,
  Col,
  Form,
  Alert,
  ListGroup,
  Button,
  Modal,
} from "react-bootstrap";
import CartItemForUserOrderComponent from "../../../components/CartItemForUserOrderComponent";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "./invoicePDF.css";

// import { useReactToPrint } from "react-to-print";
import InvoicePrint from "../../../components/Pdfs/InvoicePrint";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { emptyCart } from "../../../redux/actions/cartActions";
import { useSelector } from "react-redux";

const UserOrderDetailsPageComponent = ({
  userInfo,
  getUser,
  getOrder,
  updateOrderNote,
  loadPayPalScript,
  reduxDispatch,
  reOrdertReduxAction,
}) => {
  const [order, setOrder] = useState();
  const [userAddress, setUserAddress] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("");
  const [purchaseNumber, setPurchaseNumber] = useState("");
  const [orderNote, setOrderNote] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [orderButtonMessage, setOrderButtonMessage] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const [isDelivered, setIsDelivered] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [createdAt, setCreatedAt] = useState("");
  const [deliveredDate, setDeliveredDate] = useState("");

  const [clicked, setClicked] = useState(false);

  const paypalContainer = useRef();

  const { id } = useParams();

  const reOrderItemsCheck = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    getUser()
      .then((data) => {
        setUserAddress({
          location: data.location,
          deliveryAddress: data.deliveryAddress,
          billAddress: data.billAddress,
          postCode: data.postCode,
          state: data.state,
          phone: data.phone,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getOrder(id)
      .then((data) => {
        setOrder(data);
        setPaymentMethod(data.paymentMethod);
        setInvoiceNumber(data.invoiceNumber);
        setCreatedAt(data.createdAt);
        if (data.deliveredAt) {
          setDeliveredDate(data.deliveredAt);
        }

        setPurchaseNumber(data.purchaseNumber);
        setCartItems(data.cartItems);
        setOrderNote(data.orderNote);
        // console.log("praveen", data.cartItems);
        setCartSubtotal(data.orderTotal.cartSubtotal);
        data.isDelivered
          ? setIsDelivered(data.deliveredAt)
          : setIsDelivered(false);
        data.isPaid ? setIsPaid(data.paidAt) : setIsPaid(false);
        if (data.isPaid) {
          setOrderButtonMessage("Your order has been completed!");
          setButtonDisabled(true);
        } else {
          if (data.paymentMethod === "Invoice") {
            setOrderButtonMessage("Thanks for your order");
          } else if (data.paymentMethod === "PayPal") {
            /* setButtonDisabled(true); */
            setOrderButtonMessage(
              "To pay for your order click one of the buttons below"
            );
          }
        }
      })

      .catch((err) => console.log(err));
  }, []);
  // console.log("OrderDetailPage cartItems", cartItems, typeof cartItems);

  // 分隔一下，跟上面的
  const orderHandler = () => {
    setButtonDisabled(true);
    if (paymentMethod === "PayPal") {
      setOrderButtonMessage(
        "To pay for your order click one of the buttons below"
      );
      if (!isPaid) {
        // to do: load PayPal script and do actions
        loadPayPalScript(cartSubtotal, cartItems, id, updateStateAfterOrder);
      }
    } else {
      setOrderButtonMessage("Your order was placed. Thank you");
    }
  };

  /* paypal的一些判定 */
  const updateStateAfterOrder = (paidAt) => {
    setOrderButtonMessage("Thank you for your payment!");
    setIsPaid(paidAt);
    setButtonDisabled(true);
    paypalContainer.current.style = "display: none";
  };

  const [finished, setFinished] = useState(false);

  const onAnimationEnd = () => {
    setFinished(true);
  };

  const reOrderHandler = () => {
    reduxDispatch(reOrdertReduxAction(id));
    setTimeout(() => {
      window.location.href = "/user/cart-details";
    }, 1000);
    setClicked(true);
  };

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleReorderClick = () => {
    if (reOrderItemsCheck.length > 0) {
      setShowConfirmation(true);
    } else {
      reOrderHandler(id);
    }
  };

  const removeAllItems = () => {
    reduxDispatch(emptyCart());
  };

  const handleConfirmationClose = (emptyCart) => {
    if (emptyCart) {
      removeAllItems();
      setTimeout(() => {
        reOrderHandler(id);
      }, 1000);
    } else {
      reOrderHandler(id);
    }
  };

  const closeModal = () => {
    setShowConfirmation(false);
  };

  const shippedAT = new Date(isDelivered).toLocaleString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  // console.log("我也不知道这是啥ID", cartItems);

  const nonGSTPrice = (cartSubtotal / 1.1).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const GST = ((cartSubtotal / 1.1) * 0.1).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const incGSTPrice = cartSubtotal.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // console.log("orderNote", order);

  // edite order name modal
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setOrderNote(order.orderNote);
  };
  const handleShow = () => setShow(true);

  const enterOrderName = (e) => {
    setOrderNote(e.target.value);
  };

  const saveOrderName = () => {
    setShow(false);
    updateOrderNote(id, orderNote);
  };

  return (
    <Container>
      <Row className="mt-4">
        <h1>ORDER DETAILS</h1>
        <Col md={9}>
          <Row style={{ display: "none" }}>
            <Col md={6}>
              <h3>SHIPPING</h3>
              <b>Name</b>: {userInfo.name} {userInfo.lastName} <br />
              <b>Site</b>: {userAddress.location} <br />
              <b>Phone</b>: {userAddress.phone} <br />
              <b>Address</b>: {userAddress.deliveryAddress} {userAddress.state}{" "}
              {userAddress.postCode}
            </Col>
            <Col md={6}>
              <h3>PAYMENT DETAILS</h3>
              <Form.Select value={paymentMethod} disabled={true}>
                <option value="Invoice">Invoice</option>
                {/* <option value="Credit Cards">Credit Cards</option> */}
                <option value="PayPal">PayPal</option>
              </Form.Select>
            </Col>
            <Row>
              <Col>
                <Alert
                  className="mt-3 lh-1 h-50 pt-2 w-25"
                  variant={isDelivered ? "success" : "danger"}
                >
                  {isDelivered ? (
                    <>Shipped at {shippedAT.split("at")[0]}</>
                  ) : (
                    <>Not delivered</>
                  )}
                </Alert>
              </Col>
              <Col>
                <Alert
                  className="mt-3 lh-1 h-50 pt-2"
                  variant={isPaid ? "success" : "danger"}
                >
                  {isPaid ? (
                    <>
                      Paid on{" "}
                      {new Date(isPaid).toLocaleString("en-AU", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })}
                    </>
                  ) : (
                    <>Not paid yet</>
                  )}
                </Alert>
              </Col>
            </Row>
          </Row>
          <br />
          {/* <h3>ORDER ITEMS</h3> */}
          <ListGroup variant="flush">
            <table style={{ width: "100%" }} className="mt-1">
              <thead>
                <tr>
                  <th style={{ width: "6%" }}></th>
                  <th style={{ width: "42%" }}>Product</th>
                  <th style={{ width: "13%" }}>Attrs</th>
                  <th style={{ width: "10%" }}>Order Qty</th>
                  <th style={{ width: "12%" }}>Supplied Qty</th>
                  <th style={{ width: "10%" }}>Back Order</th>
                </tr>
              </thead>
              {cartItems.map((item, idx) => (
                <CartItemForUserOrderComponent
                  key={idx}
                  item={item}
                  orderCreated={true}
                  id={id}
                />
              ))}
            </table>
          </ListGroup>
        </Col>
        <Col md={3}>
          <ListGroup>
            <ListGroup.Item className="p-1 ps-2">
              <h3>Order Summary</h3>
            </ListGroup.Item>
            <ListGroup.Item className="p-1 ps-2">
              Item Price:{" "}
              <span className="fw-bold float-end"> $ {nonGSTPrice}</span>
            </ListGroup.Item>
            <ListGroup.Item className="p-1 ps-2">
              Total GST <span className="fw-bold float-end">$ {GST}</span>
            </ListGroup.Item>
            <ListGroup.Item className="p-1 ps-2">
              Invoice Amount:{" "}
              <span className="fw-bold text-danger float-end">
                $ {incGSTPrice}
              </span>
            </ListGroup.Item>
            <ListGroup.Item className="p-1 ps-2">
              PO Number: <span className="fw-bold">{purchaseNumber}</span>
            </ListGroup.Item>
            <ListGroup.Item className="p-1 ps-2">
              <div className="d-grid gap-2">
                <PDFDownloadLink
                  document={
                    <InvoicePrint
                      cartItems={cartItems}
                      invoiceNumber={invoiceNumber}
                      userInfo={userInfo}
                      userAddress={userAddress}
                      purchaseNumber={purchaseNumber}
                      cartSubtotal={cartSubtotal}
                      invoiceDate={createdAt}
                      deliveredDate={deliveredDate}
                    />
                  }
                  fileName={invoiceNumber}
                >
                  {({ loading }) =>
                    loading ? (
                      <u>Loading Invoice...</u>
                    ) : (
                      <u style={{ whiteSpace: "nowrap" }}>Download Invoice</u>
                    )
                  }
                </PDFDownloadLink>
              </div>
              <div style={{ position: "relative", zIndex: 1 }}>
                <div ref={paypalContainer} id="paypal-container-element"></div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="p-1 ps-2">
              <Row>
                <Col>
                  <div>
                    <Button
                      onClick={handleReorderClick}
                      className="button-shadow p-0 pe-2 ps-2 m-0"
                      variant="success"
                    >
                      Re-Order
                    </Button>
                    <Modal
                      show={showConfirmation}
                      onHide={closeModal}
                      className="Re_Order_Modal"
                    >
                      <Modal.Header className="p-0 m-2 mb-0" closeButton>
                        <span className="fw-bold p-0 m-0">Confirmation</span>
                      </Modal.Header>
                      <Modal.Body className="p-2 pt-0">
                        Some items already in your cart! Do you want to empty
                        your cart before re-ordering?
                      </Modal.Body>
                      <Modal.Footer className="p-0 d-flex justify-content-between">
                        <Button
                          variant="success"
                          onClick={() => handleConfirmationClose(true)}
                          className="ms-5 p-0 pe-1 ps-1 button-shadow"
                        >
                          Empty Cart
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() => handleConfirmationClose(false)}
                          className="me-5 p-0 pe-1 ps-1 button-shadow"
                        >
                          Keep Cart Items
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </div>
                </Col>
                <Col>
                  <Button className="p-0 pe-2 ps-2 m-0 button-shadow" variant="light">
                    <a href="/user/my-orders" style={{ color: "#073474" }}>
                      My Orders{" "}
                    </a>
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
          <br />
          <ListGroup>
            <ListGroup.Item className="p-1 ps-2">
              <b>Order Name:</b> {orderNote ? null : "N/A"}
              <i
                onClick={handleShow}
                className="bi bi-pencil-square"
                style={{ cursor: "pointer" }}
              ></i>
            </ListGroup.Item>
            {orderNote ? <ListGroup.Item className="p-1 ps-2">{orderNote}</ListGroup.Item> : null}
          </ListGroup>

          {/* edit order name modal */}
          <Modal show={show} onHide={handleClose} className="edite_order_name">
            <Modal.Header className="p-1 ps-3 pe-3 m-0" closeButton>
              <Modal.Title>Enter Order Name:</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-2 m-0">
              <Form.Control
                onChange={enterOrderName}
                type="string"
                name="MangerEmail"
                defaultValue={orderNote}
                required
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
            </Modal.Body>
            <Modal.Footer className="p-0 m-0">
              <Button
                variant="secondary"
                onClick={handleClose}
                className="p-1 pt-0 pb-0 m-1"
              >
                Close
              </Button>
              <Button
                variant="success"
                onClick={saveOrderName}
                className="p-1 pt-0 pb-0 m-1"
              >
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>

          <br />
          {/* ******* shipping information ******* */}
          <ListGroup>
            <ListGroup.Item className="p-1 ps-2">
              <h5 className="m-0">Shipping Information</h5>
            </ListGroup.Item>
            <ListGroup.Item className="p-1 ps-2">
              <b>Name</b>: {userInfo.name} {userInfo.lastName}
            </ListGroup.Item>
            <ListGroup.Item className="p-1 ps-2">
              <b>Site</b>: {userAddress.location}
            </ListGroup.Item>
            <ListGroup.Item className="p-1 ps-2">
              <b>Phone</b>: {userAddress.phone}
            </ListGroup.Item>
            <ListGroup.Item className="p-1 ps-2">
              <Alert
                className="m-0 lh-1 h-50 p-1 ps-2"
                variant={isDelivered ? "success" : "danger"}
              >
                {isDelivered ? (
                  <>Shipped at {shippedAT.split("at")[0]}</>
                ) : (
                  <>Not delivered</>
                )}
              </Alert>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default UserOrderDetailsPageComponent;
