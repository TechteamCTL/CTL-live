import { Row, Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import UserLinksComponent from "../../../components/user/UserLinksComponent";
import { TableHeader, Pagination, Search } from "../../../components/DataTable";


const UserOrdersPageComponent = ({ getOrders }) => {
  const [orders, setOrders] = useState([]);

  /* sort table */
  // #region
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  // const [sorting, setSorting] = useState({ field: "", order: "" });
  const [sorting, setSorting] = useState({ field: "createdAt", order: "desc" });


  const ITEMS_PER_PAGE = 20;

  const headers = [
    { name: "No#", field: "index", sortable: false },
    { name: "Date", field: "createdAt", sortable: true },
    { name: "Price", field: "cartSubtotal", sortable: false },
    { name: "Delivered", field: "isDelivered", sortable: true },
    { name: "Paid", field: "isPaid", sortable: true },
    { name: "PO#", field: "purchaseNumber", sortable: true },
    { name: "Order Name", field: "orderNote", sortable: true },
    { name: "Order details", field: "_id", sortable: false }

  ];


  const ordersData = useMemo(() => {
    let computedOrders = orders;

    if (search) {
      computedOrders = computedOrders.filter(
        orders =>
          orders.createdAt.toUpperCase().includes(search.toUpperCase()) ||
          orders.purchaseNumber.toUpperCase().includes(search.toUpperCase()) ||
          orders.orderNote?.toUpperCase().includes(search.toUpperCase())
      );
    }

    setTotalItems(computedOrders.length);

    //Sorting products
    // as localeCompare only can compare String, we have to update it as below.
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedOrders = computedOrders.sort((a, b) => {
        const fieldA = a[sorting.field];
        const fieldB = b[sorting.field];

        if (typeof fieldA === "number" && typeof fieldB === "number") {
          return reversed * (fieldA - fieldB);
        } else if (typeof fieldA === "string" && typeof fieldB === "string") {
          return reversed * fieldA.localeCompare(fieldB);
        } else {
          // If field types are different, compare their string representations
          return reversed * String(fieldA).localeCompare(String(fieldB));
        }
      });
    }

    //Current Page slice
    return computedOrders.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [orders, currentPage, search, sorting]);
  // #endregion



  useEffect(() => {
    getOrders()
      .then(orders => setOrders(orders))
      .catch((er) => console.log(er));
  }, [])

  return (
    <Row className="m-5">
      <Col md={2}>
        <UserLinksComponent />
      </Col>
      <Col md={10}>
        <h1>MY ORDERS</h1>
        <div className="row">
          <div className="col-md-6">
            <Pagination
              total={totalItems}
              itemsPerPage={ITEMS_PER_PAGE}
              currentPage={currentPage}
              onPageChange={page => setCurrentPage(page)}
            />
          </div>
          <div className="col-md-6 d-flex flex-row-reverse">
            <Search
              onSearch={value => {
                setSearch(value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
        <table className="table table-striped">
          <TableHeader
            headers={headers}
            onSorting={(field, order) =>
              setSorting({ field, order })
            }
          />
          <tbody>
            {ordersData.map(
              (order, idx) => (
                <tr key={idx} >
                  <td>{idx + 1}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.orderTotal.cartSubtotal}</td>
                  <td>
                    {order.isDelivered ? <i className="bi bi-check-lg text-success"></i> : <i className="bi bi-x-lg text-danger"></i>}
                  </td>
                  <td>
                    {order.isPaid ? (
                      <i className="bi bi-check-lg text-success"></i>
                    ) : (
                      <i className="bi bi-x-lg text-danger"></i>
                    )}
                  </td>
                  <td>{order.purchaseNumber}</td>
                  <td>{order.orderNote}</td>
                  <td>
                    <Link to={`/user/order-details/${order._id}`}>go to order</Link>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
        <div className="row">
          <div className="col-md-6">
            <Pagination
              total={totalItems}
              itemsPerPage={ITEMS_PER_PAGE}
              currentPage={currentPage}
              onPageChange={page => setCurrentPage(page)}
            />
          </div>
        </div>

        {/*         <Table striped bordered hover>
          <tbody>
            {orders.map(
              (order, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td> $ {order.orderTotal.cartSubtotal.toLocaleString()}</td>
                  <td>
                    {order.isDelivered ? <i className="bi bi-check-lg text-success"></i> : <i className="bi bi-x-lg text-danger"></i>}
                  </td>
                  <td>
                  {order.isPaid ? (
                    <i className="bi bi-check-lg text-success"></i>
                  ) : (
                    <i className="bi bi-x-lg text-danger"></i>
                  )}
                </td>
                  <td>
                    <Link to={`/user/order-details/${order._id}`}>go to order</Link>
                  </td>
                  <td>
                    
                    <Link to={`/user/order-details/${order._id}`}>{order.purchaseNumber}</Link>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </Table> */}
      </Col>
    </Row>
  );
};

export default UserOrdersPageComponent;

