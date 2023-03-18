import Header from "~/components/Layout/components/Header";
import { useEffect, useState, useContext } from 'react';
import { DataContext } from '~/components/DataProvider/DataProvider';


import classNames from 'classnames/bind';
import styles from './CreateProduct.module.scss';
import { Link, useParams,  } from "react-router-dom";
import { useSelector } from 'react-redux';
import axios from "axios";

const cx = classNames.bind(styles);

const initialState = {
    // product_id: '',
    name: '',
    price: 0,
    desription: '',
    category: '',
    _id: ''
}

function CreateProduct() {
    const value = useContext(DataContext);
    const [product, setProduct] = useState(initialState);
    const [categories] = value.CategoriesAPI.categories;
    const [thumbnails, setThumbnails] = useState([]);
    const [images, setImages] = useState(false);
    const [images2, setImages2] = useState(false);
    const [images3, setImages3] = useState(false);
    const [images4, setImages4] = useState(false);
    const [images5, setImages5] = useState(false);
    const [loading, setLoading] = useState(false);
    const user = useSelector((state) => state.auth.login.currentUser);
    const accessToken = user?.accessToken;

    const [products] = value.ProductsAPI.products;
    const [onEdit, setOnEdit] = useState(false);
    const [callback, setCallback] = value.ProductsAPI.callback;
    const param = useParams();



    useEffect(() => {
        if(param.id){
            setOnEdit(true);
            products.forEach(product => {
                if(product._id === param.id) {
                    setProduct(product);
                    
                    setThumbnails([...thumbnails, ...product.thumbnails])
                    setImages(product.images);

                    if(product.thumbnails[1] !== undefined){
                        setImages2(product.thumbnails[1]);
                        if(product.thumbnails[2] !== undefined){
                            setImages3(product.thumbnails[2]);
                            if(product.thumbnails[3] !== undefined){
                                setImages4(product.thumbnails[3]);
                                if(product.thumbnails[4] !== undefined){
                                    setImages5(product.thumbnails[4]);
                                }
                            }
                        }
                    }
                    


                }
            })
            
        }
        else{
            setOnEdit(false);
            setProduct(initialState);
            setImages(false);


            setImages2(false);
            setImages3(false);
            setImages4(false);
            setImages5(false);
        }
    }, [param.id, products])

    const handleUpload = async e => {
        e.preventDefault()
        try{
            if(!user?.admin){
                return alert("Bạn không có quyền này")
            }
            const file = e.target.files[0];

            
            if(!file) return alert("File không tồn tại");
            if(file.size > 1024 * 1024) 
                return alert("Kích thước hình ảnh quá lớn");

            

            if(file.type !== 'image/jpeg' && file.type !== 'image/png' ) 
                return alert("File không đúng định dạng");

            let formData = new FormData();
            formData.append('file', file);


            setLoading(true);
            const res = await axios.post('http://localhost:8000/v1/admin/upload', formData,{
                headers: {token: `Bearer ${accessToken}`}
            })

            
            setLoading(false);
            setThumbnails([...thumbnails ,res.data]);
            setImages(res.data);

        }catch(err){
            alert(err.response.data.msg);
        }
    }


    const handleUpload2 = async e => {
        e.preventDefault()
        try{
            if(!user?.admin){
                return alert("Bạn không có quyền này")
            }
            if(!images) return alert("Bạn chưa thêm ảnh sản phẩm đó");
            const file = e.target.files[0];

            
            if(!file) return alert("File không tồn tại");
            if(file.size > 1024 * 1024) 
                return alert("Kích thước hình ảnh quá lớn");

            

            if(file.type !== 'image/jpeg' && file.type !== 'image/png' ) 
                return alert("File không đúng định dạng");

            let formData = new FormData();
            formData.append('file', file);


            setLoading(true);
            const res = await axios.post('http://localhost:8000/v1/admin/upload', formData,{
                headers: {token: `Bearer ${accessToken}`}
            })

            
            setLoading(false);
            setThumbnails([...thumbnails ,res.data]);
            setImages2(res.data);
            
            

        }catch(err){
            alert(err.response.data.msg);
        }
    }

    const handleUpload3 = async e => {
        e.preventDefault()
        try{
            if(!user?.admin){
                return alert("Bạn không có quyền này")
            }

            if(!images2) return alert("Bạn chưa thêm ảnh trước đó");

            const file = e.target.files[0];

            
            if(!file) return alert("File không tồn tại");
            if(file.size > 1024 * 1024) 
                return alert("Kích thước hình ảnh quá lớn");

            

            if(file.type !== 'image/jpeg' && file.type !== 'image/png' ) 
                return alert("File không đúng định dạng");

            let formData = new FormData();
            formData.append('file', file);


            setLoading(true);
            const res = await axios.post('http://localhost:8000/v1/admin/upload', formData,{
                headers: {token: `Bearer ${accessToken}`}
            })

            
            setLoading(false);

            setThumbnails([...thumbnails ,res.data]);
            setImages3(res.data);
            
            

        }catch(err){
            alert(err.response.data.msg);
        }
    }

    const handleUpload4 = async e => {
        e.preventDefault()
        try{
            if(!user?.admin){
                return alert("Bạn không có quyền này")
            }

            if(!images2 || !images3) return alert("Bạn chưa thêm ảnh trước đó");

            const file = e.target.files[0];

            
            if(!file) return alert("File không tồn tại");
            if(file.size > 1024 * 1024) 
                return alert("Kích thước hình ảnh quá lớn");

            

            if(file.type !== 'image/jpeg' && file.type !== 'image/png' ) 
                return alert("File không đúng định dạng");

            let formData = new FormData();
            formData.append('file', file);


            setLoading(true);
            const res = await axios.post('http://localhost:8000/v1/admin/upload', formData,{
                headers: {token: `Bearer ${accessToken}`}
            })

            
            setLoading(false);

            setThumbnails([...thumbnails ,res.data]);
            setImages4(res.data);
            
            

        }catch(err){
            alert(err.response.data.msg);
        }
    }


    const handleUpload5 = async e => {
        e.preventDefault()
        try{
            if(!user?.admin){
                return alert("Bạn không có quyền này")
            }

            if(!images2 || !images3 || !images4) return alert("Bạn chưa thêm ảnh trước đó");
            const file = e.target.files[0];

            
            if(!file) return alert("File không tồn tại");
            if(file.size > 1024 * 1024) 
                return alert("Kích thước hình ảnh quá lớn");

            

            if(file.type !== 'image/jpeg' && file.type !== 'image/png' ) 
                return alert("File không đúng định dạng");

            let formData = new FormData();
            formData.append('file', file);


            setLoading(true);
            const res = await axios.post('http://localhost:8000/v1/admin/upload', formData,{
                headers: {token: `Bearer ${accessToken}`}
            })

            
            setLoading(false);

            setThumbnails([...thumbnails ,res.data]);
            setImages5(res.data);
            
            

        }catch(err){
            alert(err.response.data.msg);
        }
    }


    const handleDestroy = async (images) => {
        try{
            if(!user?.admin) return alert("Bạn không có quyền này");
            setLoading(true);
            await axios.post('http://localhost:8000/v1/admin/destroy', {public_id: images.public_id}, {
                headers: {token: `Bearer ${accessToken}`}
            })

            thumbnails.splice(0, 1);
            setThumbnails([...thumbnails]);
            setImages(false);
            setLoading(false);
        }catch(err){
            alert(err.response.data.msg)
        }
    }

    const handleDestroy2 = async (images) => {
        try{
            if(!user?.admin) return alert("Bạn không có quyền này");
            setLoading(true);
            await axios.post('http://localhost:8000/v1/admin/destroy', {public_id: images.public_id}, {
                headers: {token: `Bearer ${accessToken}`}
            })
            thumbnails.splice(1, 1);
            setThumbnails([...thumbnails]);
            setImages2(false);
            setLoading(false);
        }catch(err){
            alert(err.response.data.msg)
        }
    }

    const handleDestroy3 = async (images) => {
        try{
            if(!user?.admin) return alert("Bạn không có quyền này");
            setLoading(true);
            await axios.post('http://localhost:8000/v1/admin/destroy', {public_id: images.public_id}, {
                headers: {token: `Bearer ${accessToken}`}
            })
            thumbnails.splice(2, 1);
            setThumbnails([...thumbnails]);
            setImages3(false);
            setLoading(false);
        }catch(err){
            alert(err.response.data.msg)
        }
    }

    const handleDestroy4 = async (images) => {
        try{
            if(!user?.admin) return alert("Bạn không có quyền này");
            setLoading(true);
            await axios.post('http://localhost:8000/v1/admin/destroy', {public_id: images.public_id}, {
                headers: {token: `Bearer ${accessToken}`}
            })
            thumbnails.splice(3, 1);
            setThumbnails([...thumbnails]);
            setImages4(false);
            setLoading(false);
        }catch(err){
            alert(err.response.data.msg)
        }
    }

    const handleDestroy5 = async (images) => {
        try{
            if(!user?.admin) return alert("Bạn không có quyền này");
            setLoading(true);
            await axios.post('http://localhost:8000/v1/admin/destroy', {public_id: images.public_id}, {
                headers: {token: `Bearer ${accessToken}`}
            })
            thumbnails.splice(4, 1);
            setThumbnails([...thumbnails]);
            setImages5(false);
            setLoading(false);
        }catch(err){
            alert(err.response.data.msg)
        }
    }

    const handleChangeInput = e => {
        //const {value} = e.target.value.toUpperCase();
        // const {name} = e.target.name;

        const {name, value} = e.target;    
        setProduct({...product, [name]: value})
    }


    const handleChangeInputName = e => {
        //const {value} = e.target.value.toUpperCase();
        // const {name} = e.target.name;

        const {name, value} = e.target;    
        setProduct({...product, [name]: value.toUpperCase()})
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try{
            if(!user?.admin) return alert("Bạn không có quyền này");
            if(!images) return alert("Không tồn tại ảnh upload");

            if(onEdit){
                await axios.put(`http://localhost:8000/v2/product/${product._id}`, {...product, images, thumbnails}, {
                    headers: {token: `Bearer ${accessToken}`}
                })
            }else{
                await axios.post('http://localhost:8000/v2/product', {...product, images, thumbnails}, {
                    headers: {token: `Bearer ${accessToken}`}
                })
            }

            setCallback(!callback);
            setImages(false);  //chuyen trang bo 
            setProduct(initialState); //chuyen trang bo
            

        }catch(err){
            alert(err.response.data.msg)
        }
    }

    const styleUpload = {
        display: images ? "block" : "none"
        
    }
    const styleUpload2 = {
        display: images2 ? "block" : "none"
    }
    const styleUpload3 = {
        display: images3 ? "block" : "none"
    }
    const styleUpload4 = {
        display: images4 ? "block" : "none"
    }
    const styleUpload5 = {
        display: images5 ? "block" : "none"
    }

    return (
        <>
            <Header/>
            <div className={cx('wrapper')}>
                <div className={cx('create_product')}>
                    <div className={cx('upload')}>
                        <input type="file" name="file" className={cx('file_up')} onChange={handleUpload} enctype="multipart/form-data"/>
                        {
                            loading ? <h1>Loading</h1> : 
                            <div style={styleUpload}  className={cx('file_img')}>
                                <img src={images ? images.url: ''} alt=""/>
                                <span onClick={() => handleDestroy(images)}>X</span>
                            </div>
                        }
                        {/* <div style={styleUpload}  className={cx('file_img')}>
                            <img src={images ? images.url: ''} alt=""/>
                            <span>X</span>
                        </div> */}
                        <div className={cx('upload_thumb')}>
                            <div className={cx('upload_thumb_2')}>
                                <input type="file" name="file"  className={cx('file_up_2')} onChange={handleUpload2} enctype="multipart/form-data"/>
                                <div style={styleUpload2}  className={cx('file_img2')}>
                                    <img src={images2 ? images2.url: ''} alt=""/>
                                    <span onClick={() => handleDestroy2(images2)}>X</span>
                                </div>
                            </div>


                            <div className={cx('upload_thumb_2')}>
                                <input type="file" name="file"  className={cx('file_up_2')} onChange={handleUpload3} enctype="multipart/form-data"/>
                                <div style={styleUpload3}  className={cx('file_img2')}>
                                    <img src={images3 ? images3.url: ''} alt=""/>
                                    <span onClick={() => handleDestroy3(images3)}>X</span>
                                </div>
                            </div>
                            <div className={cx('upload_thumb_2')}>
                                <input type="file" name="file"  className={cx('file_up_2')} onChange={handleUpload4} enctype="multipart/form-data"/>
                                <div style={styleUpload4}  className={cx('file_img2')}>
                                    <img src={images4 ? images4.url: ''} alt=""/>
                                    <span onClick={() => handleDestroy4(images4)}>X</span>
                                </div>
                            </div>
                            <div className={cx('upload_thumb_2')}>
                                <input type="file" name="file"  className={cx('file_up_2')} onChange={handleUpload5} enctype="multipart/form-data"/>
                                <div style={styleUpload5}  className={cx('file_img2')}>
                                    <img src={images5 ? images5.url: ''} alt=""/>
                                    <span onClick={() => handleDestroy5(images5)}>X</span>
                                </div>
                            </div>
                            
                        </div>
                        
                    </div>

                    <form onSubmit={handleSubmit}>
                        {/* <div className={cx('row')}>
                            <label htmlFor="product_id">Product_id</label>
                            <input type="text" name="product_id" id="product_id" required
                            value={product.product_id}
                            onChange={handleChangeInput}
                            disabled={product._id}
                        />

                        </div> */}

                        <div className={cx('row')}>
                            <label htmlFor="name">Tên</label>
                            <input type="text" name="name" id="name" required
                            value={product.name}
                            onChange={handleChangeInputName}
                        />

                        </div>

                        <div className={cx('row')}>
                            <label htmlFor="price">Giá bán</label>
                            <input type="number" name="price" id="price" required
                            value={product.price}
                            onChange={handleChangeInput}
                        />

                        </div>

                        <div className={cx('row')}>
                            <label htmlFor="desription">Mô tả</label>
                            <textarea type="text" name="desription" id="desription" required
                            value={product.desription} rows="7"
                            onChange={handleChangeInput}
                        />

                        </div>

                        <div className={cx('row')}>
                            <label htmlFor="categories">Thương hiệu</label>
                            <select name="category"  value={product.category} onChange={handleChangeInput} required>
                                <option value="">Hãy chọn một</option>
                                {
                                    categories.map(category => (
                                        <option value={category._id} key={category._id}>
                                            {category.name}
                                        </option>
                                    ))
                                }       
                                
                            </select>

                        </div>

                        <button type="submit">{onEdit ? "Cập nhật": "Thêm"}</button>
                    </form>
                </div>
            </div>
            
        </>
        
    )
}

export default CreateProduct;