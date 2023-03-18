import styles from './BannerForm.module.scss';
import classNames from "classnames/bind";
import Paragraph from 'antd/lib/skeleton/Paragraph';

const cx = classNames.bind(styles);
function BannerForm() {
    return (
        <div className={cx('bannersignin-container')}>
            <div className={cx('overlay')}>
                

                <div className={cx('leftoverlay-pannel')}>
                    <h1>Welcome Back!</h1>
                    <p>
                        To keep connected with us please login with your personal info
                    </p>
                    <button> Sign In</button>
                </div>


                <div className={cx('rightoverlay-pannel')}>
                    <h1>Hello, Friend</h1>
                    <p>
                        Enter your personal details and start journey with us 
                    </p>
                    <button> Sign Up</button>
                </div>
                
                
            </div>
            
        </div>
    )
}

export default BannerForm;