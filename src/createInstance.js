import axios from "axios";
import jwt_decode from "jwt-decode";

const refreshToken = async (user) => {
    try{
      console.log(user);

      const res = await axios.post("http://localhost:8000/v1/auth/refresh",user, {
        //withCredentials: true,
        headers: {token: user?.refreshToken}
      });
      return res.data;
    } catch(err) {
      console.log(err);
    }
}

export const createAxios = (user, dispatch, stateSuccess) => {
    const newInstance = axios.create();
    newInstance.interceptors.request.use(
        async(config) => {
          let date = new Date();
          const decodedToken = jwt_decode(user?.accessToken);
          if(decodedToken.exp < date.getTime()/1000){
            const refresh = user.refreshToken;
            const data = await refreshToken(user);

            //console.log("data refreshToken", data.accessToken);

            const refreshUser = {
              ...user,
              accessToken: data.accessToken,
            };
            dispatch(stateSuccess(refreshUser));
            config.headers["token"] = "Bearer " + data.accessToken;
          }
          return config;
        },
        (err) => {
          return Promise.reject(err);
        }
    )
    return newInstance;
}



