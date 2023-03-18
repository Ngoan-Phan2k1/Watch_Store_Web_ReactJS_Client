import classNames from "classnames/bind";
import { useEffect, useState, useContext} from 'react';
import styles from './LoadMore.module.scss';
import { useSelector } from 'react-redux';
import { DataContext } from '~/components/DataProvider/DataProvider';

const cx = classNames.bind(styles)

function LoadMore() {
    const value = useContext(DataContext);
    const [page, setPage] = value.ProductsAPI.page;
    const [result] = value.ProductsAPI.result;


    return (
        <div className={cx('load-more')}>
            {
                result < page * 3 ? ""
                : <button onClick={() => setPage(page+1)}>Load more</button>
            }

        </div>
    )
}

export default LoadMore;