import { useEffect, useState, useContext } from 'react'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBagShopping, faCircleQuestion, faCircleXmark, faEarthAsia, faEllipsisVertical, faKeyboard, faMagnifyingGlass, faShoppingCart, faSpinner } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless'


import Button from '~/components/Button'
import styles from './Header.module.scss'
import { Wrapper as PopperWrapper } from '~/components/Popper'
import AccountItem from '~/AccountItem'
import Menu from '~/components/Popper/Menu'
import logo from '~/assets/web-images/Casio-logo.png'
import images from '~/assets/images'
import { Link, useNavigate } from 'react-router-dom'
import { DataContext } from '~/components/DataProvider/DataProvider'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '~/redux/apiRequest'
import { createAxios } from '~/createInstance'
import { logoutSuccess } from '~/redux/authSlice'




const cx = classNames.bind(styles)

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: '/feedback'
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts',
    },
];

function Header() {

    const [searchResult, setSearchResult] = useState([]);
    const value = useContext(DataContext);

    //CODE BACKUP
    //const [cart] = value.cart;


    


    const user = useSelector((state) => state.auth.login.currentUser);

    //console.log(user);
    const [cart] = value.UserAPI.cart;

    
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const id = user?._id;
    const accessToken = user?.accessToken;
    let axiosJWT = createAxios(user, dispatch, logoutSuccess);

    

    // useEffect(() => {
    //     setTimeout(() => {
    //         setSearchResult([]);
    //     }, 0)
    // }, [])


    const [total, setTotal] = useState(0);
    useEffect(() => {
        const getTotal = () => {
            const total = cart.reduce((prev, item) => {
                return prev +  item.quantity
            },0)
            setTotal(total)
        }

        getTotal()
    }, [cart])

    


    const handleLogout = () => {
        //logOut(dispatch, id,navigate,accessToken, axiosJWT );
        logOut(dispatch, id,navigate,accessToken );
    }


    const styleAdmin = {
        display: user?.admin ? null : "none"       
    }

    const styleUser = {
        display: accessToken ? null : "none"       
    }

    const styleisAdmin = {
        display: user?.admin ? "none" : null       
    }





    return <header className={cx('wrapper')}>
        <div className={cx('inner')}>

            <img src={logo} alt="Casio" />

            {/* <Tippy
                interactive
                visible={searchResult.length > 0}
                render={attrs => (

                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>
                                Accounts
                            </h4>
                            <AccountItem />
                            <AccountItem />
                            <AccountItem />
                            <AccountItem />
                        </PopperWrapper>
                    </div>

                )}
            >
                <div className={cx('search')}>
                    <input placeholder="Tìm kiếm sản phẩm" />
                    <button className={cx('clear')}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                    <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />

                    <button className={cx('search-btn')}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>
            </Tippy> */}
            <div className={cx('inner-center')}>
                <Link to="/"><li>TRANG CHỦ</li></Link>
                <Link to="/products"><li>SẢN PHẨM</li></Link> 
                <Link to="/create_product"><li style={styleAdmin}>THÊM SẢN PHẨM</li></Link>
                <Link to="/category"><li style={styleAdmin}>THÊM THƯƠNG HIỆU</li></Link>
                <Link to="/history"><li style={styleUser}>ĐƠN HÀNG</li></Link>
                <Link to="/total_sale"><li style={styleAdmin}>DOANH THU</li></Link>
                <Link to="/#"><li>HỖ TRỢ</li></Link>
                
            </div>


            <div className={cx('action')}>
                {/* <Link to="/">
                    <Button text className={cx('custom-text')}>Trang chủ</Button>
                </Link>
                
                <Button text to="/products" > Dòng sản phẩm</Button>
                <Button text to="/history">Lịch sử</Button> */}

                {
                    user ? (
                        <>
                            <Link to="/form">
                                <Button primary onClick={handleLogout}>Đăng xuất</Button>
                            </Link>
                        </>
                    ) : (<Link to="/form">
                            <Button primary >Đăng nhập</Button>
                        </Link>)
                }
                {/* <Link to="/form">
                    <Button primary >Đăng nhập</Button>
                </Link> */}
                
                
                {/* {
                    user?.accessToken ? <span className={cx('span')}>{total}</span>: 
                    <span className={cx('span')}>0</span>
                } */}


                {/* <span className={cx('span')}>{cart.length}</span> */}

                <div style={styleisAdmin} className={cx('pd-lr')}>

                    <Link className={cx('custom-cart')} to="/cart">
                        {/* <Button rounded leftIcon={<FontAwesomeIcon icon={faShoppingCart} />}> Giỏ hàng</Button> */}
                        {/* <FontAwesomeIcon icon={faBagShopping} className={cx('custom-icon')} />  */}
                        <img src='https://res.cloudinary.com/dljhlsbzb/image/upload/v1670418498/WatchStore/cart_c05tyr.svg'/>
                        
                        {
                            user?.accessToken ? 
                                <div className={cx('cart_num')}>
                                    {total}
                                </div>
                            : 
                                <div className={cx('cart_num')}>
                                    0
                                </div>
                        }
                    </Link>
                </div>
                
                
                

                {/* <Link  to="/cart">
                    <button className={cx('custom-cart')}>dsdsd</button>
                </Link> */}
                
                <Menu items={MENU_ITEMS}>
                    <button className={cx('more-btn')}>
                        <FontAwesomeIcon icon={faEllipsisVertical} />
                    </button>
                </Menu>


            </div>
        </div>
    </header>
}

export default Header;