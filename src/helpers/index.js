// fn: hàm format giá sản phẩm
const formatProductPrice = (giaban) => {
    // try{
    //   return new Intl.NumberFormat('vi-VN', {
    //     style: 'currency',
    //     currency: 'VND',
    //   }).format(giaban);
    // } catch(err) {
    //   console.log(err);
    // }
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(giaban);
};

export default {formatProductPrice};