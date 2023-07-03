import {
  Row,
  Col,
  Container,
  ListGroup,
  Button,
  Tab,
  Tabs,
  Form,
  Image,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "react-medium-image-zoom/dist/styles.css";
import FilterComponent from "../../components/filterQueryResultOptions/FilterComponent";
import BreadcrumbComponent from "../../components/filterQueryResultOptions/BreadcrumbComponent";
import "./SharedPages.css";
import axios from "axios";
import QuotePriceComponent from "../../components/SendEmail/QuotePriceComponent";
import { connect } from "react-redux";
import moment from "moment-timezone";
// import urlExist from "u"

const ProductDetailsPageComponent = ({
  addToCartReduxAction,
  reduxDispatch,
  getProductDetails,
  getUser,
}) => {
  const { id } = useParams();
  const [showCartMessage, setShowCartMessage] = useState(false);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [qty, setQty] = useState(1);

  const [selectedProduct, setSelectedProduct] = useState("Please-Select");
  const [selectedStock, setSelectedStock] = useState(null);

  const [userNameEmail, setUserNameEmail] = useState();
  const [userData, setUserData] = useState([]);

  // 当product state update的时候，重置一下setQty
  useEffect(() => {
    if (product.saleunit) {
      setQty(product.saleunit);
    }
  }, [product]);

  useEffect(() => {
    if (product.stock && product.stock.length === 1) {
      setSelectedProduct(product.stock[0].attrs);
      setSelectedStock(product.stock[0]);
    }
  }, [product]);

  function handleProductChange(event) {
    const attrs = event.target.value;
    setSelectedProduct(attrs);

    if (attrs !== "Please-Select") {
      const stockItem = product.stock.find((item) => item.attrs === attrs);
      setSelectedStock(stockItem);
    } else {
      setSelectedStock(null);
    }
  }

  let stockCount = null;
  let stockPrice = null;
  let stockCode = null;

  if (selectedProduct !== "Please-Select" && selectedStock) {
    stockCount = selectedStock.count;
    stockPrice = selectedStock.price;
    stockCode = selectedStock.ctlsku;
  }

  // console.log("selectedStock", stockPrice);

  // console.log(product.description);
  // const description[]=product.description.split('.');

  const [buttonText, setButtonText] = useState("Add to cart");

  const addToCartHandler = async () => {
    setButtonText("Adding...");
    try {
      await reduxDispatch(addToCartReduxAction(id, qty, selectedStock));
      setShowCartMessage(true);
      setButtonText("Added!");
      setTimeout(() => setButtonText("Add to cart"), 1000);
    } catch (error) {
      // handle error case
      setButtonText("Add to cart");
    }
  };

  /*   let incNum = () => {
      if (qty > 0) {
        setQty(Number(qty) + 1);
      }
    };
    let decNum = () => {
      if (qty > 1) {
        setQty(qty - 1);
      }
    }; */

  useEffect(() => {
    getProductDetails(id)
      .then((data) => {
        setProduct(data);
        setLoading(false);
        setQty(product.saleunit);
      })
      .catch((er) =>
        setError(
          er.response.data.message ? er.response.data.message : er.response.data
        )
      );
  }, []);

  // 新的尺寸价格库存
  /*  const handleChangeAttr = (event) => {
    setSelectedAttrs(event.target.value); // Update the selected attribute when the user selects a different option
  }; */

  // 如果直接用toLocaleString() 报错的话，可能是value undefined了，那就format一下price， 然后再加上 toLocaleString
  const price = stockPrice;
  // const total = price ? (price * qty).toFixed(2) : "";
  // const formattedPrice = parseFloat(total).toLocaleString();
  const formattedPrice = price
    ? (price * qty).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : "";

  // const products = useSelector((state) => state.cart.value);

  // for the zoomable picture Gallery
  // const images = [];
  // if (product && product.images) {
  //   product.images.forEach((image) => {
  //     images.push({
  //       original: image.path,
  //       thumbnail: image.path,
  //     });
  //   });
  // }

  //react-image-lightbox -starts here
  const [images, setImages] = useState([]);
  useEffect(() => {
    async function handleImages() {
      const imagesArray = [];
      if (product && product.images) {
        for (const image of product.images) {
          let imagePath = image.path;
        
          if (imagePath.includes('http://')) {
            imagePath = imagePath.replace('http://', 'https://');
          }
          const isExists = await fetchImage(imagePath);
          if (isExists.ok) {
          
            imagesArray.push({
              original: imagePath,
              thumbnail: imagePath,
              url: imagePath,
              title: image.title,
              caption: image.name,
            });
            console.log(imagesArray);
          }
        }
      }
      setImages(imagesArray);
    }
    handleImages();
  }, [product]);

  async function fetchImage(url) {
    try {
      const response = await fetch(url);
      return response;
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
  }

  // quote price using
  useEffect(() => {
    getUser()
      .then((data) => {
        setUserNameEmail({
          email: data.email,
          name: data.name,
        });
        setUserData(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const quotePriceData = {
    ...userNameEmail,
    productName: product.name,
    productId: id,
  };

  const handleBlur = (e) => {
    const newValue =
      Math.round(e.target.value / product.saleunit) * product.saleunit;
    setQty(newValue);
  };

  const [standard, setStandard] = useState([]);

  useEffect(() => {
    if (product?.standards) {
      if (product.standards.includes("/")) {
        const splittedStandards = product.standards.split("/");
        setStandard(splittedStandards);
      } else {
        setStandard([product.standards]);
      }
    }
  }, [product]);

  const expireDate = product.expireDate;
  const formattedExpireDate = expireDate?.slice(9);

  const dateCalculation = moment.tz(
    expireDate,
    "HH:mm:ss DD/MM/YYYY",
    "Australia/Perth"
  );

  const currentDate = moment.tz("Australia/Perth");

  const diff = dateCalculation.diff(currentDate, "days");

  // console.log(diff);

  async function downloadPDF(pdfURL, pdfName) {
    const response = await fetch(pdfURL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const blob = await response.blob();

    const blobURL = window.URL.createObjectURL(blob);

    const tempLink = document.createElement("a");
    tempLink.style.display = "none";
    tempLink.href = blobURL;

    tempLink.setAttribute("download", pdfName);

    document.body.appendChild(tempLink);

    tempLink.click();

    document.body.removeChild(tempLink);
  }

  return (
    <Container className="ms-3 " fluid>
      <BreadcrumbComponent />
      <Row>
        <Col xxl={2} xl={3} lg={3} md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <FilterComponent />
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col xxl={10} xl={9} lg={9} md={9}>
          <Row className="mt-4 ">
            {/* ************   Filter, has removed, now just take 1 space  ***************  */}

            {/* ************   Product Pictures Display Carousel  ***************  */}
            <Col lg={4} className="m-1">
              <ImageGallery items={images} />
            </Col>

            {/* ************   Product Details  ***************  */}
            <Col lg={6}>
              <Row>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h2 className="text-uppercase">{product.name}</h2>

                    <div>
                      <div
                        hidden={selectedProduct !== "Please-Select"}
                        className="mt-5"
                      >
                        <label htmlFor="attrs">
                          Choose Product:&nbsp;&nbsp;&nbsp;{" "}
                        </label>
                        <select
                          id="product-select"
                          value={selectedProduct}
                          onChange={handleProductChange}
                        >
                          {product.stock &&
                            (product.stock.length === 1 ? (
                              <option value={product.stock[0].attrs}>
                                {product.stock[0].attrs}
                              </option>
                            ) : (
                              <>
                                <option value="Please-Select">
                                  <b>Please Select</b>
                                </option>
                                {product.stock.map((stock) => (
                                  <option key={stock.attrs} value={stock.attrs}>
                                    {stock.attrs}
                                  </option>
                                ))}
                              </>
                            ))}
                        </select>
                      </div>
                      <div hidden={selectedProduct === "Please-Select"}>
                        <label htmlFor="attrs">
                          Choose Product:&nbsp;&nbsp;&nbsp;{" "}
                        </label>
                        <select
                          id="product-select"
                          value={selectedProduct}
                          onChange={handleProductChange}
                        >
                          {product.stock &&
                            (product.stock.length === 1 ? (
                              <option value={product.stock[0].attrs}>
                                {product.stock[0].attrs}
                              </option>
                            ) : (
                              <>
                                <option value="Please-Select">
                                  <b>Please Select</b>
                                </option>
                                {product.stock.map((stock) => (
                                  <option key={stock.attrs} value={stock.attrs}>
                                    {stock.attrs}
                                  </option>
                                ))}
                              </>
                            ))}
                        </select>
                      </div>

                      {stockCount !== null && (
                        <p>
                          Status:{" "}
                          {stockCount > 19 ? (
                            <i className="bi bi-circle-fill fw-bold text-success">
                              {" "}
                              in stock
                            </i>
                          ) : (
                            <i className="bi bi-circle-fill fw-bold text-warning">
                              {" "}
                              low stock
                            </i>
                          )}
                        </p>
                      )}
                    </div>
                    <br />
                    <Row hidden={selectedProduct === "Please-Select"}>
                      <Col>
                        <h6>PRODUCT CODE : {stockCode}</h6>
                        <h6>
                          {userData.isAdmin === true ? (
                            <>
                              <span className="fw-bold">
                                Price: ${formattedPrice}
                              </span>
                              {diff < 0 ? (
                                <span className="text-danger ms-5">
                                  PRICE EXPIRED, PLEASE CHECK WITH SUPPLIER
                                </span>
                              ) : (
                                <span
                                  className="ms-5"
                                  style={{ fontSize: "0.9rem" }}
                                >
                                  Price Valid Until: {formattedExpireDate}
                                </span>
                              )}
                            </>
                          ) : product.slrcurrentbuyingprice === 0 ||
                            diff < 0 ? (
                            <span className="fw-bold PriceContact">
                              Contact us for a quote
                            </span>
                          ) : (
                            <>
                              <span className="fw-bold">
                                Price: ${formattedPrice}
                              </span>
                              <span
                                className="text-danger ms-5"
                                style={{ fontSize: "0.9rem" }}
                                hidden={isNaN(diff)}
                              >
                                Price Valid Until: {formattedExpireDate}
                              </span>
                            </>
                          )}
                        </h6>
                        <br />
                      </Col>
                    </Row>

                    <Row>
                      {userData.isAdmin === true ? (
                        <>
                          {product.slrcurrentbuyingprice === 0 ? null : (
                            <h6>Quantity :</h6>
                          )}
                          <Col lg={3}>
                            <div
                              className="btn-group addToCartQty"
                              role="group"
                            >
                              <Form.Control
                                type="number"
                                min={product.saleunit}
                                className="form-control col-0"
                                value={qty}
                                onBlur={handleBlur}
                                onChange={(e) => setQty(e.target.value)}
                                step={product.saleunit}
                                disabled={selectedProduct === "Please-Select"}
                              />
                            </div>
                          </Col>
                          <Col lg={4}>
                            <Button
                              onClick={() => addToCartHandler(selectedStock)}
                              className="btn_blue btn-ripple                    "
                              variant="success"
                              disabled={
                                selectedProduct === "Please-Select" ||
                                buttonText !== "Add to cart"
                              }
                            >
                              {buttonText}
                            </Button>
                          </Col>
                        </>
                      ) : product.slrcurrentbuyingprice === 0 || diff < 0 ? (
                        <QuotePriceComponent quotePriceData={quotePriceData} />
                      ) : (
                        <>
                          {product.slrcurrentbuyingprice === 0 ||
                          diff < 0 ? null : (
                            <h6 hidden={selectedProduct === "Please-Select"}>
                              Quantity :
                            </h6>
                          )}
                          <Col
                            lg={3}
                            hidden={selectedProduct === "Please-Select"}
                          >
                            <div
                              className="btn-group addToCartQty"
                              role="group"
                            >
                              <Form.Control
                                type="number"
                                min={product.saleunit}
                                className="form-control col-0"
                                value={qty}
                                onBlur={handleBlur}
                                onChange={(e) => setQty(e.target.value)}
                                step={product.saleunit}
                                disabled={selectedProduct === "Please-Select"}
                              />
                            </div>
                          </Col>
                          &nbsp;&nbsp;
                          <Col
                            lg={4}
                            hidden={selectedProduct === "Please-Select"}
                          >
                            <Button
                              onClick={() => addToCartHandler(selectedStock)}
                              className="btn_blue btn-ripple                    "
                              variant="success"
                              disabled={
                                selectedProduct === "Please-Select" ||
                                buttonText !== "Add to cart"
                              }
                            >
                              {buttonText}
                            </Button>
                          </Col>
                        </>
                      )}
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Row>

              {/* ************   Product details with download pdf  ***************  */}
              <Row>
                <Col className="mt-5">
                  <Container className="border border-light border-5">
                    <Tabs
                      defaultActiveKey="Description"
                      transition={false}
                      id="noanim-tab-example"
                      className="mb-3 product_description"
                    >
                      <Tab
                        className="m-3 col-md-12"
                        eventKey="Description"
                        title="Specifications"
                      >
                        <div
                          style={{
                            whiteSpace: "pre-wrap",
                            textAlign: "justify",
                            width: "97%",
                            overflowWrap: "break-word",
                          }}
                        >
                          {/* {product.description} */}
                          {product.description
                            ? product.description
                                .split("*")
                                .map((item, index) => {
                                  return index > 0 ? (
                                    <div
                                      key={index}
                                      style={{
                                        textIndent: "-10px",
                                        paddingLeft: "15px",
                                        lineHeight: "1.6rem",
                                      }}
                                    >
                                      <i class="bi bi-dot " />
                                      {item}
                                    </div>
                                  ) : (
                                    <div key={index}>{item}</div>
                                  );
                                })
                            : ""}
                        </div>
                      </Tab>
                      {/* 看一下，如果pdfs 路径里面 没有值，就显示null，有的话，就map 一下 */}
                      {product.pdfs && product.pdfs.length > 0 ? (
                        <Tab eventKey="Download" title="Downloads">
                          {product.pdfs &&
                            product.pdfs.map((pdf, idx) => {
                              const pdfName = pdf.path.split("/").pop(); // Get the file name from the path
                              return (
                                <div
                                  className="border border-light border-2 m-2 p-1"
                                  key={idx}
                                >
                                  <button
                                    onClick={() =>
                                      downloadPDF(pdf.path, pdfName)
                                    }
                                    className="border-0"
                                    key={idx}
                                    style={{
                                      backgroundColor: "transparent",
                                      color: "#1e4881",
                                    }}
                                  >
                                    <i className="bi bi-file-earmark-pdf">
                                      {" "}
                                      {pdfName}
                                    </i>
                                  </button>
                                </div>
                              );
                            })}
                        </Tab>
                      ) : null}
                      {/* Standards */}
                      {product.standards && product.standards.length > 0 ? (
                        <Tab eventKey="Standards" title="Standards">
                          <div className="border border-light border-2 m-3 p-3 d-flex justify-content-left">
                            {standard &&
                              standard.map((item, index) => {
                                return (
                                  <img
                                    key={index}
                                    src={`https://res.cloudinary.com/dxvwresim/image/upload/c_scale,h_120/STANDARDS/${item}.jpg`}
                                    target="_blank"
                                    alt=""
                                    style={{ maxWidth: "100%", height: "auto" }}
                                  />
                                );
                              })}
                          </div>
                        </Tab>
                      ) : null}
                    </Tabs>
                  </Container>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default connect()(ProductDetailsPageComponent);
