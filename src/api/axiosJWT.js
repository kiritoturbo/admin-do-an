import axios from "axios";
import store from "../myStore";
import { jwtDecode } from "jwt-decode";
import { REFRESH_TOKEN } from "../action/type";

const axiosJWT = axios.create();

axiosJWT.defaults.headers.common["authorization"] =
  "Bearer " + store.getState().auth.accessToken;

const refreshToken = async () => {
  try {
    const res = await axios.post("/authentication/refresh-token", {
      refreshToken: store.getState().auth.refreshToken,
    });
    store.dispatch({
      type: REFRESH_TOKEN,
      payload: res.data.accessToken,
    });
    return res.data.accessToken;
  } catch (err) {
    console.log(err);
  }
};

axiosJWT.interceptors.request.use(
  async (config) => {
    let currentDate = new Date();
    const decodedToken = jwtDecode(store.getState().auth.accessToken);

    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      try {
        const data = await refreshToken();
        config.headers["authorization"] = "Bearer " + data;
      } catch (err) {
        console.log(err);
        // Handle error, maybe redirect to login or perform other actions
      }
    }

    return config; // Move this line inside the if block if needed
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosJWT;
