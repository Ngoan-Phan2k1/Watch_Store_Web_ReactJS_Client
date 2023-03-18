import classNames from "classnames/bind";
import { useEffect, useState, useContext} from 'react';
import styles from './Filters.module.scss';
import { useSelector } from 'react-redux';
import { DataContext } from '~/components/DataProvider/DataProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFilter, faArrowDownUpAcrossLine, faArrowsUpDown, faArrowsDownToLine, faArrowDownUpLock, faArrowDownShortWide} from '@fortawesome/free-solid-svg-icons'

const cx = classNames.bind(styles)



function Filters() {

    const value = useContext(DataContext);
    const [categories, setCategories] = value.CategoriesAPI.categories;
    const [products, setProducts] = value.ProductsAPI.products;
    const [category, setCategory] = value.ProductsAPI.category;
    const [search, setSearch] = value.ProductsAPI.search;
    const [sort, setSort] = value.ProductsAPI.sort;

    

    const handleCategory = e => {
        setCategory(e.target.value);
    }

    


    return (
        <div className={cx('filter-menu')}>
            <div className={cx('row')}>
                {/* <span>Lọc: </span> */}
                <div className={cx('icon-filter')}>
                    <FontAwesomeIcon icon={faFilter}/>
                </div>
                

                <select name="category" value={category} onChange={handleCategory}>
                    <option value=''>Tất cả sản phẩm</option>
                    {
                        categories.map(category => (
                            <option value={"category=" + category._id} key={category._id}>
                                {category.name}
                            </option>
                        ))
                    }
                </select>
            </div>

            <input type="text" value={search} placeholder="Tìm kiếm..."
                onChange={e => setSearch(e.target.value.toUpperCase())}
            />

            <div className={cx('row')}>
                    {/* <span>Sort By: </span> */}
                    <div className={cx('icon-filter')}>

                        <FontAwesomeIcon icon={faArrowDownShortWide}/>
                    </div>
                    
                    <select value={sort} onChange={e => setSort(e.target.value)}>
                        <option value=''>Mới nhất</option>
                        <option value='sort=oldest'>Cũ nhất</option>
                        <option value='sort=-price'>Giá: từ Cao-Thấp</option>
                        <option value='sort=price'>Giá: từ Thấp-Cao</option>
                    </select>
                </div>
            </div>

    )
}

export default Filters;