import {
    Row,
    Col,
    Container,
    Form,
    Button,
    CloseButton,
    Table,
    Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";


const CreateDeliveryBookComponent = ({
    createDeliveryBookApiRequest,
}) => {
    const [validated, setValidated] = useState(false);
    const [createDeliveryBookResponseState, setCreateDeliveryBookResponseState] = useState({
        message: "",
        error: "",
    });

    const [rowCount, setRowCount] = useState(1);
    const handleNewDeliveryBook = () => {
        setRowCount(rowCount + 1);
    };
    const handleRemoveDeliveryBook = () => {
        setRowCount(rowCount - 1);
    };

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget.elements;

        const sites = [];
        for (
            let i = 0;
            i < document.querySelectorAll(".text-primary").length;
            i++
        ) {
            const name = document.getElementsByName(`name-${i}`)[0].value;
            const billingAddress = document.getElementsByName(`billingAddress-${i}`)[0].value;
            const deliveryAddress = document.getElementsByName(`deliveryAddress-${i}`)[0].value;
            sites.push({
                name,
                billingAddress,
                deliveryAddress,

            });
        }

        const formInputs = {
            companyName: form.companyName.value,
            emailHost: form.emailHost.value,
            sites: sites,
        };

        if (event.currentTarget.checkValidity() === true) {
            createDeliveryBookApiRequest(formInputs)
                .then((data) => {
                    if (data.message === "Delivery Book Created") navigate("/admin/deliveryBooks");
                })
                .catch((er) => {
                    setCreateDeliveryBookResponseState({
                        error: er.response.data.message
                            ? er.response.data.message
                            : er.response.data,
                    });
                });

        }
        setValidated(true);
    };
    const checkKeyDown = (e) => {
        if (e.code === "Enter") e.preventDefault();
    };

    return (
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Row>
                    <Col md={1}>
                        <Link to="/admin/deliveryBooks" className="btn btn-info my-3">Go Back</Link>
                    </Col>
                    <Col md={8}>
                        <h1>Create New Delivery Book</h1>
                        <Form
                            noValidate
                            validated={validated}
                            onSubmit={handleSubmit}
                            onKeyDown={(e) => checkKeyDown(e)}
                        >
                            <Form.Group className="mb-3" controlId="formBasicCompanyName">
                                <Form.Label>Company Name</Form.Label>
                                <Form.Control name="companyName" required type="text" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmailHost">
                                <Form.Label>Email Host</Form.Label>
                                <Form.Control name="emailHost" required type="text" />
                            </Form.Group>


                            {[...Array(rowCount)].map((_, index) => (

                                <>
                                    <span className="text-primary">Site: {index + 1}</span>
                                    <Row>
                                        <React.Fragment key={index}>
                                            <Form.Group
                                                as={Col}
                                                md="3"
                                                className="mb-3"
                                                controlId={`formBasicName-${index}`}
                                            >
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control
                                                    name={`name-${index}`}
                                                    required
                                                    type="text"
                                                />
                                            </Form.Group>

                                            <Form.Group
                                                as={Col}
                                                md="4"
                                                className="mb-3"
                                                controlId={`formBasicBillingAddress-${index}`}
                                            >
                                                <Form.Label>Billing Address </Form.Label>
                                                <Form.Control
                                                    name={`billingAddress-${index}`}
                                                    required
                                                    type="text"
                                                />
                                            </Form.Group>

                                            <Form.Group
                                                as={Col}
                                                md="4"
                                                className="mb-3"
                                                controlId={`formBasicDeliveryAddress-${index}`}
                                            >
                                                <Form.Label>Delivery Address </Form.Label>
                                                <Form.Control
                                                    name={`deliveryAddress-${index}`}
                                                    required
                                                    type="text"
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col} md="1" className="mb-3">
                                                <i
                                                    className="bi bi-trash mt-3"
                                                    onClick={handleRemoveDeliveryBook}
                                                    style={{
                                                        cursor: "pointer",
                                                    }}
                                                ></i>
                                            </Form.Group>
                                        </React.Fragment>
                                    </Row>
                                </>
                            ))}
                            <hr />
                            <p
                                onClick={handleNewDeliveryBook}
                                style={{
                                    cursor: "hand",
                                    textAlign: "center",
                                    fontStyle: "italic",
                                }}>
                                Add New Site
                            </p>
                            <hr />

                            <Button variant="primary" type="submit">
                                Create
                            </Button>

                            <Link to="/admin/deliveryBooks" className="btn btn-secondary ms-5">
                                Cancel
                            </Link>
                            <p></p>
                            {createDeliveryBookResponseState.error ?? ""}

                        </Form>
                    </Col>
                </Row>

            </Row>
        </Container>
    );


};

export default CreateDeliveryBookComponent;