import * as AuthApi from '../api/Authapi'

export const logIn = (FormData) => async (dispatch) => {
    dispatch({ type: "AUTH_START" })

    try {
        const { data } = await AuthApi.logIn(FormData)
        dispatch({ type: "AUTH_SUCCESS", data: data })
      
    } catch (error) {

        console.log(error)

        dispatch({ type: "AUTH_FAILED" })
    }



}

export const signUP = (FormData) => async (dispatch) => {
    dispatch({ type: "AUTH_START" })

    try {
        const { data } = await AuthApi.signUP(FormData)
        dispatch({ type: "AUTH_SUCCESS", data: data })
    } catch (error) {

        console.log(error)

        dispatch({ type: "AUTH_FAILED" })
    }
}

export const logout = ()=> async(dispatch)=>{
    dispatch({type: "LOG_OUT"})
}