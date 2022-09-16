import * as UserApi from "../api/UserApi";
export const updateUser = (id, FormData) => async (dispatch) => {
  dispatch({ type: "UPDATING_START" });

  try {
    const { data } = await UserApi.updateUser(id, FormData);
    dispatch({ type: "UPDATING_SUCCESS", data: data });
  } catch (error) {
    dispatch({ type: "UPDATING_FAIL" });
  }
};

export const followUser = (id, data) => async (dispatch) => {
  dispatch({ type: "FOLLOW_USER" });
  UserApi.followUser(id, data);
  UserApi.createChat(data._id, id);
};

export const unfollowUser = (id, data) => async (dispatch) => {
  console.log(data._id);
  console.log(id);
  dispatch({ type: "UNFOLLOW_USER" });
  UserApi.unfollowUser(id, data);
  UserApi.deleteChat(data._id, id);
};
