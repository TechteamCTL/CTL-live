import { Row, Col, Container, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EditUserPageComponent = ({ updateUserApiRequest, fetchUser }) => {
  const [validated, setValidated] = useState(false);
  const [user, setUser] = useState([]);
  const [isAdminState, setIsAdminState] = useState(false);
  const [verified, setVerified] = useState(false);
  const [updateUserResponseState, setUpdateUserResponseState] = useState({
    message: "",
    error: "",
  }); // handling errors and messages

  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;
    const name = form.name.value;
    const lastName = form.lastName.value;
    const email = form.email.value;
    const deliveryAddress = form.deliveryAddress.value;
    const billAddress = form.billAddress.value;
    let ipAddress = form.ipAddress.value;
    const isAdmin = form.isAdmin.checked;
    const verified = form.verified.checked;

    // Set ipAddress to "" if "remove" is entered
    if (ipAddress === "remove") {
      ipAddress = "";
    }

    if (event.currentTarget.checkValidity() === true) {
      updateUserApiRequest(
        id,
        name,
        lastName,
        email,
        ipAddress,
        isAdmin,
        verified,
        deliveryAddress,
        billAddress,
      )
        .then((data) => {
          if (data === "user updated") {
            navigate("/admin/users");
          }
        })
        .catch((er) => {
          setUpdateUserResponseState({
            error: er.response.data.message
              ? er.response.data.message
              : er.response.data,
          });
        });
    }

    setValidated(true);
  };

  useEffect(() => {
    fetchUser(id)
      .then((data) => {
        setUser(data);
        // console.log("useruseruseruser", data);
        setIsAdminState(data.isAdmin);
        setVerified(data.verified);
      })
      .catch((er) =>
        console.log(
          er.response.data.message ? er.response.data.message : er.response.data
        )
      );
  }, [id]);

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={1}>
          <Link to="/admin/users" className="btn btn-info my-3">
            Go Back
          </Link>
        </Col>
        <Col md={6}>
          <h1>Edit user</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicFirstName">
              <Form.Label>First name</Form.Label>
              <Form.Control
                name="name"
                required
                type="text"
                defaultValue={user.name}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                name="lastName"
                required
                type="text"
                defaultValue={user.lastName}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                required
                type="email"
                defaultValue={user.email}
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDeliveryAddress">
              <Form.Label>Delivery Address</Form.Label>
              <Form.Control
                name="deliveryAddress"
                required
                type="txt"
                defaultValue={user.deliveryAddress}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicBillAddress">
              <Form.Label>Bill Address</Form.Label>
              <Form.Control
                name="billAddress"
                required
                type="txt"
                defaultValue={user.billAddress}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicipAddress">
              <Form.Label>
                IP Address (enter 'remove' to remove IP address)
              </Form.Label>
              <Form.Control
                name="ipAddress"
                required
                type="text"
                defaultValue={user.ipAddress}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicIsAdmin">
              <Form.Check
                name="isAdmin"
                type="checkbox"
                label="Is admin"
                checked={isAdminState}
                onChange={(e) => setIsAdminState(e.target.checked)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicVerified">
              <Form.Check
                name="verified"
                type="checkbox"
                label="Verified"
                checked={verified}
                onChange={(e) => setVerified(e.target.checked)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              UPDATE
            </Button>
            {updateUserResponseState.error}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditUserPageComponent;
