import {
  CREATE_ROOM,
  EDIT_ROOM,
  DELETE_ROOM,
  FETCH_ROOM,
  FETCH_ROOMS,
} from "../action/type";
import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_ROOMS:
      return { ...state, ..._.mapKeys(action.payload, "_id") };
    case FETCH_ROOM:
      return { ...state, [action.payload._id]: action.payload };
    case CREATE_ROOM:
      return { ...state, [action.payload._id]: action.payload };
    case EDIT_ROOM:
      return { ...state, [action.payload._id]: action.payload };
    case DELETE_ROOM:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
