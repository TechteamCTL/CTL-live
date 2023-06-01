import {
  Container,
  Row,
  Col,
  Form,
  Alert,
  ListGroup,
  Button,
} from "react-bootstrap";
import CartItemComponent from "../../../components/CartItemComponent";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { useReactToPrint } from "react-to-print";
import DeliveryNotePrint from "../../../components/Pdfs/DeliveryNotePrint";
import InvoicePrint from "../../../components/Pdfs/InvoicePrint";
import { PDFDownloadLink } from "@react-pdf/renderer";

// 如果要改markAsPaid的功能，不但需要在这里改，还需要去orderDetailsPage里添加paid的api和功能，因为在backend的order route和controller里面已经写过updateToPaid了，所以可以直接用。
const OrderDetailsPageComponent = ({
  getOrder,
  getUser,
  markAsDelivered,
  markAsPaid,
}) => {
  const { id } = useParams();

  const [userInfo, setUserInfo] = useState({});
  const [userAddress, setUserAddress] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("");
  const [purchaseNumber, setPurchaseNumber] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  const [isDelivered, setIsDelivered] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const [deliveredButtonDisabled, setdeliveredButtonDisabled] = useState(false);
  const [paidButtonDisabled, setpaidButtonDisabled] = useState(false);
  const [orderDeliveredButton, setorderDeliveredButton] =
    useState("Mark as delivered");
  const [orderPaidButton, setorderPaidButton] = useState("Mark as Paid");
  const [cartItems, setCartItems] = useState([]);

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
      .then((order) => {
        setUserInfo(order.user);
        setPaymentMethod(order.paymentMethod);
        setInvoiceNumber(order.invoiceNumber);
        setCreatedAt(order.createdAt);
        setPurchaseNumber(order.purchaseNumber);
        order.isPaid ? setIsPaid(order.paidAt) : setIsPaid(false);
        order.isDelivered
          ? setIsDelivered(order.deliveredAt)
          : setIsDelivered(false);
        setCartSubtotal(order.orderTotal.cartSubtotal);
        if (order.isDelivered) {
          setorderDeliveredButton("Order is Delivered");
          setdeliveredButtonDisabled(true);
        }
        if (order.isPaid) {
          setorderPaidButton("Order is Paid");
          setpaidButtonDisabled(true);
        }
        setCartItems(order.cartItems);
      })
      .catch((er) =>
        console.log(
          er.response.data.message ? er.response.data.message : er.response.data
        )
      );
  }, [isDelivered, isPaid, id]);

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

  console.log("admin管理订单 cartItems", cartItems);
  return (
    <Container>
      <Row className="mt-4">
        <h1>ORDER DETAILS</h1>
        <Col md={9}>
          <br />
          <Row>
            <Col md={6}>
              <h3>SHIPPING</h3>
              <b>Name</b>: {userInfo.name} {userInfo.lastName} <br />
              <b>Address</b>: {userInfo.deliveryAddress}
              <br />
              <b>Phone</b>: {userInfo.phone}
            </Col>
            <Col md={6}>
              <h3>PAYMENT METHOD</h3>
              <Form.Select value={paymentMethod} disabled={true}>
                <option value="Invoice">Invoice</option>
                <option value="PayPal">PayPal</option>
              </Form.Select>
            </Col>
            <Row>
              <Col>
                <Alert
                  className="mt-3"
                  variant={isDelivered ? "success" : "danger"}
                >
                  {isDelivered ? (
                    <>
                      Delivered at{" "}
                      {new Date(isDelivered).toLocaleString("en-AU", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })}
                    </>
                  ) : (
                    <>Not delivered</>
                  )}
                </Alert>
              </Col>
              <Col>
                <Alert className="mt-3" variant={isPaid ? "success" : "danger"}>
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
          <h3>ORDER ITEMS</h3>
          <ListGroup variant="flush">
            {cartItems.map((item, idx) => (
              <CartItemComponent key={idx} item={item} orderCreated={true} />
            ))}
          </ListGroup>
        </Col>
        <Col md={3}>
          <ListGroup>
            <ListGroup.Item>
              <h3>ORDER SUMMARY</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              Item Price:{" "}
              <span className="fw-bold float-end"> $ {nonGSTPrice}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Total GST <span className="fw-bold float-end">$ {GST}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Invoice Amount:{" "}
              <span className="fw-bold text-danger float-end">
                $ {incGSTPrice}
              </span>
            </ListGroup.Item>
            <ListGroup.Item>
              PO Number: <span className="fw-bold">{purchaseNumber}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="d-grid gap-2">
                <Button
                 className="pt-0 pb-0 m-0"
                  size="lg"
                  onClick={() =>
                    markAsDelivered(id)
                      .then((res) => {
                        if (res) {
                          setIsDelivered(true);
                        }
                      })
                      .catch((er) =>
                        console.log(
                          er.response.data.message
                            ? er.response.data.message
                            : er.response.data
                        )
                      )
                  }
                  disabled={deliveredButtonDisabled}
                  variant="success"
                  type="button"
                >
                  {orderDeliveredButton}
                </Button>
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="d-grid gap-2">
                <Button
                  className="p-0 m-0"
                  size="lg"
                  onClick={() =>
                    markAsPaid(id)
                      .then((res) => {
                        if (res) {
                          setIsPaid(true);
                        }
                      })
                      .catch((er) =>
                        console.log(
                          er.response.data.message
                            ? er.response.data.message
                            : er.response.data
                        )
                      )
                  }
                  disabled={paidButtonDisabled}
                  variant="success"
                  type="button"
                >
                  {orderPaidButton}
                </Button>
              </div>
            </ListGroup.Item>

            <ListGroup.Item>
              <div className="d-grid gap-2">
                <PDFDownloadLink
                  document={
                    <DeliveryNotePrint
                      cartItems={cartItems}
                      invoiceNumber={invoiceNumber}
                      userInfo={userInfo}
                      userAddress={userAddress}
                      purchaseNumber={purchaseNumber}
                      cartSubtotal={cartSubtotal}
                      invoiceDate={createdAt}
                    />
                  }
                  fileName={"PS-" + invoiceNumber}
                >
                  {({ loading }) =>
                    loading ? (
                      <Button className="p-0 m-0" size="lg">
                        Loading Delivery Note...
                      </Button>
                    ) : (
                      <Button className="pt-0 pb-0 m-0" size="lg">Download Delivery Note</Button>
                    )
                  }
                </PDFDownloadLink>
              </div>
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
                    />
                  }
                  fileName={"INV-" + invoiceNumber}
                >
                  {({ loading }) =>
                    loading ? (
                      <Button className="pt-0 pb-0 m-0" size="lg">Loading Invoice...</Button>
                    ) : (
                      <Button className="pt-0 pb-0 m-0" size="lg">
                        &nbsp; &nbsp; Download Invoice
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </Button>
                    )
                  }
                </PDFDownloadLink>
              </div>
            </ListGroup.Item>
          </ListGroup>
          <label>
            <u>
              <a href="/admin/orders">Go to All Orders </a>
            </u>
          </label>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderDetailsPageComponent;
