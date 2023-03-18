
import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import getOneProduct from '~/API/productApi';
import classNames from 'classnames/bind';

import { DataContext } from '~/components/DataProvider/DataProvider';
import Header from '~/components/Layout/components/Header';
import helpers from '~/helpers';


//import productApi from '~/API/productApi';
//import testApi from '~/API/testApi';
import styles from './Cart.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess } from '~/redux/authSlice';
import { createAxios } from '~/createInstance';
import { PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';

import jwt_decode from "jwt-decode";
import { logOut } from '~/redux/apiRequest';
import { logoutSuccess } from '~/redux/authSlice';
import { useNavigate } from 'react-router-dom';
import PaypalCheckoutButton from './PaypalCheckoutButton';
import { withConfirm } from 'antd/lib/modal/confirm';
import Footer from '~/components/Layout/components/Footer';

const cx = classNames.bind(styles);


function Cart() {
    const imgDiv  = useRef();
    const value = useContext(DataContext);
    //const [cart, setCart] = value.cart;
    const [total, setTotal] = useState(0);
    const [totalUSD, setTotalUSD] = useState(0);
    const user = useSelector((state)=>state.auth.login?.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //const [callback, setCallback] = value.UserAPI.callback;

    const [cart, setCart] = value.UserAPI.cart;
    const accessToken = user?.accessToken;
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);

    


    const handleApprove = (orderId) => {
        setPaidFor(true);

    };

    const tranSuccess = async(order, orderID) => {

        // const payment = {
        //     address: order.address, 
        //     orderID: orderID
        // }
        


        // const {ID, address} = payment;

        //console.log(order.purchase_units[0].shipping.address);

        const address = {
            //address: order.payer.address,
            address: order.purchase_units[0].shipping.address,
            // given_name: order.payer.name.given_name,
            // surname: order.payer.name.surname,
            fullname: order.purchase_units[0].shipping.name.full_name,
            email: order.payer.email_address,
        }

        await axios.post('http://localhost:8000/v1/payment', {cart, orderID, address}, {
            headers: {token: `Bearer ${accessToken}`}
        })
        
        setCart([]);
        addToCart([]);
        //setCallback(!callback);
        alert("Bạn đã đặt hàng thành công.");

    }

    if(paidFor){
        alert("Cam on da mua hang");
    }

    if(error){
       if(window.confirm("Bạn hãy tải lại trang để thanh toán lại nhé (^.^)")){
            window.location.reload();
       }
    }
    // else if(cart.length > 1){
    //     if(window.confirm("Bạn hãy tải lại trang để thanh toán lại nhé (^.^)")){
    //         window.location.reload();
    //     }
    // }

    

    //CODE BACKUP
    // useEffect(() => {
    //     const getTotal = () => {
    //         const res = cart.reduce((prev, item) => {               
    //             return prev + (item.giaban * item.count)
    //         }, 0)

    //         setTotal(res)
    //     }

    //     getTotal()
    // }, [cart])


    const addToCart = async (cart) =>{
        // await axiosJWT.patch('http://localhost:8000/v1/user/addCart', {cart}, {
        //     headers: {token: `Bearer ${accessToken}`}
        // })
        await axios.patch('http://localhost:8000/v1/user/addCart', {cart}, {
            headers: {token: `Bearer ${accessToken}`}
        })    
    }

    
    const [reload, setReload] = useState(true);

    useEffect(() => {
        const getTotal = () => {

            const total = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            },0)
            
            //setTotal((total/24365).toFixed(2));
            setTotal(total);
            setTotalUSD((total/23000).toFixed(2));
            
        }
        getTotal();
      
        
    }, [cart])

    

    //CODE BACKUP
    // const reduction = id => {
    //     cart.forEach(item => {
    //         if(item._id === id) {
    //             item.count === 1 ? item.count=1 : item.count -= 1;
    //         }
    //     })
    //     setCart([...cart])
    // }


    //CODE UPDATE
    const increase = id => {
        cart.forEach(item => {
            if(item._id === id) {
                item.count += 1;
            }
        })
        setCart([...cart])
    }


    const checkExpAccessToken = (id) => {
        let date = new Date();
        const decodedToken = jwt_decode(user?.accessToken);
        if(decodedToken.exp < date.getTime()/1000){
            //logOut(dispatch, id,navigate,accessToken, axiosJWT );
            logOut(dispatch, id,navigate,accessToken);
        }
    }

    const increment = (id) => {

        // let date = new Date();
        // const decodedToken = jwt_decode(user?.accessToken);
        // if(decodedToken.exp < date.getTime()/1000){
        //     logOut(dispatch, id,navigate,accessToken, axiosJWT );
        // }
        checkExpAccessToken(id); //Kiem tra xem token da het han chua, neu het han thi logout




        cart.forEach(item => {
            if(item._id === id){
                
                item.quantity += 1
                // if(item.quantity > 2) {
                //     item.quantity -= 1;
                //     alert("Bạn tạm ko thể mua thêm sản phẩm này");
                // }
                
            }
        })

        setCart([...cart]);
        addToCart(cart);
        window.location.reload();
    }

    const decrement = (id) => {
        checkExpAccessToken(id); //Kiem tra xem token da het han chua, neu het han thi logout
        cart.forEach(item => {
            if(item._id === id){
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
            }
        })

        setCart([...cart]);
        addToCart(cart);
        window.location.reload();

    }



    // const removeProduct = id => {
    //     if(window.confirm("Bạn chắc muốn xóa sản phẩm này chứ ?")) {
    //         cart.forEach((item, index) => {
    //             if(item._id === id) {
    //                 cart.splice(index, 1);
    //             }
    //         })
    //         setCart([...cart]);
    //     }

    // }


    const removeProduct = id =>{
        let flag = true;
        let date = new Date();
        const decodedToken = jwt_decode(user?.accessToken);
        if(decodedToken.exp < date.getTime()/1000){
            flag = false;
            //logOut(dispatch, id,navigate,accessToken, axiosJWT );
            logOut(dispatch, id,navigate,accessToken);
            
        }

        if(flag){
            if(window.confirm("Bạn chắc muốn xóa sản phẩm này chứ ?")){
                cart.forEach((item, index) => {
                    if(item._id === id){
                        cart.splice(index, 1)
                    }
                })

                setCart([...cart])
                addToCart(cart)
                
                window.location.reload();
            }
        }
        

        // if(window.confirm("Bạn chắc muốn xóa sản phẩm này chứ ?")){
        //     cart.forEach((item, index) => {
        //         if(item._id === id){
        //             cart.splice(index, 1)
        //         }
        //     })

        //     setCart([...cart])
        //     addToCart(cart)
        // }
    }

    
    if(cart.length === 0 || !user?.accessToken)
        return (
            <>
                <Header/> 
                <h2 style={{textAlign: "center", fontSize: "5rem", marginTop: "10px", marginBottom: "500px"}}>GIỎ HÀNG TRỐNG</h2>
                <Footer/>

            </>
            
        )
        


    //console.log(cart);
    return (
        <>
            <Header/>
            {/* CODE BACKUP */}
            {/* <div className={cx('wrapper')}>
                {
                   
                    cart && cart.map(product => (
                                
                        <div className={cx('details', 'cart')}>
                                
                            <div className={cx('img-container')} 
                                // onMouseMove={handleMouseMove}
                                style={{ backgroundImage: `url(${product.thumbnail[0]})` }}
                                ref={imgDiv}
                                //onMouseLeave={() => imgDiv.current.style.backgroundPosition = `center`}
                            />
                                

                            <div className={cx('box-details')}> 
                                <h2>Thông tin sản phẩm</h2>
                                <h3>{helpers.formatProductPrice(product.giaban)}</h3>
                                <div className={cx('colors')}>
                                        
                                    <p>Thương hiệu</p>
                                    <img src="https://cdn3.dhht.vn/wp-content/uploads/2015/09/Casio-Logo.png" alt="no"/>
                                </div>
                                <div className={cx('sizes')}>
                                    <button>L</button>
                                    <button>X</button>
                                    <button>XL</button>
                                </div>
                                <p>Description</p>
                                <p>Content</p>

                                <div className={cx('amount')}>
                                    <button className={cx('count')} onClick={() => reduction(product._id)}>-</button>
                                    <span>{product.count}</span>
                                    <button className={cx('count')} onClick={() => increase(product._id)}>+</button>
                                </div>

                                <div className={cx('delete')} 
                                onClick={() => removeProduct(product._id)}
                                >
                                    X
                                </div>
                            </div>
                        </div>                     
                    ))
                }


                <div className={cx('total')}>
                    <Link to="/payment">Payment</Link>
                    <h3>Total: {helpers.formatProductPrice(total)} </h3> 
                </div>
            </div> */}



            {/* CODE UPDATE */}
            <div className={cx('wrapper')}>
                {
                   
                    cart && cart.map(product => (
                                
                        <div className={cx('details', 'cart')}>
                                
                            <div className={cx('img-container')} 
                                // onMouseMove={handleMouseMove}
                                style={{ backgroundImage: `url(${product.thumbnails[0].url})` }}
                                ref={imgDiv}
                                //onMouseLeave={() => imgDiv.current.style.backgroundPosition = `center`}
                            />
                                

                            <div className={cx('box-details')}> 
                                <h2>Thông tin sản phẩm</h2>
                                <h3>{helpers.formatProductPrice(product.price)}</h3>
                                <div className={cx('colors')}>
                                        
                                    <p>Thương hiệu</p>
                                    <img src="https://cdn3.dhht.vn/wp-content/uploads/2015/09/Casio-Logo.png" alt="no"/>
                                </div>
                                <div className={cx('sizes')}>
                                    <button>L</button>
                                    <button>X</button>
                                    <button>XL</button>
                                </div>
                                <p>Description</p>
                                <p>Content</p>

                                <div className={cx('amount')}>
                                    <button className={cx('count')} onClick={() => decrement(product._id)}>-</button>
                                    <span>{product.quantity}</span>
                                    <button className={cx('count')} onClick={() => increment(product._id)}>+</button>
                                </div>

                                <div className={cx('delete')} 
                                onClick={() => removeProduct(product._id)}
                                >
                                    X
                                </div>
                            </div>
                        </div>                     
                    ))
                }


                <div className={cx('total')}>
                    {/* <Link to="/payment">Thanh Toán</Link> */}
                    <PayPalButtons
                        style={{
                            color: "silver",
                            layout: "horizontal",
                            height: 28,
                            tagline: false,
                            
                        }}

                        onClick={(data, actions) => {
                            const hasAlreadyBought = false;
                            if(hasAlreadyBought){
                                setError("You already bought this product");


                                return actions.reject()
                                
                            }
                            else{
                                return actions.resolve();
                            }

                            // if(withConfirm("Ban chac muon thanh toan chu")){
                            //    return actions.resolve();
                            // }
                        }}

                        createOrder={(data, actions) => {
                            return actions.order.create({
                                purchase_units: [
                                    {
                                        //desciption: sanpham.description,
                                        amount: {
                                            currency: "USD",
                                            value: (total/23925).toFixed(2)
                                        }
        
                                    }
                                ]
                            });
                        }}


                        onApprove={async(data, actions) => {
                            const order = await actions.order.capture();
                            //console.log("data", data);
                            // console.log("paymentID", data.paymentID);
                            // console.log("orderID", data.orderID);
                            //console.log("address", order.payer.address);
                            //console.log("oeder", order);

                            //console.log(order);

                            //tranSuccess(order.payer.address, data.orderID);

                            tranSuccess(order, data.orderID);
        
                            handleApprove(data.orderID);
                        }}

                        onCancel={() => {

                        }}
        
                        onError={(err) => {
                            setError(err);
                            console.log("Paypal Checkout onError", err);
                            if(window.confirm("Hay tai lai trang OK")){
                                window.location.reload();
                            }
                        }}
                    />
                    
                    {/* <PaypalCheckoutButton
                        total={(total/23000).toFixed(2)}
                       
                    /> */}
                    <h3>Tổng tiền: {helpers.formatProductPrice(total)} </h3> 



                </div>
            </div>

            <Footer/>
        </>
    )
}


export default Cart;