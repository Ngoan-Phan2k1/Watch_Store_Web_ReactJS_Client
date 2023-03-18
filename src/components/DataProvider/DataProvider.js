import { createContext, useState, useEffect } from 'react'; 
import callApi from '~/API/callApi';
//import getOneProduct from '~/API/productApi';


import ProductsAPI from '~/API/ProductsAPI';
import UserAPI from '~/API/UserAPI';
import CategoriesAPI from '~/API/CategoriesAPI';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '~/createInstance';
import { loginSuccess } from '~/redux/authSlice';
import axios from 'axios';

export const DataContext = createContext();

export const DataProvider = (props) => {

    

    const [products, setProducts] = useState([])
    //const [cart, setCart] = useState([]);
    const user = useSelector((state)=>state.auth.login?.currentUser);
    // const refreshToken = user?.refreshToken;
    const dispatch = useDispatch();

    let axiosJWT = createAxios(user, dispatch, loginSuccess);


    useEffect(() => {
        const callApiData = async () => {
          await callApi('sanpham', 'GET', null).then(res => {
            setProducts(res.data);
          })         
        }
        callApiData();

        //CODE BACKUP
        // const dataCart = JSON.parse(localStorage.getItem('dataCart'))
        // if (dataCart !== null && dataCart.length){
        //     setCart(dataCart)
        // }
    }, [])

    

    
    //CODE BACKUP
    // const  addCart = (id) => {
    //     const check = cart.every(item => {
    //         return item._id !== id
    //     })
    //     if(check){
    //         const data = products.filter(product => {
    //             return product._id === id
    //         })
            
    //        setCart([...cart, ...data])
    //     }
    //     else{
    //         alert("Sản phẩm đã được thêm vào giỏ hàng")
    //     }
    // }

    // useEffect(()=>{
    //     const dataCart = JSON.parse(localStorage.getItem('dataCart'))
    //     if (dataCart !== null && dataCart.length){
    //         setCart(dataCart)
    //     }
        
        
        
    // }, [])

    //CODE BACKUP
    // useEffect(()=>{
    //     localStorage.setItem('dataCart', JSON.stringify(cart))
    // }, [cart])


    //CODE BACKUP
    // const value = {
    //     cart: [cart, setCart],
    //     addCart: addCart,

    // }



    // useEffect(() => {
    //     const requestRefreshToken = async () => {
            
                
          
    //         const res = await axios.post("http://localhost:8000/v1/auth/refresh",user, {
    //               //withCredentials: true,
    //             headers: {token: user?.refreshToken}
    //         });
    //         console.log(res.data);

    //         setTimeout(() => {
    //             requestRefreshToken();
    //         }, 10000)

    //     }
    //     requestRefreshToken();

    // }, [])

    //CODE UPDATE
    const value = {
        //cart: [cart, setCart],
        //addCart: addCart,

        ProductsAPI: ProductsAPI(),
        UserAPI: UserAPI(user?.accessToken),
        CategoriesAPI: CategoriesAPI(),
        user: user,

    }

    return (
        <DataContext.Provider value={value}>
            {props.children}
        </DataContext.Provider>
    )
}