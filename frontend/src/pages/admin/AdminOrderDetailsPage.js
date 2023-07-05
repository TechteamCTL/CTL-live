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

const sendInv = async (id) => {
    const { data } = await axios.put("/api/orders/sendInv/" + id);
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
    const { data } = await axios.delete("/api/orders/removeItem/" + orderId + "/" + itemId);
    if (data) {
        return data;
    }
}

const getdeliveryBooks = async (email) => {
    const { data } = await axios.get("/api/deliveryBooks/deliveryBook/" + email);
    return data;

};

const updateDeliverySite = async (orderId, deliverySite) => {
    const { data } = await axios.put("/api/orders/deliverySite/" + orderId, { deliverySite: deliverySite });
    return data;
  };

const AdminOrderDetailsPage = () => {
    const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);

    const getUser = async () => {
        const { data } = await axios.get("/api/users/profile/" + userInfo._id);
        return data;
    };

    return <OrderDetailsPageComponent getOrder={getOrder} getUser={getUser} markAsDelivered={markAsDelivered} markAsPaid={markAsPaid} sendInv={sendInv} updateBackOrder={updateBackOrder} removeOrderItem={removeOrderItem} getdeliveryBooks={getdeliveryBooks} adminUpdateDeliverySite={updateDeliverySite} />
};

export default AdminOrderDetailsPage;

