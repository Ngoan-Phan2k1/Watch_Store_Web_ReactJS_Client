import PropTypes from 'prop-types';
import classNames from "classnames/bind";
import styles from './Register.module.scss';
import { useState } from 'react';
import { registerUser } from '~/redux/apiRequest';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);

function Register(props) {
    const {signIn} = props;
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        const newUser = {
            email: email,
            username: username,
            password: password,
            
        };
        
        registerUser(newUser, dispatch, navigate);
    }

    return (

        <>
            {signIn !== true ? 
                (
                    <div 
                        className={cx('signup-container')} 
                        style={{
                            opacity: 1,
                            transform: `translateX(100%)`
                        }}
                    >
                        <form onSubmit={handleRegister}>
                            <h1>
                                ĐĂNG KÝ
                            </h1>
                            <input 
                                type="text" 
                                placeholder="Name"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <input 
                                type="email" 
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input 
                                type="password" 
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}   
                            />
                            <button type="submit">ĐĂNG KÝ</button>
                            
                        </form>
                    </div>
                ) :
                (
                    <div className={cx('signup-container')}>
                        <form>
                            <h1>
                                ĐĂNG KÝ
                            </h1>
                            <input type="text" placeholder="Name"/>
                            <input type="email" placeholder="Email"/>
                            <input type="password" placeholder="Password"/>
                            <button type="submit">ĐĂNG KÝ</button>
                            
                        </form>
                    </div>
                )
            }
        </>

        // <div className={cx('signup-container')}>
        //     <form>
        //         <h1>
        //             Create Account
        //         </h1>
        //         <input type="text" placeholder="Name"/>
        //         <input type="email" placeholder="Email"/>
        //         <input type="password" placeholder="Password"/>
        //         <button type="submit">Sign up</button>
                    
        //     </form>
        // </div>
    )
}

Register.defaultProps = {
    signIn: true,
}

Register.propTypes = {
    signIn: PropTypes.bool,
};

export default Register;
