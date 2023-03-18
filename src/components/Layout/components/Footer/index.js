
import { Row, Col } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

import logoFooter from '~/assets/web-images/casio-logo-footer.png';
import logoArea2 from '~/assets/web-images/twitter-1.png';
import logoAreaEnd from '~/assets/web-images/payment.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpenReader, faCircleStop, faEnvelope, faFax, faIdCard, faMagnifyingGlass, faPhone, faSitemap, faUser } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <footer>
            <div className={cx('footer-full')}>

                <div className={cx('footer-container', 'grid', 'wide')}>
                    <Row>
                        <Col lg={3} md={6} sm={12}>
                            <div className={cx('footer-contact', 'padding-area')}>
                                <img src={logoFooter} alt="logo" />
                                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt.</p>

                                <ul className={cx('address')}>
                                    <li>
                                        <button>
                                            <FontAwesomeIcon icon={faFax} />
                                        </button>
                                        (800) 123 456 789
                                    </li>
                                    <li>
                                        <button>
                                            <FontAwesomeIcon icon={faPhone} />
                                        </button>
                                        (800) 123 456 789
                                    </li>
                                    <li>
                                        <button>
                                            <FontAwesomeIcon icon={faEnvelope} />
                                        </button>
                                        admin@bootexperts.com
                                    </li>

                                </ul>
                            </div>
                        </Col>


                        <Col lg={3} md={6} sm={12}>
                            <div className={cx('footer-tweets', 'padding-area')}>
                                <div class="footer-title">
                                    <h3>Latest tweets</h3>
                                </div>

                                <div className={cx('twitter-feed')}>
                                    <div className={cx('twitter-article')}>
                                        <div class="twitter-img">
                                            <img src={logoArea2} alt="logo" />
                                        </div>

                                        <div className={cx('twitter-text')}>
                                            <p>Raboda Fashion HMagento JTheme comes up with pure white and grey, which great show your products. Check it: </p>
                                            <a href="https://v5.reactrouter.com/web/api/Link">https://t.co/iu0OYBwti8</a>


                                            <div className={cx('twitter-time')}>
                                                <a href="https://v5.reactrouter.com/web/api/Link">16h</a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={cx('twitter-article')}>
                                        <div class="twitter-img">
                                            <img src={logoArea2} alt="logo" />
                                        </div>

                                        <div className={cx('twitter-text')}>
                                            <p>Raboda Fashion #Magento #Theme comes up with pure white and grey, which great show your products. Check it: </p>
                                            <a href="https://v5.reactrouter.com/web/api/Link">https://t.co/iu0OYBwti8</a>
                                            <div className={cx('twitter-time')}>
                                                <a href="/#">16h</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </Col>

                        <Col lg={3} md={6} sm={12}>
                            <div className={cx('footer-support', 'padding-area')}>
                                <div className={cx('footer-title')}>
                                    <h3>Our support</h3>
                                </div>
                                <div className={cx('footer-menu')}>
                                    <ul>
                                        <li>
                                            <button>
                                                <FontAwesomeIcon icon={faSitemap} />
                                            </button>
                                            Sitemap
                                        </li>
                                        <li>
                                            <button>
                                                <FontAwesomeIcon icon={faBookOpenReader} />
                                            </button>
                                            Privacy Policy

                                        </li>
                                        <li>
                                            <button>
                                                <FontAwesomeIcon icon={faUser} />
                                            </button>
                                            Your Account
                                        </li>
                                        <li>
                                            <button>
                                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                                            </button>
                                            Advanced Search
                                        </li>
                                        <li>
                                            <button>
                                                <FontAwesomeIcon icon={faIdCard} />
                                            </button>
                                            Contact Us
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </Col>

                        <Col lg={3} md={6} sm={12}>
                            <div className={cx('footer-info', 'padding-area')}>
                                <div className={cx('footer-title')}>
                                    <h3>Our information</h3>
                                </div>

                                <div className={cx('footer-menu')}>
                                    <ul>
                                        <li>
                                            <button>
                                                <FontAwesomeIcon icon={faCircleStop} />
                                            </button>
                                            About Us
                                        </li>
                                        <li>
                                            <button>
                                                <FontAwesomeIcon icon={faCircleStop} />
                                            </button>
                                            Customer Service
                                        </li>
                                        <li>
                                            <button>
                                                <FontAwesomeIcon icon={faCircleStop} />
                                            </button>
                                            Privacy Policy
                                        </li>
                                        <li>
                                            <button>
                                                <FontAwesomeIcon icon={faCircleStop} />
                                            </button>
                                            Orders and Returns
                                        </li>
                                        <li>
                                            <button>
                                                <FontAwesomeIcon icon={faCircleStop} />
                                            </button>
                                            Site Map
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>




            </div>

            <div className={cx('footer-end')}>
                <div className={cx('inner')}>
                    <Row>
                        <Col lg={6}>
                            <div className={cx('footer-copyright')}>
                                <p>Copyright &copy; 2016 <a href="/#"> Bootexperts</a>. All Rights Reserved</p>
                            </div>
                        </Col>
                        <Col lg={6}>
                            <div className={cx('payment-icon')}>
                                <img src={logoAreaEnd} alt="" />
                            </div>
                        </Col>
                    </Row>
                </div>


            </div>
        </footer>
    )
}

export default Footer;