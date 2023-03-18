import { faCheckCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import classNames from "classnames/bind"
import styles from './AccountItem.module.scss'

const cx = classNames.bind(styles)

function AccountItem() {

    return (
        <div className={cx('wrapper')}>
            <img className={cx('avatar')} src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/c015a88d72a116387a129d5484338e46~c5_100x100.jpeg?x-expires=1665486000&x-signature=a3i7z3ZUAGI5lysF3CbsLKHDHlo%3D" alt="Duy" />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>Nguyen Thanh Duy</span>
                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                </h4>
                <span className={cx('username')}>Nguyen Thanh Duy</span>
            </div>
        </div>
    )
}

export default AccountItem