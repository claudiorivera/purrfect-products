import axios from "axios";
import Cookie from "js-cookie";

const loginUser = (email, password) => async (dispatch) => {
  dispatch({ type: "LOGIN_USER_REQUEST", payload: { email, password } });
  try {
    const { data } = await axios.post("/api/users/login", { email, password });
    dispatch({ type: "LOGIN_USER_SUCCESSFUL", payload: data });
    Cookie.set("user", JSON.stringify(data));
  } catch (error) {
    dispatch({ type: "LOGIN_USER_FAILED", payload: error.message });
  }
};

export { loginUser };
