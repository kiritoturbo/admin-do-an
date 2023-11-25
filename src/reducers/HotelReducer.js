import {
  FETCH_HOTEL,
  FETCH_HOTELS,
  CREATE_HOTEL,
  EDIT_HOTEL,
  DELETE_HOTEL,
} from "../action/type";
import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_HOTELS:
      return { ...state, ..._.mapKeys(action.payload, "_id") };
    case FETCH_HOTEL:
      return { ...state, [action.payload._id]: action.payload };
    case CREATE_HOTEL:
      return { ...state, [action.payload._id]: action.payload };
    case EDIT_HOTEL:
      return { ...state, [action.payload._id]: action.payload };
    case DELETE_HOTEL:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
