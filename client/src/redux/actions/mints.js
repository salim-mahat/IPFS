import axios from "axios";

export const SET_MINT = "SET_MINT";
export const SET_MINTS = "SET_MINTS";

export const createMint = (mintData) => (dispatch) => {
  const formData = new FormData();
  for (const key in mintData) {
    formData.append(key, mintData[key]);
  }
  console.log(formData);
  axios
    .post("/api/asset/", formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    })
    .then((res) => {
      if (res.data.status === "success") {
        dispatch({
          type: SET_MINT,
          payload: res.data.mint,
        });
      }
    });
};

export const getMints = () => (dispatch) => {
  axios.get("/api/asset/").then((res) => {
    if (res.data) {
      dispatch({
        type: SET_MINTS,
        payload: res.data,
      });
    }
  });
};
