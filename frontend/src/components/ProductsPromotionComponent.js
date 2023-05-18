import { Carousel, Button, Container, Row, Col, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import "./page.css";
import "./promotion.css";

const ProductsPromotionComponent = () => {
  return (
    <>
<Row className="blocks_row">
    <Col xs={6} md={3} lg={3} className="blocks_col d-flex">
        <Card className="blocks_card h-100">
            <Card.Body className="blocks_card_body">
                <a href="/product-list?categoryName=SITE-SAFETY&subCategoryName=EMERGENCY-SHOWERS-EYEWASH">
                    <video className="w-100 promotional_video" autoPlay muted>
                        <source src="images2/EMERGENCY_SAFETY_SHOWER_PRATT.mp4" type="video/mp4" />
                    </video>
                </a>
            </Card.Body>
        </Card>
    </Col>

    <Col xs={6} md={3} lg={3} className="blocks_col d-flex">
        <Card className="blocks_card h-100">
            <Card.Body className="blocks_card_body">
                <a href="/product-list?categoryName=PPE&subCategoryName=HAND-PROTECTION">
                    <Card.Img variant="top" src="images/promotional/PIP_1.jpg" />
                </a>
            </Card.Body>
        </Card>
    </Col>

    <Col xs={6} md={3} lg={3} className="blocks_col d-flex">
        <Card className="blocks_card h-100">
            <Card.Body className="blocks_card_body">
                <a href="/product-list?categoryName=PPE&subCategoryName=EYE-PROTECTION">
                    <Card.Img variant="top" src="images/promotional/PROSA_block.jpg" />
                </a>
            </Card.Body>
        </Card>
    </Col>

    <Col xs={6} md={3} lg={3} className="blocks_col d-flex">
        <Card className="blocks_card h-100">
            <Card.Body className="blocks_card_body">
                <a href="/product-list?categoryName=HAND-TOOLS&subCategoryName=KNIVES">
                    <video className="w-100 promotional_video" autoPlay muted>
                        <source src="images2/RONSTA_knif.mp4" type="video/mp4" />
                    </video>
                </a>
            </Card.Body>
        </Card>
    </Col>
</Row>

    </>
  );
};

export default ProductsPromotionComponent;
