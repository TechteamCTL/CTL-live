import {
  Navbar,
  Nav,
  Container,
  Badge,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";
import { logout } from "../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";

import "./page.css";

import { LinkContainer } from "react-router-bootstrap";
import { useLocation } from "react-router-dom";
import { GiMineWagon } from "react-icons/gi";

import {
  addToCart,
  removeFromCart,
  editQuantity,
} from "../redux/actions/cartActions";
import axios from "axios";
import { fetchCartItemsLogin } from "../redux/actions/cartActions";
import QuoteComponentHeader from "./SendEmail/QuoteComponentHeader";
import CartDropDown from "../pages/user/components/CartDropDown";

const HeaderComponent = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userRegisterLogin);
  const itemsCount = useSelector((state) => state.cart.itemsCount);
  const cartSubtotal = useSelector((state) => state.cart.cartSubtotal);
  // console.log("userInfouserInfo",userInfo);
  // const { categories } = useSelector((state) => state.getCategories);

  // const [searchCategoryToggle, setSearchCategoryToggle] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const submitHandler = (e) => {
    if (e.keyCode && e.keyCode !== 13) return;
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/product-list?searchQuery=${searchQuery}`);
    }
  };

  const cartItems = useSelector((state) => state.cart.cartItems);
  const reduxDispatch = useDispatch();

  /*   const location = useLocation();
  // const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  // console.log('header query', location); */

  /* 获取用户购物车信息 */
  const getCart = async () => {
    const { data } = await axios.get("/api/cart");
    return data;
  };

  const [userCart, setUserCart] = useState([]);
  useEffect(() => {
    getCart()
      .then((cart) => setUserCart(cart.data.cart))
      .catch((er) => console.log(er));
    reduxDispatch(fetchCartItemsLogin());
  }, []);

  // console.log("用户购物车", userCart);

  const [showModal, setShowModal] = useState(false);
  const [product, setProduct] = useState(null);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      {/* ************   Login/register, will move down to replace carts  ***************  */}
      <Navbar className="hd_bgc w-100" expand="lg">
        <Container className="header_con" fluid>
          {/* ************   LOGO  ***************  */}
          <LinkContainer to="/">
            <Nav.Link className="hd_c logo_con w-25" href="/home">
              {/* <img src="./images/CTL-AUSB.png" alt="" className="nav_CTL"></img> */}
              <img
                src="/images/CTL-hex.png"
                alt=""
                className="rotate linear infinite"
              ></img>
              <img
                src="/images/CTL-hextext.png"
                alt=""
                className="hexagontext"
              ></img>
            </Nav.Link>
          </LinkContainer>

          {/* ************   Search Bar  ***************  */}
          <Nav className="me-auto input_search">
            <InputGroup className="mb-3 ">
              <Form.Control
                onKeyUp={submitHandler}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter description, product code or brand"
                aria-label="search bar"
                aria-describedby="basic-addon2"
                bg="white"
                className="mt-3"
              />
              <Button
                /* variant="outline-secondary" */
                id="button-addon2"
                className="mt-3 CTL_btn"
                onClick={submitHandler}
              >
                <i className="search-icon bi bi-search "></i>
              </Button>
            </InputGroup>
            <img
              src="https://res.cloudinary.com/dxvwresim/image/upload/v1684231122/CTL%20Brand%20Images/red-search.png"
              alt=""
              className="red_search_img"
              style={{ cursor: "pointer" }}
              onClick={toggleModal}
            ></img>
          </Nav>
          <Modal
            show={showModal}
            onHide={toggleModal}
            className="quote_product_modal"
          >
            <Modal.Header className="m-0 p-2" closeButton>
              <Modal.Title
                style={{ textAlign: "center", width: "100%" }}
                className="m-0 p-0"
              >
                REQUEST FOR QUOTE
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <QuoteComponentHeader userInfo={userInfo} />
            </Modal.Body>
          </Modal>

          {/* ************   User and Carts  ***************  */}
          {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav"> */}
          {/* 折叠区间 */}
          <Nav className="user_cart">
            {userInfo.isAdmin ? (
              <>
                {/* <LinkContainer to="/admin/orders">
                  <Nav.Link>Admin: {userInfo.name}</Nav.Link>
                </LinkContainer> */}

                <div className="users_initial_dropdown mt-2 pe-4">
                  <div className="Avtbox_admin">
                    <a href="/admin/orders" className="Avtbox_users_initial">
                      {`${userInfo.name.charAt(0)}${userInfo.lastName.charAt(
                        0
                      )}`}
                    </a>
                  </div>
                  <div className="users_dropdown">
                    <div className="users_row">
                      <div className="users_column">
                        <li>
                          <a href="/admin/orders" className="hd_c">
                            Orders
                          </a>
                        </li>
                        <li>
                          <a href="/admin/products" className="hd_c">
                            Products
                          </a>
                        </li>
                        <li>
                          <a href="/admin/users" className="hd_c">
                            Users
                          </a>
                        </li>
                        <li
                          className="hd_c"
                          onClick={() => dispatch(logout())}
                          style={{ cursor: "pointer" }}
                        >
                          Log out
                        </li>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="cart_dropdown mt-2 pe-4">
                  <div className="miningCart">
                    <a className="hd_c mining_cart" href="/user/cart-details">
                      <GiMineWagon
                        className="mt-1"
                        style={{ fontSize: "2rem" }}
                      />
                      <Badge pill bg="danger" style={{ fontSize: "0.6rem" }}>
                        {itemsCount === 0 ? "" : cartItems?.length}
                      </Badge>
                    </a>
                  </div>
                  {itemsCount === 0 ? null : (
                    <div className="cart_dropdown_box">
                      <CartDropDown
                        addToCart={addToCart}
                        removeFromCart={removeFromCart}
                        editQuantity={editQuantity}
                        cartItems={cartItems}
                        cartSubtotal={cartSubtotal}
                        reduxDispatch={reduxDispatch}
                      />
                    </div>
                  )}
                </div>
              </>
            ) : userInfo.name && !userInfo.isAdmin ? (
              <>
                <div className="users_initial_dropdown mt-2 pe-4">
                  <div className="Avtbox">
                    <a href="/user/my-orders" className="Avtbox_users_initial">
                      {`${userInfo.name.charAt(0)}${userInfo.lastName.charAt(
                        0
                      )}`}
                    </a>
                  </div>
                  <div className="users_dropdown">
                    <div className="users_row">
                      <div className="users_column">
                        <li>
                          <a href="/user" className="hd_c">
                            My Profile
                          </a>
                        </li>
                        <li>
                          <a href="/user/my-orders" className="hd_c">
                            Orders
                          </a>
                        </li>
                        <li
                          className="hd_c"
                          onClick={() => dispatch(logout())}
                          style={{ cursor: "pointer" }}
                        >
                          Log out
                        </li>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ************   mining cart  ***************  */}
                {/*                   <LinkContainer className="hd_c mining_cart" to="/cart">
                    <Nav.Link>
                      <GiMineWagon
                        className="mt-1"
                        style={{ fontSize: "2rem" }}
                      />
                      <Badge pill bg="danger" style={{ fontSize: "0.6rem" }}>
                        {itemsCount === 0
                          ? ""
                          : "$ " + cartSubtotal.toLocaleString()}
                      </Badge>
                    </Nav.Link>
                  </LinkContainer> */}

                {/* *********** for test *********** */}
                <div className="cart_dropdown mt-2 pe-4">
                  <div className="miningCart">
                    <a className="hd_c mining_cart" href="/user/cart-details">
                      <GiMineWagon
                        className="mt-1"
                        style={{ fontSize: "2rem" }}
                      />
                      <Badge pill bg="danger" style={{ fontSize: "0.6rem" }}>
                        {itemsCount === 0 ? "" : cartItems?.length}
                      </Badge>
                    </a>
                  </div>
                  {itemsCount === 0 ? null : (
                    <div className="cart_dropdown_box">
                      <CartDropDown
                        addToCart={addToCart}
                        removeFromCart={removeFromCart}
                        editQuantity={editQuantity}
                        cartItems={cartItems}
                        cartSubtotal={cartSubtotal}
                        reduxDispatch={reduxDispatch}
                      />
                    </div>
                  )}
                </div>

                {/* ************   mining cart  ***************  */}
                {/*                   <LinkContainer className="hd_c" to="/cart">
                    <Nav.Link className="mining_cart">
                      <i
                        className="bi bi-minecart-loaded hd_c"
                        style={{ fontSize: "1.5rem" }}
                      ></i>
                      <Badge pill bg="danger" style={{ fontSize: "0.6rem" }}>
                        25000
                      </Badge>
                    </Nav.Link>
                  </LinkContainer> */}
              </>
            ) : (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
          {/* </Navbar.Collapse> */}
        </Container>
      </Navbar>
    </>
  );
};

export default HeaderComponent;
