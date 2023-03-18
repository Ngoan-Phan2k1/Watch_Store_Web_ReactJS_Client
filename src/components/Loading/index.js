import classNames from 'classnames/bind';

import styles from './Loading.module.scss';
const cx = classNames.bind(styles);

function Loading(){
    return (
        <div className="load-page">
            <div className="loader">
                <div>
                    <h1>Loading</h1>
                    <div>
                        <div>
                            <div>
                                <div>
                                    <div>
                                        <div>
                                            <div></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loading;