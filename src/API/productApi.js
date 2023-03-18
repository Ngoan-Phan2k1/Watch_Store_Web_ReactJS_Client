import axios from "axios"; 
import axiosClient from "./axiosClient";


function getOneProduct(id, method, body) {
    return axios({
        method: method,
        url: `http://localhost:8000/v1/sanpham/${id}`,
        data: body
    }).catch(err => {
        console.log(err);
    })
}


// const productApi = {
//     getProduct: (id) => {
//         const url = 'http://localhost:8000/v1/sanpham/';
//         return axiosClient.get(url, { params: { id } });
//       },
// }

export default getOneProduct;