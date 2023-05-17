import ProductCarouselComponent from "../components/ProductCarouselComponent";
import ProductsPromotionComponent from "../components/ProductsPromotionComponent";
import CountDownComponent from "../components/CountDownComponent";
import { LinkContainer } from "react-router-bootstrap";
import { Row, Container, Card, Col } from "react-bootstrap";


import "./general.css"
import FingerprintJS from '@fingerprintjs/fingerprintjs'



const HomePage = () => {
  const onHover = {
    cursor: "pointer",
  }

// TODO: fingerprint 不用就删掉，还是import的
// Generate a browser fingerprint
const fpPromise = FingerprintJS.load()
const getFingerprint = async () => {
  const fp = await fpPromise
  const result = await fp.get()
  const fingerprint = result.visitorId

  // Store the fingerprint in a cookie
  document.cookie = `fingerprint=${fingerprint}; path=/;`

  // Log the fingerprint for testing purposes
  console.log(`Browser fingerprint: ${fingerprint}`)
}

// 725445157ef96c91722783e104fe4462

getFingerprint()


  return (
    <>

      {/* ************   Carousel  ***************  */}
      <ProductCarouselComponent />

      {/* ************   daily deal top3  ***************  */}
      {/* <ProductsPromotionComponent /> */}

      {/* ************   Bottom Haxegon Categories  ***************  */}
      <div className="bg-light w-100">
        <Container>
          <div className="o_p_box">
            <h1 className="o_p">
              OUR PRODUCTS
            </h1>
          </div>
        </Container>
        <Container className="bigbox">
          <Row xs={2} md={3} lg={4} xl={5} className="g-4">
            <Col>
              <LinkContainer style={onHover} to="/product-list?categoryName=PPE">
                <div className='box'>
                  <div className="box1">
                    <div className="box2">
                      <div className="box3">
                        <img className='img_ppe' src='/images/products/ppe.png' alt="" />
                        <p className='hexagon_PPE'>PPE</p>
                      </div>
                    </div>
                  </div>
                </div>
              </LinkContainer>
            </Col>
            <Col>
              <LinkContainer style={onHover} to="/product-list?categoryName=HAND-TOOLS">
                <div className='box'>
                  <div className="box1">
                    <div className="box2">
                      <div className="box3">
                        <img className='img_handtools' src='/images/products/handtools.png' alt="" />
                        <p className='hexagon_PowerTools'>HAND TOOLS</p>
                      </div>
                    </div>
                  </div>
                </div>
              </LinkContainer>
            </Col>
            <Col>
              <LinkContainer style={onHover} to="/product-list?categoryName=ELECTRICAL">
                <div className='box'>
                  <div className="box1">
                    <div className="box2">
                      <div className="box3">
                        <img className='img_electrical' src='/images/products/electrical.png' alt="" />
                        <p className='hexagon_electrical'>ELECTRICAL</p>
                      </div>
                    </div>
                  </div>
                </div>
              </LinkContainer>
            </Col>
            <Col>
              <LinkContainer style={onHover} to="/product-list?categoryName=SITE-SAFETY">
                <div className='box'>
                  <div className="box1">
                    <div className="box2">
                      <div className="box3">
                        <img className='img_siteSafety' src='/images/products/siteSafety.png' alt="" />
                        <p className='hexagon_hydration'>SITE SAFETY</p>
                      </div>
                    </div>
                  </div>
                </div>
              </LinkContainer>
            </Col>
            <Col>
              <LinkContainer style={onHover} to="/product-list?categoryName=INDUSTRIAL">
                <div className='box'>
                  <div className="box1">
                    <div className="box2">
                      <div className="box3">
                        <img className='img_mechanical_up' src='/images/products/gear.png' alt="" />
                        <img className='img_mechanical_down' src='/images/products/gear.png' alt="" />
                        <p className='hexagon_mechanical'>INDUSTRIAL</p>
                      </div>
                    </div>
                  </div>
                </div>
              </LinkContainer>
            </Col>
          </Row>
          <LinkContainer to="/product-list" className="allproducts_box">
            <button className="allproducts bg-light">ALL PRODUCTS</button>
          </LinkContainer>
        </Container>
      </div>
    </>
  );
};

export default HomePage;
