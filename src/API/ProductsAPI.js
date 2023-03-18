import { useState, useEffect } from "react";
import axios from "axios";



function ProductsAPI() {
    const [products, setProducts] = useState([]);
    const [productsnotFilter, setProductsnotFilter] = useState([]);
    const [callback, setCallback] = useState(false);
    const [category, setCategory] = useState('');
    const [search, setSearch] = useState('');
    const [sort, serSort] = useState('');
    const [page, setPage] = useState(1);
    const [result, setResult] = useState(0);

    // const getProducts = async () => {
    //     const res = await axios.get('http://localhost:8000/v2/product');
    //     setProducts(res.data.products);
        
    // }

    // useEffect(() => {
    //     getProducts()
    // }, [])


    //cafe full
    // useEffect(() => {
    //     const getProducts = async () => {
    //         const res = await axios.get('http://localhost:8000/v2/product');
    //         setProducts(res.data.products);
            
    //     }
    //     getProducts()
    // }, [callback])



    useEffect(() => {
        const getProducts = async () => {
            const res = await axios.get(`http://localhost:8000/v2/product?limit=${page*6}&${category}&${sort}&name[regex]=${search}`);
            setProducts(res.data.products);
            setResult(res.data.result);   
        }

        const getProductsNotFilter = async () => {
            const res = await axios.get('http://localhost:8000/v2/product/notFilter');

            //setProductsnotFilter(res.data.products);

            setProductsnotFilter(res.data);
        }
        getProducts();
        getProductsNotFilter();
    }, [callback, category, sort, search, page])

    return {
        products: [products, setProducts],
        callback: [callback, setCallback],
        category: [category, setCategory],
        search: [search, setSearch],
        sort: [sort, serSort],
        page: [page, setPage],
        result: [result, setResult],
        productsnotFilter: [productsnotFilter, setProductsnotFilter]
    }
}

export default ProductsAPI;