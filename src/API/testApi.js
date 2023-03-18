import axiosClient from "./axiosClient";

const testApi = {
    getProduct: (id) => {
        const url = `/v1/sanpham/${id}`;
        //console.log(id);
        return axiosClient.get(url);
      },
}

export default testApi;



