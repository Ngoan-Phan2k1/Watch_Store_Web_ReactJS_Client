import axios from "axios";

function callApi(endpoint, method, body) {
    return axios({
        method: method,
        url: `http://localhost:8000/v1/${endpoint}`,
        data: body
    }).catch(err => {
        console.log(err);
    })
}

export default callApi;