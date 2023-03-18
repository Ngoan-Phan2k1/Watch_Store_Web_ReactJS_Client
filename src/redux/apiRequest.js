import axios from "axios";
import { loginFailed, loginStart, loginSuccess, registerStart, registerSuccess, registerFailed, logoutSuccess, logoutFailed, logoutStart } from "./authSlice";

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try{
        const res = await axios.post("http://localhost:8000/v1/auth/login", user);
        dispatch(loginSuccess(res.data));
        navigate("/");
    } catch(err) {
        dispatch(loginFailed());
    }
}

export const registerUser = async(user, dispatch, navigate) => {
    dispatch(registerStart());
    try{
        await axios.post("http://localhost:8000/v1/auth/register", user);
        dispatch(registerSuccess());
        navigate();
    } catch(err) {
        dispatch(registerFailed());
    }
}

// export const logOut = async(dispatch,id,navigate, accessToken, axiosJWT) => {
//     dispatch(logoutStart());
//     try{
//         await axiosJWT.post("http://localhost:8000/v1/auth/logout", id, {
//             headers: {token: `Bearer ${accessToken}`}
//         });
//         dispatch(logoutSuccess());
//         navigate("/form");
//     } catch (err) {
//         dispatch(logoutFailed());
//     }
// }


export const logOut = async(dispatch,id,navigate, accessToken) => {
    dispatch(logoutStart());
    try{
        await axios.post("http://localhost:8000/v1/auth/logout", id, {
            headers: {token: `Bearer ${accessToken}`}
        });
        dispatch(logoutSuccess());
        navigate("/form");
    } catch (err) {
        dispatch(logoutFailed());
    }
}

