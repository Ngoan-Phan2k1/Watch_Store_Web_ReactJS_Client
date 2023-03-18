import Header from "~/components/Layout/components/Header";
import { useEffect, useState, useContext } from 'react';
import { DataContext } from '~/components/DataProvider/DataProvider';


import classNames from 'classnames/bind';
import styles from './ToTalSale.module.scss';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import axios from "axios";
import helpers from '~/helpers';
//import {} from "recharts";
import Chart from '~/components/Chart/index';
import {
    AreaChart,
    Area,
    XAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell, YAxis, Legend
} from "recharts";





const cx = classNames.bind(styles);


function ToTalSale() {
    const value = useContext(DataContext);
    const [history, setHistory] = value.UserAPI.history;
    const user = useSelector((state) => state.auth.login.currentUser);
    const accessToken = user?.accessToken;
    const fullDay = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13',
                     '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25',
                    '26', '27', '28', '29', '30', '31', '32'];
    
    const fullMonth = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    const [fullYear, setFullYear] = useState([]);

    const [filterDate, setFilterDate] = useState([]);
    const [saleDate, setSaleDate] = useState('');
    const [saleMonth, setSaleMonth] = useState('');
    const [saleYear, setSaleYear] = useState('');
    const [orderDetails, setOrderDetails] = useState([]);
    const [see, setSee] = useState(false);
    const [total, setTotal] = useState(0);
    const [sumOneBill, setSumOneBill] = useState([]);
    const [data, setData] = useState([]);
    console.log(data);
    //console.log(total);
    const data1 = [
        {
          name: 'Page A',
          total: 4000,
          // pv: 2400,
          // amt: 2400,
        },
        {
          name: 'Page B',
          uv: '3000',
          // pv: '1398',
          // amt: '2210',
        },
        {
          name: 'Page C',
          uv: 2000,
          // pv: 9800,
          // amt: 2290,
        },
        {
          name: 'Page D',
          uv: 2780,
          // pv: 4300,
          // amt: 2100,
        },
        {
          name: 'Page E',
          uv: 2780,
          // pv: 4300,
          // amt: 2100,
        },
        {
            name: 'Page F',
            uv: 2780,
            // pv: 4300,
            // amt: 2100,
          }
    ]


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

    useEffect(() => {
        let allYear =[];
            history.map(item => {
                
                let year = new Date(item.createdAt).toLocaleDateString().split("/");
                if(year[2].localeCompare(allYear[allYear.length-1]) !==0)
                    allYear = [...allYear, year[2]];
            })

        setFullYear([...allYear]);
    }, [history])




    const handleChangeInputDate = e => {
        const {name, value} = e.target;
        setSaleDate(value);
    }

    const handleChangeInputMonth = e => {
        const {name, value} = e.target;
        setSaleMonth(value);
    }

    const handleChangeInputYear = e => {
        const {name, value} = e.target;
        setSaleYear(value);
    }

    useEffect(() => {
        const SaleDate = () => {
            let sale = [];
            history.forEach(item => {
                let getDate;
                getDate = new Date(item.createdAt).toLocaleDateString('vi-VN').split("/");
    
               
               if(getDate[0].localeCompare(saleDate) === 0 ){
                    sale = [...sale, item];
                }
      
            })

            if(sale.length === 0){
                setOrderDetails([]);
                setSee(false);
            };
            setFilterDate([...sale]);
        }

        const SaleMonth = () => {
            let sale = [];
            history.forEach(item => {
                let getDate;
                getDate = new Date(item.createdAt).toLocaleDateString('vi-VN').split("/");  
                
               if(getDate[1].localeCompare(saleMonth) === 0 ){
                    sale = [...sale, item];
                }
      
            })
            if(sale.length === 0){
                setOrderDetails([]);
                setSee(false);
            };
            setFilterDate([...sale]);
        }

        const SaleYear = () => {
            let sale = [];
            history.forEach(item => {
                let getDate;
                getDate = new Date(item.createdAt).toLocaleDateString('vi-VN').split("/");               
               if(getDate[2].localeCompare(saleYear) === 0 ){
                    
                    sale = [...sale, item];
                }
      
            })
            if(sale.length === 0){
                setOrderDetails([]);
                setSee(false);
            };
            setFilterDate([...sale]);
        }

        const SaleMonthAndDay = () => {
            let sale = [];
            history.forEach(item => {
                let getDate;
                getDate = new Date(item.createdAt).toLocaleDateString('vi-VN').split("/");
    
               
               if(getDate[0].localeCompare(saleDate) === 0 && getDate[1].localeCompare(saleMonth) ===0 ){
                    sale = [...sale, item];
                }
      
            })
            if(sale.length === 0){
                setOrderDetails([]);
                setSee(false);
            };
            setFilterDate([...sale]);
        }

        const SaleMonthAndYear = () => {
            let sale = [];
            history.forEach(item => {
                let getDate;
                getDate = new Date(item.createdAt).toLocaleDateString('vi-VN').split("/");
    
               
               if(getDate[1].localeCompare(saleMonth) === 0 && getDate[2].localeCompare(saleYear) ===0 ){
                    sale = [...sale, item];
                }
      
            })
            if(sale.length === 0){
                setOrderDetails([]);
                setSee(false);
            };
            setFilterDate([...sale]);
        }

        const SaleDayMonthAndYear = () => {
            let sale = [];
            history.forEach(item => {
                let getDate;
                getDate = new Date(item.createdAt).toLocaleDateString('vi-VN').split("/");
    
               
               if(getDate[0].localeCompare(saleDate)===0 && getDate[1].localeCompare(saleMonth) === 0 && getDate[2].localeCompare(saleYear) ===0 ){
                    sale = [...sale, item];
                }
      
            })
            if(sale.length === 0){
                setOrderDetails([]);
                setSee(false);
            };
            setFilterDate([...sale]);
        }



        if(saleDate !== '' && saleMonth === '' && saleYear === ''){
            SaleDate();
        }
        else if(saleMonth !== '' && saleDate === '' && saleYear === ''){
            SaleMonth();

        }
        else if(saleYear !== '' && saleDate === '' && saleMonth === ''){
            SaleYear();
        }
        else if(saleDate !== '' && saleMonth !== '' && saleYear === ''){
            SaleMonthAndDay();
        }
        else if(saleDate === '' && saleMonth !== '' && saleYear !== ''){
            SaleMonthAndYear();
        }
        else if(saleDate !== '' && saleMonth !== '' && saleYear !== ''){
            SaleDayMonthAndYear();
        }





    }, [saleDate, saleMonth, saleYear])



    useEffect(() => {
        const getTotal = () => {
            const sum = [];
            let dataCart =[];

            filterDate.map((item, index) => {
                const tong = item.cart.reduce((prev, item) => {
                    return prev + (item.price * item.quantity)
                }, 0)

                dataCart = [...dataCart ,...item.cart];
                sum[index] = tong;
            }) 

            const total = sum.reduce((prev, price) => {
                return prev + price
            },0)
            setSumOneBill([...sum]);
            setTotal(total);
            setData([...dataCart]);
        }
        getTotal();
    }, [filterDate])


    const handleDetailsSale = (sale) => {
        
        setOrderDetails([sale]);
        setSee(true);
    }



    return (
        <>
            <Header/>


            <div className={cx('wrapper')}>

                <h2>Thống kê doanh thu</h2>
                <div className={cx('date-box')}>
                    <select name="date" onChange={handleChangeInputDate} required>
                        <option value="">Ngày</option>
                            {
                                fullDay.map(date => (
                                    <option value={date} key={date}>{date}</option>
                                ))
                            }               
                    </select>


                    <select name="month" onChange={handleChangeInputMonth} required>
                        <option value="">Tháng</option>
                            {
                                fullMonth.map(month => (
                                    <option value={month} key={month}>{month}</option>
                                ))
                            }               
                    </select>


                    <select name="year" onChange={handleChangeInputYear} required>
                        <option value="">Năm</option>
                            {
                                fullYear.map(year => (
                                    <option value={year} key={year}>{year}</option>
                                ))
                            }               
                    </select>

                </div>    
                    
    

                <div className={cx('history-page')}>
                    <h4>Tìm thấy {filterDate.length} đơn hàng</h4>                
                    <table>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Ngày mua</th>
                                <th>Thanh toán</th>
                                <th>Chi tiết</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filterDate.map((items, index) => (
                                    <tr key={items._id}>
                                        <td>{items.orderID}</td>
                                        <td>{new Date(items.createdAt).toLocaleString('vi-VN')}</td>
                                        <td>{helpers.formatProductPrice(sumOneBill[index])}</td>
                                        <td className={cx('link')} onClick={() => handleDetailsSale(items)}>Xem</td>
                                    </tr>
                                ))

                            }
                        </tbody>
                    </table>

                </div>
                
                <div className={cx('doanh-thu')}>
                    <h2 >Doanh Thu: {helpers.formatProductPrice(total)}</h2>

                </div>
                



                <div className={cx('history-page2')}>
                    {
                        see && 
                        <>
                            <h2>Chi tiết đơn hàng <span>{orderDetails[0].orderID}</span></h2>
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
                                    {
                                        orderDetails.map(item => (
                                        <tr>
                                            <td>{item.address.fullname}</td>
                                            <td>{item.address.email}</td>
                                            <td>{item.address.address.address_line_1 + ", " + item.address.address.admin_area_2 + ", " + item.address.address.admin_area_1}</td>
                                            <td>{item.address.address.country_code}</td>
                                        </tr>
                                        ))
                                    }

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
                                        orderDetails[0]?.cart.map(item => (
                                            
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
                        
                        
                        
                        </>

                        
                    }

                    {/* <h2>Chi tiết đơn hàng</h2> */}

                    {/* <table>
                        <thead>
                            <tr>
                                <th className={cx('th-name')}>Tên</th>
                                <th className={cx('th-mail')}>Email</th>
                                <th className={cx('th-soluong')}>Địa chỉ</th>
                                <th>Mã quốc gia</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orderDetails.map(item => (
                                <tr>
                                    <td>{item.address.fullname}</td>
                                    <td>{item.address.email}</td>
                                    <td>{item.address.address.address_line_1 + ", " + item.address.address.admin_area_2 + ", " + item.address.address.admin_area_1}</td>
                                    <td>{item.address.address.country_code}</td>
                                </tr>
                                ))
                            }

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
                                orderDetails[0]?.cart.map(item => (
                                    
                                <tr key={item._id}>
                                    <td><img src={item.images.url} alt="" /></td>
                                    <td>{item.name}</td>
                                    <td>{helpers.formatProductPrice(item.price * item.quantity)}</td>
                                    <td>{item.quantity}</td>
                                </tr>


                                ))
                            }
                            
                        </tbody>
                    </table> */}
                </div>
            </div>

            {data.length !== 0 &&
                <ResponsiveContainer width="100%" aspect={3} >
                    <BarChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                        }}
                        barSize={50}
                    >
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="name" padding={{right: 10}}/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend/>
                        <Bar dataKey="quantity" fill="#82ca9d"/>

                    </BarChart>

                </ResponsiveContainer>
            }
        </>
    )
    
}

export default ToTalSale;