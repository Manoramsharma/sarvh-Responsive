import { getDataAPI } from "../../utils/fetchData";
import { GLOBALTYPES } from "./globalTypes";

export const PROFILE_TYPES = {
  LOADING: "LOADING",
  GET_USER: "GET_USER",
};
export const getProfileUsers =
  ({ users, id, auth }) =>
  async dispatch => {
    if (users.every(user => user.username !== id)) {
      try {
        dispatch({ type: PROFILE_TYPES.LOADING, payload: true });
        const res = await getDataAPI(`/user/${id}`, auth.token);
        console.log(res);
        dispatch({
          type: PROFILE_TYPES.GET_USER,
          payload: res.data
        });
        dispatch({ type: PROFILE_TYPES.LOADING, payload: false });
      } catch (err) {
        console.log(err);
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { error: err.response.data.msg },
        });
      }
    }
  };
