import Header from "~/components/Layout/components/Header";
import { useEffect, useState, useRef, useContext } from 'react';
import { DataContext } from '~/components/DataProvider/DataProvider';


import classNames from 'classnames/bind';
import styles from './OrderDetailHistory.module.scss';
import { Link, useParams } from "react-router-dom";
import helpers from '~/helpers';

const cx = classNames.bind(styles);

function OrderDetailHistory(){

    const value = useContext(DataContext);
    const [history] = value.UserAPI.history;
    const [orderDetails, setOrderDetails] = useState([]);
    const params = useParams()

    useEffect(() => {
        if(params.id){
            history.forEach(item => {
                if(item._id === params.id) setOrderDetails(item);
            })
        }
    }, [params.id, history])

    //console.log(orderDetails);


    if(orderDetails.length === 0) return null;
    return (
        <>
            <Header/>
            <div className={cx('wrapper')}>
                <div className={cx('history-page')}>

                    <h2>Chi tiết đơn hàng</h2>

                    <table>
                        <thead>
                            <tr>
                                <th className={cx('th-name')}>Tên</th>
                                <th className={cx('th-mail')}>Email</th>
                                <th className={cx('th-soluong')}>Địa chỉ</th>
                                <th>Mã quốc gia</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{orderDetails.address.fullname}</td>
                                <td>{orderDetails.address.email}</td>
                                <td>{orderDetails.address.address.address_line_1 + ", " + orderDetails.address.address.admin_area_2 + ", " + orderDetails.address.address.admin_area_1}</td>
                                <td>{orderDetails.address.address.country_code}</td>
                            </tr>
                        </tbody>
                    </table>


                    <table style={{margin: "30px 0px"}}>
                        <thead>
                            <tr>
                                <th className={cx('th-name')}>Hình ảnh</th>
                                <th className={cx('th-mail')}>Tên</th>
                                <th className={cx('th-soluong')}>Giá</th>
                                <th>Số lượng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orderDetails.cart.map(item => (
                                    
                                <tr key={item._id}>
                                    <td><img src={item.images.url} alt="" /></td>
                                    <td>{item.name}</td>
                                    <td>{helpers.formatProductPrice(item.price * item.quantity)}</td>
                                    <td>{item.quantity}</td>
                                </tr>


                                ))
                            }
                            
                        </tbody>
                    </table>
                </div>
            </div>
                          
        </>
    )
}

export default OrderDetailHistory;