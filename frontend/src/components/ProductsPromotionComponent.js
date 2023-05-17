import { Carousel, Button, Container, Row, Col, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import "./page.css";
import "./promotion.css";

const ProductsPromotionComponent = () => {
  return (
    <>
      <Row className="blocks_row">
        <Col xs={6} md={4} lg={4} className="blocks_col">
          <Card className="blocks_card">
            <Card.Body className="blocks_card_body">
              <a href="http://localhost:3000/product-list?categoryName=ELECTRICAL&subCategoryName=ENCLOSURES">
                <Card.Img variant="top" src="images/promotional/PIP_1.jpg" />
              </a>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={6} md={4} lg={4} className="blocks_col">
          <Card className="blocks_card">
            <Card.Body className="blocks_card_body">
              <a href="http://localhost:3000/product-list?categoryName=ELECTRICAL&subCategoryName=ENCLOSURES">
                <Card.Img variant="top" src="images/promotional/PIP_1.jpg" />
              </a>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={6} md={4} lg={4} className="blocks_col">
          <Card className="blocks_card">
            <Card.Body className="blocks_card_body">
              <a href="http://localhost:3000/product-list?categoryName=ELECTRICAL&subCategoryName=ENCLOSURES">
                <Card.Img variant="top" src="images/promotional/PIP_1.jpg" />
              </a>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductsPromotionComponent;
