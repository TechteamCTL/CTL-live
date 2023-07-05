import {
  Container,
  Row,
  Col,
  Form,
  Alert,
  ListGroup,
  Button,
} from "react-bootstrap";
import CartItemForOrderComponent from "../../../components/CartItemForOrderComponent";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { useReactToPrint } from "react-to-print";
import DeliveryNotePrint from "../../../components/Pdfs/DeliveryNotePrint";
import InvoicePrint from "../../../components/Pdfs/InvoicePrint";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { pdf } from "@react-pdf/renderer";
import SendInvoice from "../../../components/SendEmail/SendInvoice";
import axios from "axios";


// 如果要改markAsPaid的功能，不但需要在这里改，还需要去orderDetailsPage里添加paid的api和功能，因为在backend的order route和controller里面已经写过updateToPaid了，所以可以直接用。
const OrderDetailsPageComponent = ({
  getOrder,
  getUser,
  markAsDelivered,
  markAsPaid,
  sendInv,
  updateBackOrder,
  removeOrderItem,
  getdeliveryBooks,
  adminUpdateDeliverySite,
}) => {
  const { id } = useParams();

  const [userInfo, setUserInfo] = useState({});
  const [userAddress, setUserAddress] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("");
  const [purchaseNumber, setPurchaseNumber] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [deliveryBooks, setDeliveryBooks] = useState([]);

  const [isDelivered, setIsDelivered] = useState(false);
  const [invoiceSent, setInvoiceSent] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const [deliveredButtonDisabled, setdeliveredButtonDisabled] = useState(false);
  const [paidButtonDisabled, setpaidButtonDisabled] = useState(false);
  const [sentInvButtonDisabled, setSentInvButtonDisabled] = useState(false);
  const [orderDeliveredButton, setorderDeliveredButton] =
    useState("Mark as sent");
  const [invSentButton, setInvSentButton] =
    useState("Send Invoice");
  const [orderPaidButton, setorderPaidButton] = useState("Mark as Paid");
  const [cartItems, setCartItems] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [removed, setRemoved] = useState(false);
  const [selectedDeliverySite, setSelectedDeliverySite] = useState();
  const [editLocation, setEditLocation] = useState(false);


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
        order.invSent
          ? setInvoiceSent(order.invSentAt)
          : setInvoiceSent(false);
        setCartSubtotal(order.orderTotal.cartSubtotal);
        if (order.isDelivered) {
          setorderDeliveredButton("Order has been sent");
          setdeliveredButtonDisabled(true);
        }
        if (order.invSent) {
          setInvSentButton("Invoice has Sent");
          setSentInvButtonDisabled(true);
        }
        if (order.isPaid) {
          setorderPaidButton("Order is Paid");
          setpaidButtonDisabled(true);
        }
        setCartItems(order.cartItems);
        setOrderData(order);
      })
      .catch((er) =>
        console.log(
          er.response.data.message ? er.response.data.message : er.response.data
        )
      );
  }, [isDelivered, isPaid, invoiceSent, id, edit, removed, editLocation]);

  useEffect(() => {
    getdeliveryBooks(userInfo.email)
      .then((deliveryBooks) => setDeliveryBooks(deliveryBooks))
      .catch((err) =>
        console.log(
          err.response.data.message
            ? err.response.data.message
            : err.response.data
        )
      );
  }, [userInfo]);

  const deliverySites = deliveryBooks[0]?.sites;

  useEffect(() => {
    deliverySites &&
      deliverySites.map((site, idx) => {
        return site.name !== ""
          ? orderData.deliverySite === site.name
            ? setSelectedDeliverySite(site)
            : ""
          : "";
      });
  }, [orderData, deliveryBooks]);

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

  // edit order
  const handleEdit = () => setEdit(true);

  const saveEdit = () => {
    setTimeout(() => {
      setEdit(false);
    }, 500);
  };

  const changeCount = (orderId, itemId, suppliedQty) => {
    updateBackOrder(orderId, itemId, suppliedQty);
  };

  const removeFromOrderHandler = (orderId, itemId) => {
    if (window.confirm("Want Remove the Item?")) {
      removeOrderItem(orderId, itemId);
      setRemoved(true);
      setTimeout(() => {
        setRemoved(false);
      }, 500);
    }
  };

  const changeDeliverySite = (e) => {
    deliverySites &&
      deliverySites.map((site, idx) => {
        return site.name !== ""
          ? e.target.value === site.name
            ? setSelectedDeliverySite(site)
            : ""
          : "";
      });
  };


  const handleEditLocation = () => setEditLocation(true);

  const saveEditLocation = () => {
    adminUpdateDeliverySite(id, selectedDeliverySite?.name);
    setTimeout(() => {
      setEditLocation(false);
    }, 500);
  };

  // email invoice to client's account team
  const [base64Data, setBase64Data] = useState([]);

  const generatePdf = async () => {
    try {
      const blob = await pdf(
        <InvoicePrint
          cartItems={cartItems}
          invoiceNumber={invoiceNumber}
          userInfo={userInfo}
          purchaseNumber={purchaseNumber}
          cartSubtotal={cartSubtotal}
          invoiceDate={createdAt}
          selectedDeliverySite={selectedDeliverySite}
        />
      ).toBlob();

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result;
        // console.log(base64data);
        setBase64Data({
          base64data,
        });
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    }
  };

  const [invDate, setInvDate] = useState()
  useEffect(() => {
    generatePdf();
    setInvDate({ sentInvButtonDisabled, billingEmail: deliveryBooks[0]?.billingEmail, invoiceNumber: invoiceNumber, base64data: base64Data.base64data, cartSubtotal, purchaseNumber })
  }, [orderData, isDelivered, isPaid, invoiceSent, id, edit, removed, editLocation, editLocation, deliveryBooks]);

  console.log('====================================');
  console.log(invDate);
  console.log('====================================');

  const sendInvoiceEmail = async (invDate) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const formDataToSend = new FormData();
    formDataToSend.append(
      "billingEmail",
      `${deliveryBooks[0]?.billingEmail}`
    );
    formDataToSend.append(
      "purchaseNumber",
      `${invDate.purchaseNumber}`
    );
    formDataToSend.append(
      "totalPrice",
      `${(invDate.cartSubtotal).toFixed(2)}`
    );
    formDataToSend.append(
      "invoiceNumber",
      `${(invDate.invoiceNumber)}`
    );
    formDataToSend.append("base64data", `${invDate.base64data}`);
    try {
      const res = await axios.post(
        "/api/sendemail/emailInv",
        formDataToSend,
        config
      );
      console.log(res.data);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const handleSentInv = async () => {
    if (await sendInvoiceEmail(invDate)) {
      sendInv(id)
        .then((res) => {
          if (res) {
            setInvoiceSent(true);
          }
        })
        .catch((er) =>
          console.log(
            er.response.data.message
              ? er.response.data.message
              : er.response.data
          ),
        )
    } else {
      setInvSentButton("Something Went Wrong! Contact Tech Team!!!")
    }
  };


  return (
    <Container fluid style={{ width: "80%" }}>
      <Row className="mt-4">
        <h1>ORDER DETAILS</h1>
        <Col md={9}>
          <br />
          <Row>
            <Col md={6}>
              <h3>SHIPPING</h3>
              <b>Name</b>: {userInfo.name} {userInfo.lastName} <br />
              {/* <b>Site</b>: {orderData.deliverySite} */}
              <ListGroup.Item className="p-1 ps-0 w-20">
                <Form.Label className="fw-bold">
                  Delivery Site:
                  {editLocation === false ? (
                    <>
                      {" "}
                      <i
                        onClick={handleEditLocation}
                        className="bi bi-pencil-square"
                        style={{ cursor: "pointer" }}
                      ></i>
                    </>
                  ) : (
                    <>
                      {" "}
                      <i
                        class="bi bi-folder-check"
                        onClick={saveEditLocation}
                        style={{ cursor: "pointer" }}
                      ></i>{" "}
                    </>
                  )}
                </Form.Label>

                <Form.Select
                  required
                  name="sites"
                  aria-label="Default select example"
                  onChange={changeDeliverySite}
                  className="p-0 ps-1"
                  disabled={editLocation === false}
                >
                  {deliverySites &&
                    deliverySites.map((site, idx) => {
                      return site.name !== "" ? (
                        orderData.deliverySite === site.name ? (
                          <option selected key={idx} value={site.name}>
                            {site.name}
                          </option>
                        ) : (
                          <option key={idx} value={site.name}>
                            {site.name}
                          </option>
                        )
                      ) : (
                        <option key={idx} value={site.name}>
                          {site.name}
                        </option>
                      );
                    })}
                </Form.Select>
              </ListGroup.Item>
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
                  className="mt-3 p-0 ps-2"
                  variant={isDelivered ? "success" : "danger"}
                >
                  {isDelivered ? (
                    <>
                      Shipped at{" "}
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
                    <>Not Sent Yet</>
                  )}
                </Alert>
              </Col>
              <Col>
                <Alert
                  className="mt-3 p-0 ps-2"
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
              <Col>
                <Alert
                  className="mt-3 p-0 ps-2"
                  variant={invoiceSent ? "success" : "danger"}
                >
                  {invoiceSent ? (
                    <>
                      Inv Sent at{" "}
                      {new Date(invoiceSent).toLocaleString("en-AU", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })}
                    </>
                  ) : (
                    <>Invoice Not Sent</>
                  )}
                </Alert>
              </Col>
            </Row>
          </Row>
          <br />
          <h3>
            ORDER ITEMS
            {edit === false ? (
              <>
                {" "}
                <i
                  onClick={handleEdit}
                  className="bi bi-pencil-square"
                  style={{ cursor: "pointer" }}
                ></i>
              </>
            ) : (
              <>
                {" "}
                <button className="pe-1 ps-1 p-0 m-0 fs-6" onClick={saveEdit}>
                  save
                </button>{" "}
              </>
            )}
          </h3>

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
                  <th style={{ width: "7%" }}>Delete</th>
                </tr>
              </thead>
              {cartItems.map((item, idx) => (
                <CartItemForOrderComponent
                  key={idx}
                  item={item}
                  orderCreated={true}
                  edit={edit}
                  changeCount={changeCount}
                  removeFromOrderHandler={removeFromOrderHandler}
                  id={id}
                />
              ))}
            </table>
          </ListGroup>
        </Col>
        <Col md={3}>
          <ListGroup>
            <ListGroup.Item className="p-1 ps-2">
              <h3>ORDER SUMMARY</h3>
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
                <Button
                  className="p-0 m-0 w-50"
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
            <ListGroup.Item className="p-1 ps-2">
              <div className="d-grid gap-2">
                <Button
                  className="p-0 m-0 w-50"
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

            <ListGroup.Item className="p-1 ps-2">
              <div className="d-grid gap-2">
                <Button
                  className="p-0 m-0 w-50"
                  onClick={handleSentInv}
                  disabled={sentInvButtonDisabled}
                  variant="success"
                  type="button"
                >
                  {invSentButton}
                </Button>

                {/* <SendInvoice invDate={invDate} />
                <Button
                  className="p-0 m-0 w-50"
                  onClick={() =>
                    sendInv(id)
                      .then((res) => {
                        if (res) {
                          setInvoiceSent(true);
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
                  disabled={sentInvButtonDisabled}
                  variant="success"
                  type="button"
                >
                  {invSentButton}
                </Button> */}
              </div>
            </ListGroup.Item>

            <ListGroup.Item className="p-1 ps-2">
              <div className="d-grid gap-2">
                <PDFDownloadLink
                  document={
                    <DeliveryNotePrint
                      cartItems={cartItems}
                      invoiceNumber={invoiceNumber}
                      userInfo={userInfo}
                      //userAddress={userAddress}
                      purchaseNumber={purchaseNumber}
                      cartSubtotal={cartSubtotal}
                      invoiceDate={createdAt}
                      selectedDeliverySite={selectedDeliverySite}
                    />
                  }
                  fileName={"PN" + invoiceNumber}
                >
                  {({ loading }) =>
                    loading ? (
                      <Button className="p-0 m-0 pe-2 ps-2">
                        Loading Delivery Note...
                      </Button>
                    ) : (
                      <Button className="p-0 m-0 pe-2 ps-2">
                        Download Delivery Note
                      </Button>
                    )
                  }
                </PDFDownloadLink>
              </div>
            </ListGroup.Item>

            <ListGroup.Item className="p-1 ps-2">
              <div className="d-grid gap-2">
                <PDFDownloadLink
                  document={
                    <InvoicePrint
                      cartItems={cartItems}
                      invoiceNumber={invoiceNumber}
                      userInfo={userInfo}
                      //userAddress={userAddress}
                      purchaseNumber={purchaseNumber}
                      cartSubtotal={cartSubtotal}
                      invoiceDate={createdAt}
                      selectedDeliverySite={selectedDeliverySite}
                    />
                  }
                  fileName={invoiceNumber}
                >
                  {({ loading }) =>
                    loading ? (
                      <Button className="p-0 m-0 pe-2 ps-2">
                        Loading Invoice...
                      </Button>
                    ) : (
                      <Button className="p-0 m-0 pe-2 ps-2 w-50 ">
                        Download Invoice
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
