import { useEffect, useState, useContext} from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import callApi from '~/API/callApi';
//import { data } from './data';
import styles from './Home.module.scss';
import './Home.css';
import SamplePrevArrow from './SamplePrevArrow';
import SampleNextArrow from './SampleNextArrow';
import logo_baby_g1 from '~/assets/web-images/logo_baby_g1.jpg';
import logo_gshock_min from '~/assets/web-images/logo_gshock_min.png';
import logo_sheen from '~/assets/web-images/logo_sheen.jpg';
import Pro_Trek_logo from '~/assets/web-images/Pro_Trek_logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import helpers from '~/helpers';
import { DataContext } from '~/components/DataProvider/DataProvider';


const cx = classNames.bind(styles);



function Home() {
  

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
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
    
    const [listSanpham, setlistSanpham] = useState([]);
    const value = useContext(DataContext);
    const [products] = value.ProductsAPI.productsnotFilter;
    console.log(products);

    useEffect(() => {
      const callApiData = async () => {
        callApi('sanpham', 'GET', null).then(res => {
          setlistSanpham(res.data);
        })  
        
        // axios({
        //   method: method,
        //   url: `http://localhost:8000/v1/sanpham/${endpoint}`,
        //   data: body
        // })
        // .then(res => {
        //     setlistSanpham(res.data);
        // })
        // .catch(err => {
        //   console.log(err);
        // })

      }
      callApiData();



    }, [])
    


    return (
        <section className={cx('wrapper')}>

            <div className={cx('title-container')}>
                <h3 className={cx('center-title')}>
                  <b></b>
                  <span className={cx('title-main')}>

                    <i className={cx('icon-start-o')}></i>
                    SẢN PHẨM MỚI
                  </span>
                  <b></b>
                </h3>
            </div>

            <div className={cx('wrapper-slider')}>
              <Slider {...settings}>
                {products.map((item, index) => (
                  <div key={index} className={cx('inner')}>
                    <div className={cx('badge-container')}>
                      <div className={cx('badge-circle')}>
                        <div className={cx('icon-circle')}>
                          New
                        </div>
                      </div>    
                    </div>

                    <div className={cx('box-image')}>
                      <div className={cx('Card-top')}>
                        <Link to={`/products/${item._id}`}>
                          <img src={item.images.url} alt={item.name}/>
                        </Link>
                        
                      </div>
                    </div>
                              
                    <div className={cx('box-text')}>
                      <div className={cx('title-wrapper')}>
                        <p>{item.name}</p>
                      </div>

                      <div className={cx('price-wrapper')}>
                        <span className={cx('price')}>
                          <span className={cx('amount')}>
                            <bdi>
                              {helpers.formatProductPrice(item.price)}
                            </bdi>
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}     
              </Slider>
            </div>
            
            
            {/* Banner 1 */}
            <div className={cx('box-text-one')}>
                  <div className={cx('box-logo')}>
                    <Link to="/#">
                      <div>
                        <img src={logo_gshock_min} alt="logo"/>
                      </div>
                    </Link>
                  </div>

                  <div className={cx('box-content-text')}>
                    <div className={cx('box-content-text-inner')}>
                      <h1>
                        <span>
                          Phong cách & Cá tính
                        </span>
                      </h1>

                      <div className={cx('text-inner-center')}>

                        <div className={cx('divider')}></div>

                      </div>


                      <div className={cx('banner')}>
                        {/* <h1>Banner</h1> */}
                        <div className={cx('banner-inner')}>
                          <div className={cx('banner-bg')}>     
                              <div className={cx('bg-loaded', 'upload-banner-1')}>
    
                              </div>                          
                          </div>

                          
                        </div>                        
                     </div>

                    </div>                                        
                  </div>
            </div>


            <div className={cx('box-text-one')}>
                  <div className={cx('box-logo')}>
                    <Link to="/#">
                      <div>
                        <img src={Pro_Trek_logo}  alt="logo"/>
                      </div>
                    </Link>
                  </div>

                  <div className={cx('box-content-text')}>
                    <div className={cx('box-content-text-inner')}>
                      <h1>
                        <span>
                          Cảm nhận thiên nhiên
                        </span>
                      </h1>

                      <div className={cx('text-inner-center')}>

                        <div className={cx('divider')}></div>

                      </div>


                      <div className={cx('banner')}>
                        {/* <h1>Banner</h1> */}
                        <div className={cx('banner-inner')}>
                          <div className={cx('banner-bg')}>     
                              <div className={cx('bg-loaded', 'upload-banner-2')}>
    
                              </div>                          
                          </div>

                          
                        </div>                        
                     </div>

                    </div>                                        
                  </div>
            </div>



            {/* Banner 3 */}
            <div className={cx('box-text-one')}>
                  <div className={cx('box-logo')}>
                    <Link to="/#">
                      <div>
                        <img src={logo_baby_g1}  alt="logo"/>
                      </div>
                    </Link>
                  </div>

                  <div className={cx('box-content-text')}>
                    <div className={cx('box-content-text-inner')}>
                      <h1>
                        <span>
                          Trẻ trung & năng động
                        </span>
                      </h1>

                      <div className={cx('text-inner-center')}>

                        <div className={cx('divider')}></div>

                      </div>


                      <div className={cx('banner')}>
                        {/* <h1>Banner</h1> */}
                        <div className={cx('banner-inner')}>
                          <div className={cx('banner-bg')}>     
                              <div className={cx('bg-loaded', 'upload-banner-3')}>
    
                              </div>                          
                          </div>

                          
                        </div>                        
                     </div>

                    </div>                                        
                  </div>
            </div>



            <div className={cx('box-text-one')}>
                  <div className={cx('box-logo')}>
                    <Link to="/#">
                      <div>
                        <img className={cx('logo_sheen')} src={logo_sheen}  alt="logo"/>
                      </div>
                    </Link>
                  </div>

                  <div className={cx('box-content-text')}>
                    <div className={cx('box-content-text-inner')}>
                      <h1>
                        <span>
                          Sang trọng & quý phái
                        </span>
                      </h1>

                      <div className={cx('text-inner-center')}>

                        <div className={cx('divider')}></div>

                      </div>


                      <div className={cx('banner')}>
                        {/* <h1>Banner</h1> */}
                        <div className={cx('banner-inner')}>
                          <div className={cx('banner-bg')}>     
                              <div className={cx('bg-loaded', 'upload-banner-4')}>
    
                              </div>                          
                          </div>                        
                        </div>                        
                     </div>

                    </div>                                        
                  </div>
            </div>



            <div className={cx('title-container')}>
                <h3 className={cx('center-title')}>
                  <b></b>
                  <span className={cx('title-main')}>

                    <FontAwesomeIcon className={cx('icon-start')} icon={faStar} />
                    SẢN PHẨM NỔI BẬT
                  </span>
                  <b></b>
                </h3>
            </div>

            <div className={cx('wrapper-slider')}>
              <Slider {...settings}>
                {products.map((item, index) => (
                  <div key={index} className={cx('inner')}>
                    <div className={cx('badge-container')}>
                      <div className={cx('badge-circle')}>
                        <div className={cx('icon-circle')}>
                          New
                        </div>
                      </div>    
                    </div>

                    <div className={cx('box-image')}>
                      <div className={cx('Card-top')}>
                        <Link to={`/products/${item._id}`}>
                          <img src={item.images.url} alt={item.name}/>
                        </Link>
                        
                      </div>
                    </div>
                              
                    <div className={cx('box-text')}>
                      <div className={cx('title-wrapper')}>
                        <p>{item.name}</p>
                      </div>

                      <div className={cx('price-wrapper')}>
                        <span className={cx('price')}>
                          <span className={cx('amount')}>
                            <bdi>
                              {helpers.formatProductPrice(item.price)}
                              {/* <span className={cx('vnd')}>
                                đ
                              </span> */}
                            </bdi>
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}     
              </Slider>
            </div>

        </section>       
      )
};

export default Home;