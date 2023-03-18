import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import getOneProduct from '~/API/productApi';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { DataContext } from '~/components/DataProvider/DataProvider';



//import productApi from '~/API/productApi';
//import testApi from '~/API/testApi';
import styles from './DetailProduct.module.scss';

import helpers from '~/helpers';

//CODE UPDATE
// import ProductItem from './ProductItem';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import SamplePrevArrow from '../Home/SamplePrevArrow';
import SampleNextArrow from '../Home/SampleNextArrow';
import axios from 'axios';

const cx = classNames.bind(styles);



function DetailProduct() {
    const params = useParams();
    const [details, setDetails] = useState(null);
    const [index, setIndex] = useState(0);
    const imgDiv  = useRef();
    const value = useContext(DataContext);

    //CODE BACKUP
    //const addCart = value.addCart;

    //CODE UPDATE
    const addCart = value.UserAPI.addCart;
    const user = value.UserAPI.user;

    const usertoken = useSelector((state) => state.auth.login.currentUser);


    
    //Code update
    //const [products] = value.ProductsAPI.products;
    const [products] = value.ProductsAPI.productsnotFilter;
    const [categories] = value.CategoriesAPI.categories;
    const [category, setCategory] = useState(null);

    

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        prevArrow: <SamplePrevArrow />,
        nextArrow: <SampleNextArrow />,
        
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
    };


    // console.log(id);

    //Code Backup
    // useEffect(() => {
    //     const callApiData = async (id) => {
    //         await getOneProduct(id, 'GET', null).then(res =>{
    //             //const { data } = res.data;
    //             setDetails(res.data);
    //         })
    //     }
    //     callApiData(id);

    // }, [id])


    //Code update
    useEffect(() => {
        if(params) {
            products.forEach( async product => {
                if(product._id === params.id){


                    const res = await axios.get(`http://localhost:8000/v1/category/${product.category}`); 
                    setCategory(res.data);                       
                    setDetails(product);
                    // categories.forEach(category => {
                    //     if(product.category === category._id) console.log("category name", category.name);
                    // })

                    

                }   
            })
        }


    }, [params, products])





    // useEffect(() => {
    //     const getProduct = async (id) => {
    //       try {
    //         console.log("Try");
    //         const result = await testApi.getProduct(id);
    //         if (result) {
    //             console.log("OK");
    //           const { data } = result.data;
    //           setDetails(data);
    //         }
    //       } catch (error) {
    //         console.log(error);
    //       }
    //     };
    //     getProduct(id);
    //   }, [id]);
    


    const handleMouseMove = e => {
        const {left, top, width, height} = e.target.getBoundingClientRect();
        const x = (e.pageX - left) / width * 100
        const y = (e.pageY - top) / height * 100
        imgDiv.current.style.backgroundPosition = `${x}% ${y}%`
        //console.log(imgDiv.current)
    }

    const styleisAdmin = {
        display: usertoken?.admin ? "none" : null
    }

    return (
        <>
            {
                details && 
                

                <>
                {/* //CODE UPDATE */}
                <div className={cx('wrapper')}>
                        <div className={cx('title')}> 
                            <h1>{details.name}</h1>
                        </div>
                    <div className={cx('details')}>
                        
                        <div className={cx('img-container')} 
                        onMouseMove={handleMouseMove}
                        style={{ backgroundImage: `url(${details.thumbnails[index].url})` }}
                        ref={imgDiv}
                        onMouseLeave={() => imgDiv.current.style.backgroundPosition = `center`}
                        />
                        

                        <div className={cx('box-details')}> 
                            <h2>Thông tin sản phẩm</h2>
                            <h3>{helpers.formatProductPrice(details.price)}</h3>
                            <div className={cx('colors')}>
                                {/* <button>red</button>
                                <button>red</button>
                                <button>red</button> */}
                                <p>Thương hiệu</p>
                                <img src={category.images.url} alt="no"/>
                            </div>
                            <div className={cx('sizes')}>
                                <button>L</button>
                                <button>X</button>
                                <button>XL</button>
                            </div>
                            <p>Mô tả:</p>
                            <p>{details.desription}</p>

                            <div className={cx('thumb')}>
                                {
                                    details.thumbnails.map((img, index) => (
                                        <img src={img.url} alt="no" key={index} 
                                        onClick={() => setIndex(index)}/>
                                    ))
                                }

                            </div>
                            {
                                usertoken?.accessToken ?
                                <Link to="/cart" style={styleisAdmin} className={cx('cart')} onClick={() => addCart(details)}>
                                    Thêm vào giỏ
                                </Link> : 
                                <Link to={`/products/${details._id}`} className={cx('cart')} onClick={() => addCart(details)}>
                                    Thêm vào giỏ
                                </Link>
                            }

                            {/* <Link to="/cart" className={cx('cart')} onClick={() => addCart(details)}>
                                Thêm vào giỏ
                            </Link> */}
                        </div>
                    </div>

                    <h2>Sản Phẩm Liên Quan</h2>
                    <div className={cx('newproducts')}>
                        <Slider {...settings}>
                            {
                                products.map(product => {
                                    return product.category === details.category && product._id !== details._id ?
                                    (
                                        // <ProductItem key={product._id} product={product}/>
                                        <div className={cx('product_card')} key={product._id}>
                                            
                                            <Link to={`/products/${product._id}`} onClick={() => setIndex(0)}>
                                                <img src={product.images.url} alt="nothing" />
                                            </Link>                                                                                                                                                                          

                                            <div className={cx('product_box')}>
                                                <Link to={`/products/${product._id}`} onClick={() => setIndex(0)}>
                                                    <h2 title={product.name}>{product.name}</h2>
                                                </Link>
                                                
                                                <span>{helpers.formatProductPrice(product.price)}</span>
                                                {/* <p>Nothing</p> */}
                                            </div>

                                        </div>
                                    )
                                    : null
                                })

                            }
                        </Slider>
                    </div>
                </div>
                            
                
                </>
            }

           

        </>
    )
}


export default DetailProduct;