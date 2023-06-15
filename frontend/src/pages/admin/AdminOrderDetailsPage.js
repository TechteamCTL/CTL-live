import OrderDetailsPageComponent from './components/OrderDetailsPageComponent'
import { useSelector } from "react-redux";

import axios from "axios";

const getOrder = async (id) => {
    const { data } = await axios.get("/api/orders/user/" + id);
    return data
}

const markAsDelivered = async (id) => {
    const { data } = await axios.put("/api/orders/delivered/" + id);
    if (data) {
        return data;
    }
}

const markAsPaid = async (id) => {
    const { data } = await axios.put("/api/orders/paid/" + id);
    if (data) {
        return data;
    }
}

/* const updateBackOrder = async (orderId, itemId, suppliedQty) => {
    const { data } = await axios.put("/api/orders/updateBackOrder/" + orderId, itemId, suppliedQty);
    if (data) {
        return data;
    }
} */
const updateBackOrder = async (orderId, itemId, suppliedQty) => {
    const { data } = await axios.put("/api/orders/updateBackOrder/" + orderId + "/" + itemId, { suppliedQty });
    if (data) {
        return data;
    }
}

const removeOrderItem = async (orderId, itemId) => {
    const { data } = await axios.delete("/api/orders/delete/" + orderId + "/" + itemId);
    if (data) {
        return data;
    }
}

const AdminOrderDetailsPage = () => {
    const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);

    const getUser = async () => {
        const { data } = await axios.get("/api/users/profile/" + userInfo._id);
        return data;
    };
    return <OrderDetailsPageComponent getOrder={getOrder} getUser={getUser} markAsDelivered={markAsDelivered} markAsPaid={markAsPaid} updateBackOrder={updateBackOrder} removeOrderItem={removeOrderItem} />
};

export default AdminOrderDetailsPage;

