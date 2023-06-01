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

import { useDispatch } from "react-redux";
import QuoeteManagementApproval from "../../../components/SendEmail/QuoeteManagementApproval";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { pdf } from "@react-pdf/renderer";
import CartPrint from "../../../components/Pdfs/CartPrint";
import axios from "axios";
import "./invoicePDF.css";

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
  const [base64Data, setBase64Data] = useState([]);

  /* const dispatch = useDispatch(); */

  const navigate = useNavigate();

  const changeCount = (id, qty) => {
    reduxDispatch(editQuantity(id, qty));
  };

  const removeFromCartHandler = (productId, quantity, price) => {
    reduxDispatch(removeFromCart(productId, quantity, price));
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
        if (!data.location || !data.postCode || !data.state || !data.phone) {
          setMissingAddress(
            " In order to make order, fill out your profile with correct site and personal information."
          );
        } else {
          /* 这些是再下方的userAddress.location之类的信息，读取地址的。 */
          setUserAddress({
            location: data.location,
            deliveryAddress: data.deliveryAddress,
            billAddress: data.billAddress,
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

  const orderHandler = () => {
    const orderData = {
      orderTotal: {
        itemsCount: itemsCount,
        cartSubtotal: (cartSubtotal * 1.1).toFixed(2),
      },
      cartItems: cartItems.map((item) => {
        return {
          productId: item.productId,
          name: item.name,
          saleunit: item.saleunit,
          image: item.image ? item.image ?? null : null,
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
      .then(async (data) => {
        if (data) {
          reduxDispatch(emptyCart());
          setTimeout(() => {
            navigate("/user/my-orders");
          }, 1000);
          const res = await axios.post("/api/sendemail/newOrderRemind", {
            from: userInfo.email,
            PO: purchaseNumber,
            price: (cartSubtotal * 1.1).toFixed(2),
          });
          console.log(res.data);
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
    setTimeout(() => {
      window.location.href = "/product-list";
    }, 1000);
  };

  const userEmail = userInfo.email?.split("@")[1];

  // console.log("????????cartItems", cartItems);

  // attach pdf to email 因为不能直接attach一个pdf去后端，所以把pdf生成，然后转为 base64的代码，传送去后端，然后再decode
  const generatePdf = async () => {
    try {
      const blob = await pdf(
        <CartPrint
          cartItems={cartItems}
          userInfo={userInfo}
          userAddress={userAddress}
          purchaseNumber={purchaseNumber}
          cartSubtotal={cartSubtotal}
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

  useEffect(() => {
    generatePdf();
  }, [cartItems]);


  const quotePriceData = {
    ...userNameEmail,
    cartItems,
    cartSubtotal,
    managerEmail,
    base64Data,
  };

  // console.log("quotePriceData", quotePriceData);

  const nonGSTPrice = parseFloat(
    cartSubtotal.toFixed(2)
  ).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const GST = parseFloat(
    (cartSubtotal * 0.1).toFixed(2)
  ).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const incGSTPrice = parseFloat((cartSubtotal * 1.1).toFixed(2)).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <>
      <Container>
        <Row className="mt-4">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h1>CART DETAILS</h1>
          </div>
          <Col md={9}>
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
            <Button
              type="button"
              onClick={removeAllItems}
              className="p-0 ps-1 pe-1 empty_cart_btn"
            >
              Empty Cart <i className="bi bi-trash" />
            </Button>
          </Col>
          <Col md={3} className="cart_detail_right">
            <ListGroup>
              <ListGroup.Item>
                <div className="d-grid gap-2">
                  <PDFDownloadLink
                    document={
                      <CartPrint
                        cartItems={cartItems}
                        userInfo={userInfo}
                        userAddress={userAddress}
                        purchaseNumber={purchaseNumber}
                        cartSubtotal={cartSubtotal}
                      />
                    }
                    fileName={userInfo.name + "'s Cart"}
                    className="btn btn-success p-0 ps-1 pe-1 ms-3 me-3 download_cart_btn"
                  >
                    <span>
                      Download Cart <i className="bi bi-file-earmark-pdf"></i>
                    </span>
                    {/* {({ loading }) =>
                      loading ? (
                        <span>Loading Cart...</span>
                      ) : (
                        <span>
                          Download Cart{" "}
                          <i className="bi bi-file-earmark-pdf"></i>
                        </span>
                      )
                    } */}
                  </PDFDownloadLink>
                </div>
              </ListGroup.Item>
            </ListGroup>
            <br />
            <ListGroup hidden={cartItems.length === 0}>
              {/* <ListGroup.Item controlId="validationMangerEmail">
                <Row>
                  <Col xs={6} className="pe-0">
                    <Form.Control
                      value={managerEmail}
                      onChange={enterManagerEmail}
                      type="string"
                      name="ManagerEmail"
                      placeholder={`Enter email`}
                      required
                    />
                  </Col>
                  <Col xs={6} className="p-0">
                    <Form.Control plaintext readOnly value={`@${userEmail}`} />
                  </Col>
                </Row>
                <Form.Control.Feedback type="invalid">
                  Please Enter Your Manager's Email.{" "}
                </Form.Control.Feedback>
              </ListGroup.Item> */}

              <ListGroup.Item controlId="validationMangerEmail">
                <Form.Control
                  className=""
                  onChange={enterManagerEmail}
                  type="string"
                  name="MangerEmail"
                  placeholder={`Enter email @${userEmail}`}
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
                <p className="p-0 m-0">
                  Total:{" "}
                  <span className="float-end">
                    <span className="fw-bold ">{cartItems.length}</span>{" "}
                    {cartItems.length === 1 ? "Product" : "Products"}
                  </span>
                </p>
              </ListGroup.Item>

              <ListGroup.Item>
                Item Price:{" "}
                <span className="fw-bold float-end">
                  {" "}
                  $ {nonGSTPrice}
                </span>
              </ListGroup.Item>
              <ListGroup.Item>
                Total GST{" "}
                <span className="fw-bold float-end">
                  $ {GST}
                </span>
              </ListGroup.Item>
              <ListGroup.Item>
                Invoice Amount:{" "}
                <span className="fw-bold text-danger float-end">
                  $ {incGSTPrice}
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
                  <button
                    size="sm"
                    onClick={orderHandler}
                    disabled={purchaseNumber?.length < 1}
                    className="btn btn-success p-0 ps-1 pe-1 download_cart_btn"
                  >
                    Comfirm Order
                  </button>
                </div>
              </ListGroup.Item>
            </ListGroup>
            <br />
            {/* ******* shipping information ******* */}
            {/*             <ListGroup>
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
                <b>Address</b>: {userAddress.deliveryAddress}
              </ListGroup.Item>
            </ListGroup> */}
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
