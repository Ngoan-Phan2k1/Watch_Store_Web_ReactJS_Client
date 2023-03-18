import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useSelector } from 'react-redux';

function UserAPI(accessToken) {
    const [cart, setCart] = useState([]);
    const [history, setHistory] = useState([]);
    //const [callback, setCallback] = useState(false);

    const user = useSelector((state) => state.auth.login.currentUser);

    

    useEffect(() => {
        if(accessToken) {
            const getUser = async () => {
                try{
                    const res = await axios.get('http://localhost:8000/v1/user/infor', {
                        headers: {token: `Bearer ${accessToken}`}
                    })

                    setCart(res.data.cart);
                }catch(err) {
                    
                }
            }
            getUser();
        }
    }, [accessToken])

    // useEffect(() => {
    //     if(accessToken){
    //         const getHistory = async () => {

    //             if(user.admin){
    //                 const res = await axios.get('http://localhost:8000/v1/payment', {
    //                         headers: {token: `Bearer ${accessToken}`}
    //                 })
    //                 setHistory(res.data);
    //             }
    //             else{
    //                 try{
    //                     const res = await axios.get('http://localhost:8000/v1/user/history', {
    //                         headers: {token: `Bearer ${accessToken}`}
    //                     })

                        
    
    //                     setHistory(res.data);
    //                 }catch(err) {
                        
    //                 }
    //             }
                
    //         }
    //         getHistory();
    //     }
    // }, [accessToken, callback,user?.admin])

    const addCart = async (product) => {  
        if(!accessToken) return alert("Vui lòng đăng nhập để mua sản phẩm này nhé!!!");

        const check = cart.every(item => {
            return item._id !== product._id;
        })

        if(check) {

            setCart([...cart, {...product, quantity: 1}]);


            await axios.patch('http://localhost:8000/v1/user/addCart', {cart: [...cart, {...product, quantity: 1}] }, {
                headers: {token: `Bearer ${accessToken}`}
            })          
        }
    }

    return{
        cart: [cart, setCart],
        addCart: addCart,
        history: [history, setHistory],
        //callback: [callback, setCallback],
    }

}

export default UserAPI;