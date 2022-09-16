import * as PostApi from '../api/PostApi'

export const getTimelinePosts = (id)=> async(dispatch)=>{
    dispatch({type: "RETRIVE_START"})
  try {
    const {data} = await PostApi.getTimelinePosts(id);
    dispatch({type : "RETRIVE_SUCCESS", data : data})
  } catch (error) {
    console.log(error);
    dispatch({type: "RETRIVE_FAIL"})
  }
}