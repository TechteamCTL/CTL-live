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
import CartItemComponent from "../../../components/CartItemComponent";
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
  loadPayPalScript,
  reduxDispatch,
  reOrdertReduxAction,
}) => {
  const [userAddress, setUserAddress] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("");
  const [purchaseNumber, setPurchaseNumber] = useState("");
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
        setPaymentMethod(data.paymentMethod);
        setInvoiceNumber(data.invoiceNumber);
        setCreatedAt(data.createdAt);
        if (data.deliveredAt) {
          setDeliveredDate(data.deliveredAt);
        }

        setPurchaseNumber(data.purchaseNumber);
        setCartItems(data.cartItems);
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

/*   // a function, split array in to chunks
  function splitArrayIntoChunks(arr, chunkSize) {
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  }

  // slice the first 10 into first array, rest in chunks
  function splitCartItems(cartItems) {
    const firstChunk = cartItems.slice(0, 10);
    const remainingItems = cartItems.slice(10);
    const chunks = splitArrayIntoChunks(remainingItems, 15);
    return [firstChunk, ...chunks];
  }

  // const first array and rest chunks
  const [firstNineItems, ...otherChunks] = splitCartItems(cartItems);

  // use otherChunks[] to pick array from chunks.
  console.log("OrderDetailPage chunks", firstNineItems, otherChunks);

  if (otherChunks[2]) {
    console.log("我是chunks2", otherChunks[2]);
  } */

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

  return (
    <Container>
      <Row className="mt-4">
        <h1>ORDER DETAILS</h1>
        <Col md={9}>
          <br />
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
            {cartItems.map((item, idx) => (
              <CartItemComponent item={item} key={idx} orderCreated={true} />
            ))}
          </ListGroup>
        </Col>
        <Col md={3}>
          <ListGroup>
            <ListGroup.Item>
              <h3>Order Summary</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              Item Price:{" "}
              <span className="fw-bold float-end">
                {" "}
                $ {(cartSubtotal / 1.1).toFixed(2).toLocaleString()}
              </span>
            </ListGroup.Item>
            <ListGroup.Item>
              Total GST{" "}
              <span className="fw-bold float-end">
                $ {((cartSubtotal / 1.1) * 0.1).toFixed(2).toLocaleString()}
              </span>
            </ListGroup.Item>
            <ListGroup.Item>
              Invoice Amount:{" "}
              <span className="fw-bold text-danger float-end">
                $ {cartSubtotal.toFixed(2).toLocaleString()}
              </span>
            </ListGroup.Item>
            <ListGroup.Item>
              PO Number: <span className="fw-bold">{purchaseNumber}</span>
            </ListGroup.Item>
            <ListGroup.Item>
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
                  fileName={"INV-" + invoiceNumber}
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
            <ListGroup.Item>
              <Row>
                <Col>
                  <div>
                    <Button
                      onClick={handleReorderClick}
                      className="button-shadow"
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
                  <Button className="pt-1 pb-1 button-shadow" variant="light">
                    <a href="/user/my-orders" style={{ color: "#073474" }}>
                      My Orders{" "}
                    </a>
                  </Button>
                </Col>
              </Row>
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
{/*             <ListGroup.Item>
              <b>Address</b>: {userAddress.deliveryAddress}
            </ListGroup.Item> */}
            <ListGroup.Item>
              <Alert
                className="m-0 lh-1 h-50 p-2"
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
