import { Row, Col, Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import AdminLinksComponent from "../../../components/admin/AdminLinksComponent";
import { useState, useEffect } from "react";

const DeliveryBookComponent = ({ fetchDeliveryBooks, deleteDeliveryBook }) => {
    const [deliveryBooks, setDeliveryBooks] = useState([]);
    const [deliveryBookDeleted, setDeliveryBookDeleted] = useState(false);

    const deleteHandler = async (deliveryBookId) => {
        if (window.confirm("Are You Sure")) {
            const data = await deleteDeliveryBook(deliveryBookId);
            if (data.message === 'Delivery Book Deleted') {
                setDeliveryBookDeleted(!deliveryBookDeleted)
                window.location.reload(false)
            }
        }
    };

    useEffect(() => {
        const abctrl = new AbortController();
        fetchDeliveryBooks(abctrl)
            .then((res) => setDeliveryBooks(res))
            .catch((er) =>
                console.log(
                    er.response.data.message ? er.response.data.message : er.response.data
                )
            );
        return () => abctrl.abort();
    }, [deliveryBookDeleted]);

    return (
        <Row className="m-5">
            <Col md={2}>
                <AdminLinksComponent />
            </Col>
            <Col md={8}>
                <h1>Delivery Books List {" "}
                    <LinkContainer to="/admin/create-new-deliveryBook">
                        <Button variant="primary" size="lg">
                            Create new
                        </Button>
                    </LinkContainer>
                </h1>

                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th width="25%">Company Name</th>
                            <th width="25%">Email Host</th>
                            <th width="25%">Sites</th>
                            <th width="20%">Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deliveryBooks.map(
                            (book, idx) => (
                                <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>{book.companyName}</td>
                                    <td>{book.emailHost}</td>
                                    <td>{book.sites.map(
                                        (site, idy) => (
                                            <p>{site.name}</p>
                                        )
                                    )}
                                    </td>
                                    <td >
                                        <LinkContainer to={`/admin/edit-deliveryBook/${book._id}`}>
                                            <Button className="btn-sm">
                                                <i className="bi bi-pencil-square"></i>
                                            </Button>
                                        </LinkContainer>
                                        {" / "}
                                        <Button
                                            variant="danger"
                                            className="btn-sm"
                                            onClick={() => deleteHandler(book._id)}
                                        >
                                            <i className="bi bi-x-circle"></i>
                                        </Button>
                                    </td>

                                </tr>
                            )
                        )}
                    </tbody>
                </Table>

            </Col>
        </Row>

    );

};

export default DeliveryBookComponent;