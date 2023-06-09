import UserProfilePageComponent from "./components/UserProfilePageComponent";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setReduxUserState } from "../../redux/actions/userActions";
import UserLinksComponent from "../../components/user/UserLinksComponent";
import {
  Row,
  Col,
} from "react-bootstrap";

const updateUserApiRequest = async (
  name,
  lastName,
  email,
  phone,
  mobile,
  location,
  company,
  role,
  deliveryAddress,
  billAddress,
  state,
  // verified,
  postCode
) => {
  const { data } = await axios.put("/api/users/profile", {
    name,
    lastName,
    email,
    phone,
    mobile,
    location,
    company,
    role,
    deliveryAddress,
    billAddress,
    state,
    // verified,
    postCode,
  });
  return data;
};


const UserProfilePage = () => {
  const reduxDispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userRegisterLogin);


  const fetchUser = async (id) => {
    const { data } = await axios.get("/api/users/profile/" + id);
    return data;
  };


  const getdeliveryBooks = async () => {
    const { data } = await axios.get("/api/deliveryBooks/deliveryBook/" + userInfo.email);
    return data;
  };


  return (
    <Row className="m-5">
      <Col md={2}>
        <UserLinksComponent />
      </Col>
      <Col md={10}>
        <UserProfilePageComponent
          updateUserApiRequest={updateUserApiRequest}
          fetchUser={fetchUser}
          getdeliveryBooks={getdeliveryBooks}
          userInfoFromRedux={userInfo}
          setReduxUserState={setReduxUserState}
          reduxDispatch={reduxDispatch}
          localStorage={window.localStorage}
          sessionStorage={window.sessionStorage}
        />
      </Col>
    </Row>
  );
};

export default UserProfilePage;
