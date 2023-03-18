import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './ProductItem.module.scss';
const cx = classNames.bind(styles);

function ProductItem({product}) {

    return (
        <div className={cx('product_card')}>
            <Link to={`/products/${product._id}`} onClick={() => console.log("OK")}>
                <img src={product.images.url} alt="" />
            </Link>
            

            <div className={cx('product_box')}>
                <Link to={`/products/${product._id}`}>
                    <h2 title={product.name}>{product.name}</h2>
                </Link>
                
                <span>${product.price}</span>
                <p>Nothing</p>
            </div>

        </div>
    )
}

export default ProductItem;
