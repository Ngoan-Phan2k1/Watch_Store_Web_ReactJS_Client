import Header from "~/components/Layout/components/Header";
import { useEffect, useState, useContext } from 'react';
import { DataContext } from '~/components/DataProvider/DataProvider';


import classNames from 'classnames/bind';
import styles from './OrderHistory.module.scss';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import axios from "axios";


const cx = classNames.bind(styles);


function OrderHistory(){

    

    const value = useContext(DataContext);
   // const [history] = value.UserAPI.history;
   const [history, setHistory] = value.UserAPI.history;
   const user = useSelector((state) => state.auth.login.currentUser);
   const accessToken = user?.accessToken;
   const fullDay = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13',
                     '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25',
                    '26', '27', '28', '29', '30', '31', '32'];
    
    const fullMonth = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    const [fulYear, setFullYear] = useState([]);

    const [filterDate, setFilterDate] = useState([]);
    const [saleDate, setSaleDate] = useState('');
    const [saleMonth, setSaleMonth] = useState('');
    const [saleYear, setSaleYear] = useState('');




    useEffect(() => {
        if(accessToken){
            const getHistory = async () => {

                if(user.admin){
                    const res = await axios.get('http://localhost:8000/v1/payment', {
                            headers: {token: `Bearer ${accessToken}`}
                    })
                    setHistory(res.data);
                }
                else{
                    try{
                        const res = await axios.get('http://localhost:8000/v1/user/history', {
                            headers: {token: `Bearer ${accessToken}`}
                        })

                        

                        setHistory(res.data);
                    }catch(err) {
                        
                    }
                }
                
            }
            getHistory();

            
        }


    }, [accessToken, user?.admin, setHistory])




    return (
        <>
            <Header/>
            <div className={cx('wrapper')}>

                <div className={cx('history-page')}>
                    <h2>Lịch sử mua hàng</h2>
                    <h4>Bạn có {history.length} đơn hàng</h4>


                
                    <table>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Ngày mua</th>
                                <th>Chi tiết</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                history.map(items => (
                                    <tr key={items._id}>
                                        <td>{items.orderID}</td>
                                        {/* <td>{new Date(items.createdAt).toLocaleDateString()}</td> */}
                                        <td>{new Date(items.createdAt).toLocaleString('vi-VN')}</td>
                                        <td><Link to={`/history/${items._id}`}>Xem</Link></td>
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

export default OrderHistory;