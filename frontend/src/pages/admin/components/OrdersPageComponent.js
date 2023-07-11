import { Row, Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdminLinksComponent from "../../../components/admin/AdminLinksComponent";
import { TableHeader, Pagination, Search } from "../../../components/DataTable";

import { useEffect, useState, useMemo } from "react";

const OrdersPageComponent = ({ getOrders, deleteOrder }) => {
  const [orders, setOrders] = useState([]);
  const [orderDeleted, setOrderDeleted] = useState(false);

  // orders.push("cartSubtotal", orders.orderTotal.cartSubtotal);
  // orders.push("username", orders.user.name + orders.user.lastName);

  /* sort table */
  // #region
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  // const [sorting, setSorting] = useState({ field: "", order: "" });
  const [sorting, setSorting] = useState({ field: "createdAt", order: "desc" });

  const ITEMS_PER_PAGE = 40;

  const headers = [
    { name: "No#", field: "index", sortable: false },
    { name: "Customer Name", field: "name", sortable: false },
    { name: "Date", field: "createdAt", sortable: true },
    { name: "Total", field: "orderTotal", sortable: false },
    { name: "Sent", field: "isDelivered", sortable: true },
    { name: "Paid", field: "isPaid", sortable: true },
    { name: "PO#", field: "purchaseNumber", sortable: true },
    { name: "Order Name", field: "orderNote", sortable: true },
    { name: "Order details", field: "_id", sortable: false },
    { name: "Delete", field: "", sortable: false },
  ];

  const ordersData = useMemo(() => {
    let computedOrders = orders;
    console.log("örders", orders);
    if (search) {
      computedOrders = computedOrders.filter(
        (orders) =>
          orders.createdAt.toUpperCase().includes(search.toUpperCase()) ||
          orders.purchaseNumber.toUpperCase().includes(search.toUpperCase()) ||
          orders.orderNote?.toUpperCase().includes(search.toUpperCase()) ||
          (
            orders.user.name.toUpperCase() +
            " " +
            orders.user.lastName.toUpperCase()
          ).includes(search.toUpperCase())
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
      .then((orders) => setOrders(orders))
      .catch((er) =>
        console.log(
          er.response.data.message ? er.response.data.message : er.response.data
        )
      );
  }, [orderDeleted]);

  const deleteHandler = async (orderId) => {
    if (window.confirm("Are you sure?")) {
      deleteOrder(orderId);
      setOrderDeleted(true);
      setTimeout(() => {
        setOrderDeleted(false)
      }, 500);
    }
  };

  return (
    <Row className="m-5">
      <Col md={2}>
        <AdminLinksComponent />
      </Col>
      <Col md={10}>
        <h1>ORDERS</h1>
        <div className="row">
          <div className="col-md-6">
            <Pagination
              total={totalItems}
              itemsPerPage={ITEMS_PER_PAGE}
              currentPage={currentPage}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
          <div className="col-md-6 d-flex flex-row-reverse">
            <Search
              onSearch={(value) => {
                setSearch(value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
        <table className="table table-striped">
          <TableHeader
            headers={headers}
            onSorting={(field, order) => setSorting({ field, order })}
          />
          <tbody>
            {ordersData.map((order, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>
                  {order.user !== null ? (
                    <>
                      {order.user.name} {order.user.lastName}
                    </>
                  ) : null}
                </td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>$ {order.orderTotal.cartSubtotal.toLocaleString()}</td>
                <td>
                  {order.isDelivered ? (
                    <a
                      href={order.trackLink}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "green" }}
                    >
                      <i className="bi bi-truck"></i>
                    </a>
                  ) : (
                    <i className="bi bi-x-lg text-danger"></i>
                  )}
                </td>
                {/* <td>{order.paymentMethod}</td> */}
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
                  <Link to={`/admin/order-details/${order._id}`}>
                    Go to Order
                  </Link>
                </td>
                <td>
                  <button
                    variant="danger"
                    className="btn-sm btn-light"
                    onClick={() => deleteHandler(order._id)}
                    style={{ border: "none" }}
                  >
                    <i className="bi bi-x-circle"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Col>
    </Row>
  );
};

export default OrdersPageComponent;
