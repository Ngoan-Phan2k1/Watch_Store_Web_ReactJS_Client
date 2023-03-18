
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from './Login.module.scss';
import PropTypes from 'prop-types';
import { useState } from "react";
import { loginUser } from "~/redux/apiRequest";
import { useDispatch } from "react-redux";

const cx = classNames.bind(styles);

function Login(props) {
    const {signIn} = props;
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleLogin = (e) => {
        e.preventDefault();
        const newUser = {
            username: username,
            password: password,
        };
        loginUser(newUser, dispatch, navigate);
    }

    return ( 


        <>
            {signIn !== true ? 
                (   
                
                    <div className={cx('signin-container')} style={{transform: `translateX(100%)`}}>
                        <form>
                            <h1>
                                ĐĂNG NHẬP
                            </h1>
                            <input type="text" placeholder="Name"/>
                            <input type="password" placeholder="Password"/>
                            <h4 href="#">Forgot your password</h4>
                            <button type="submit">ĐĂNG NHẬP</button>                    
                        </form>
                    </div>                
                    
                ) :
                (
                    <div className={cx('signin-container')} style={{zIndex:6}}>
                        <form onSubmit={handleLogin}>
                            <h1>
                                ĐĂNG NHẬP
                            </h1>
                            <input 
                            type="text" 
                            placeholder="Name"
                            onChange={(e) => setUsername(e.target.value)}
                            />
                            <input 
                            type="password" 
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            />
                            <h4 href="#">Forgot your password</h4>
                            <button type="submit">ĐĂNG NHẬP</button>                    
                        </form>


                        
                    </div>  
                    
                )
            }

        </>
           
    )  
}


Login.defaultProps = {
    signIn: true,
};

Login.propTypes = {
    signIn: PropTypes.bool,
};

 
export default Login;