import PropTypes from 'prop-types';


function Upload(props) {
    const { products } = props;
    const {_id ,ten, imglink, giaban, loai } = products;
    // const {_id, maloai, ten, sanpham} = products.loai;

    return <h2>Upload {ten}</h2>
}

Upload.propTypes = {
    products: PropTypes.object,
  };

export default Upload;