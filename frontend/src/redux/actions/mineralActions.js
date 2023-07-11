import axios from "axios";
import * as actionTypes from "../constants/mineralConstants";

export const getMineralPrices = () => async (dispatch) => {
    try {
        const { data } = await axios.get("/api/mineralSharePrice/minerals");
        dispatch({
          type: actionTypes.FETCH_MINERALS,
          payload: data,
        });
        localStorage.setItem("minerals", JSON.stringify(data));
      } catch (error) {
        console.log(error);
      }
    
    
/*     try {
        // const minerals = response.data;
        dispatch({ type: actionTypes.FETCH_MINERALS, payload: data });
        localStorage.setItem("minerals", JSON.stringify(data));
    } catch (error) {
      console.log(error);
    } */
  };


