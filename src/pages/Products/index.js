import { useEffect, useState, useContext} from 'react';
import { Link } from 'react-router-dom';
import classNames from "classnames/bind";

import styles from './Products.module.scss'
import Header from "~/components/Layout/components/Header";
import Footer from '~/components/Layout/components/Footer';
import callApi from '~/API/callApi';
import helpers from '~/helpers';
import { DataContext } from '~/components/DataProvider/DataProvider';
import { Spin } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loading from '~/components/Loading';
import { useSelector } from 'react-redux';
import Filters from './Filters';
import LoadMore from './LoadMore';
import axios from 'axios';


const cx = classNames.bind(styles)

function Products() {

    const [listSanpham, setlistSanpham] = useState([]);
    //const [change, setChange] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const user = useSelector((state) => state.auth.login.currentUser);
    const accessToken = user?.accessToken;
    const [loading, setLoading] = useState(false);
    const [isCheck, setIsCheck] = useState(false);
    const [choseMuch, setChoseMuch] = useState(false);


    useEffect(() => {
        const callApiData = async() => {
            callApi('sanpham', 'GET', null).then(res =>{
                setlistSanpham(res.data);
            })
        }
        callApiData();


    }, [])


    const value = useContext(DataContext);
    // const [products, setProducts] = value.ProductsAPI.products;
    const [products, setProducts] = value.ProductsAPI.products;
    const [callback, setCallback] = value.ProductsAPI.callback;

    



    

    // useEffect(() => {
    //     const getProducts = async () => {
    //         const res = await axios.get('http://localhost:8000/v2/product');
    //         setProducts(res.data.products);
            
    //     }
    //     getProducts()
    // }, [setProducts])

    

    //CODE BACKUP
    //const addCart = value.addCart;

    //CODE UPDATE
    const addCart = value.UserAPI.addCart;

    //CODE BACKUP
    const getProduct = (id) => {
        //addCart(id);

        // setChange(!change)
        // setIsLoading(true)
        
    }


    // const [countdown, setCountdown] = useState(5)
    // useEffect(() => {

    //     const timerId = setTimeout(() => {
    //         if(isLoading === true) {
    //             setIsLoading(false)
    //         }
                        
    //     }, 2000) 
    // }, [change])

    const deleteProduct = async(product) => {

        if(window.confirm("Bạn chắc chắn muốn xóa sản phẩm này chứ !!!")) {
            try{
                setLoading(true);
                const destroyImg = axios.post('http://localhost:8000/v1/admin/destroy', {public_id: product.images.public_id}, {
                    headers: {token: `Bearer ${accessToken}`}
                });


            
                product.thumbnails.map(async item => {
                    await axios.post('http://localhost:8000/v1/admin/destroy', {public_id: item.public_id},{
                        headers: {token: `Bearer ${accessToken}`}
                    })
            
                })
            

                const delProduct = axios.delete(`http://localhost:8000/v2/product/${product._id}`, {
                    headers: {token: `Bearer ${accessToken}`}
                });

                await destroyImg;
                // await destroyThumb();        
                await delProduct;
                setLoading(false);
                setCallback(!callback);

            }catch(err){
                alert(err.response.data.msg)
            }
        }

        
    }



    const deleteProductAll = async(product) => {

        
        try{
            setLoading(true);
                const destroyImg = axios.post('http://localhost:8000/v1/admin/destroy', {public_id: product.images.public_id}, {
                headers: {token: `Bearer ${accessToken}`}
            });


            
            product.thumbnails.map(async item => {
                await axios.post('http://localhost:8000/v1/admin/destroy', {public_id: item.public_id},{
                    headers: {token: `Bearer ${accessToken}`}
                })
            
            })
            

            const delProduct = axios.delete(`http://localhost:8000/v2/product/${product._id}`, {
                headers: {token: `Bearer ${accessToken}`}
            });

            await destroyImg;
                // await destroyThumb();        
            await delProduct;
            setLoading(false);
            setCallback(!callback);

        }catch(err){
            alert(err.response.data.msg)
        }
        

        
    }

    const handleCheck = (id) => {
        products.forEach(product => {
            if(product._id === id) product.checked = !product.checked;
        })
        setProducts([...products])
    }

    const checkAll = () => {
        products.forEach(product => {
            product.checked = !isCheck;
        })
        setProducts([...products])
        setIsCheck(!isCheck);
    }

    const deleteAll = () => {
        
        if(window.confirm("Bạn chắc chắn muốn xóa hết chứ !!!")){
            products.forEach(product => {
                if(product.checked) deleteProductAll(product)
            })
        }
        
    }

    if(loading) return <h1>Loading...</h1>

    return(
        <>
            <Header/>
            
            
            {
                // products.length === 0 ? (
                //     <div className={cx('wrap-spin')}>
                //         <Spin
                //         className={cx('spinner')}
                //         //tip="Đang tải sản phẩm ..."
                //         size="large"
                //         />
                //     </div>
                    
                
                //   ) : (
                
                
                <div className={cx('wrapper')}>
                    <Filters/>
                    
                    {
                        user?.admin && 
                        <div className={cx('delete-all')}>
                            <span>Chọn tất cả</span>
                            <input type="checkbox" checked={isCheck} onChange={checkAll}/>
                            <button  onClick={() => deleteAll()}>Xóa</button>
                        </div>
                    }              
                    <div className={cx('products')}>
                        {
                            products.map(sanpham => (
                                <div className={cx('card')} key={sanpham._id}>
                                    {
                                        user?.admin && 
                                        <input type="checkbox" checked={sanpham.checked}
                                            onChange={() => handleCheck(sanpham._id)}
                                        />
                                    }
                                    <Link to={`/products/${sanpham._id}`}>
                                            <img src={sanpham.images.url} alt="nothing"/>
                                    </Link>
                                    {

                                        user?.admin ? 
                                        <>
                                            <div className={cx('box')}>
                                                <Link to={`/products/${sanpham._id}`}> 
                                                    <h3>{sanpham.name}</h3>
                                                </Link>
                                                
                                                <h4>{helpers.formatProductPrice(sanpham.price)}</h4>
                                
                                            </div>

                                            <div className={cx('row_btn')}>
                                                <Link className={cx('btn_buy')} 
                                                    onClick={() => deleteProduct(sanpham)}>
                                                    Xóa
                                                </Link>
                                                <Link className={cx('btn_view')} to={`/edit_product/${sanpham._id}`} 
                                                    onClick={() =>{}}>
                                                    Chỉnh sửa
                                                </Link>
                                            </div>
                                        </> : 
                                        <>
                                            <div className={cx('box')}>
                                                <Link to={`/products/${sanpham._id}`}> 
                                                    <h3>{sanpham.name}</h3>
                                                </Link>
                                                
                                                <h4>{helpers.formatProductPrice(sanpham.price)}</h4>
                                                <button onClick={() =>addCart(sanpham)}>
                                                    Thêm vào giỏ
                                                </button>
                                            </div>
                                        </>

                                    }
                                    {/* <div className={cx('box')}>
                                         <Link to={`/products/${sanpham._id}`}> 
                                             <h3>{sanpham.name}</h3>
                                         </Link>
                                        
                                         <h4>{helpers.formatProductPrice(sanpham.price)}</h4>
                                         <button onClick={() =>addCart(sanpham)}>
                                             Thêm vào giỏ
                                         </button>
                                    </div> */}
                                </div>
                            ))
                        }
                                
                    </div>
                    <LoadMore/>
                </div>
                //)
            }

            <Footer/>
            
        </>
    )
}
export default Products;