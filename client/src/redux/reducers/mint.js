import { SET_MINT, SET_MINTS } from "../actions/mints";

const initialState = {
  mints: {},
};

const mintReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MINT:
      return {
        ...state,
        mints: {
          ...state.mints,
          [action.payload._id]: { id: action.payload._id, ...action.payload },
        },
      };

    case SET_MINTS:
      return {
        ...state,
        mints: {
          ...state.mints,
          ...action.payload.reduce((acc, mint) => {
            acc[mint._id] = { ...mint, id: mint._id };
            return acc;
          }, {}),
        },
      };

    default:
      return state;
  }
};

export default mintReducer;
