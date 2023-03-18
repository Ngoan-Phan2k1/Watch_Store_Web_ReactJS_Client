import { useState } from 'react';
import styles from './Form.module.scss';
import classNames from "classnames/bind";
import Login from '../components/Login';
import Register from '../components/Register';
import Header from '../components/Header';
import Footer from '../components/Footer';
const cx = classNames.bind(styles);



function Form() {
    const [signIn, setSignIn] = useState(true);

    return(
        <>     
            <Header/>

            <div className={cx('container')}>
                <Login signIn={signIn}/>
                <Register signIn={signIn}/>
                {/* <BannerForm/> */}
            
                {
                    signIn !== true ? (

                    <div className={cx('bannersignin-container', {signIn } )} style={{transform: `translateX(-100%)`}}>
                        <div className={cx('overlay')} style={{transform: `translateX(50%)`}}>
                            

                            <div className={cx('leftoverlay-pannel')} style={{transform: `translateX(0)`}}>
                                <h1>Chào Mừng Bạn</h1>
                                <p>
                                    Hãy đăng nhập tại đây để có những trải nghiệm tốt nhất nhé
                                </p>
                                <button onClick={() => setSignIn(!signIn)}> ĐĂNG NHẬP</button>
                            </div>


                            <div className={cx('rightoverlay-pannel')} style={{transform: `translateX(20%)`}}>
                                <h1>Hello, Friend</h1>
                                <p>
                                    Enter your personal details and start journey with us 
                                </p>
                                <button onClick={() => setSignIn(!signIn)}> Sign Up</button>
                            </div>
                            
                            
                        </div>
                
                    </div>

                    ) : 
                    (
                    <div className={cx('bannersignin-container')} style={{zIndex:6}}>
                        <div className={cx('overlay')}>
                                

                            <div className={cx('leftoverlay-pannel')}>
                                <h1>Welcome Back!</h1>
                                <p>
                                        To keep connected with us please login with your personal info
                                </p>
                                <button onClick={() => setSignIn(!signIn)}> Sign In</button>
                            </div>


                            <div className={cx('rightoverlay-pannel')}>
                                <h1>Xin Chào</h1>
                                <p>
                                    Bạn có tài khoản chưa? Hãy đăng ký tài khoản ngay để mua sắm nào
                                </p>
                                <button onClick={() => setSignIn(!signIn)}> ĐĂNG KÝ</button>
                            </div>
                                
                                
                        </div>
                
                    </div>

                    )
                
                }


            </div>

            <Footer/>
        </>
    )
}

export default Form;