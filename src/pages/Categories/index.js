import { useEffect, useState, useContext} from 'react';
import { DataContext } from '~/components/DataProvider/DataProvider';
import axios from 'axios';
import classNames from "classnames/bind";
import styles from './Categories.module.scss';
import { useSelector } from 'react-redux';
import Header from '~/components/Layout/components/Header';

const cx = classNames.bind(styles)

function Categories() {
    const value = useContext(DataContext);
    const [categories] = value.CategoriesAPI.categories;
    const [category, setCategory] = useState('');
    const [callback, setCallback] = value.CategoriesAPI.callback;
    const [onEdit, setOnEdit] = useState(false);
    const [xoa, setXoa] = useState(false);
    const [id, setID] = useState('');

    const user = useSelector((state) => state.auth.login.currentUser);
    const accessToken = user?.accessToken;

    const [images, setImages] = useState(false);
    const [loading, setLoading] = useState(false);

    const createCategory = async e => {
        e.preventDefault();
        try{
            if(onEdit){
                if(!images) return alert("Chưa có ảnh upload");

                if(window.confirm("Nhấn OK để cập nhật")){
                    const res = await axios.put(`http://localhost:8000/v1/category/${id}`, {name: category, images}, {
                        headers: {token: `Bearer ${accessToken}`}
                    })
                    alert(res.data.msg); 
                }
                
            }
            else{
                const res = await axios.post('http://localhost:8000/v1/category', {name: category, images}, {
                    headers: {token: `Bearer ${accessToken}`}
                })

                
                alert(res.data.msg); 
            }
            setOnEdit(false);
            setCategory('');
            setImages(false);
            setCallback(!callback);
        }catch(err) {
            alert(err.response.data.msg);
        }
    }


    const editCategory = async (id, name, image) => {

       
        if(onEdit && xoa){
            setImages(false);
            return alert("Bạn chưa hoàn tất việc cập nhật");
        }else{
            setImages(image);
        }
         setID(id);
        setCategory(name);
        setOnEdit(true);
    }

    const reload = () => {

        if(onEdit && xoa){
            return alert("Bạn chưa hoàn tất việc cập nhật");
        }
        
        setCategory('');
        setOnEdit(false);
        setImages(false);
    }

    const deleteCategory = async (category) => {
        if(window.confirm("Bạn có chắc muốn xóa thông tin này chứ !!!")){
            try{

                await axios.post('http://localhost:8000/v1/admin/destroy', {public_id: category.images.public_id}, {
                    headers: {token: `Bearer ${accessToken}`}
                })

                const res = await axios.delete(`http://localhost:8000/v1/category/${category._id}`, {
                    headers: {token: `Bearer ${accessToken}`}
                })
                alert(res.data.msg);

                setCallback(!callback);
            }catch(err) {
                alert(err.response.data.msg);
            }
        }

        
    }


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
            setImages(res.data);
            setXoa(false);

        }catch(err){
            alert(err.response.data.msg);
        }
    }

    const handleDestroy = async (images) =>{
        try{
            if(!user?.admin) return alert("Bạn không có quyền này");
            setLoading(true);
            console.log(images);
            await axios.post('http://localhost:8000/v1/admin/destroy', {public_id: images.public_id}, {
                headers: {token: `Bearer ${accessToken}`}
            })
            setImages(false);
            setLoading(false);
            setXoa(true);
        }catch(err){
            alert(err.response.data.msg)
        }
    }

    const styleUpload = {
        display: images ? "block" : "none"
        
    }

    return (
        <>
            <Header/>
        
            <div className={cx('wrapper')}>
                <div className={cx('categories')}>
                    <form onSubmit={createCategory}>
                        <label htmlFor="category">Thương Hiệu</label>
                        {/* <input type="text" name="category" value={category} required
                            onChange={e => setCategory(e.target.value)}
                        /> */}

                        <div className={cx('nut')}>
                            <input type="text" name="category" value={category} required
                                onChange={e => setCategory(e.target.value.toUpperCase())}
                            />
                            <button type="submit">{onEdit ? "Sửa" : "Thêm"}</button>
                            <button onClick={() => reload()}>Làm mới</button>
                        </div>

                        <div className={cx('upload_thumb')}>
                            <div className={cx('upload_thumb_2')}>
                                <input type="file" name="file"  className={cx('file_up_2')} onChange={handleUpload} enctype="multipart/form-data"/>
                                {
                                    loading ? <h1>Loading</h1> : 
                                    <div style={styleUpload}  className={cx('file_img2')}>
                                        <img src={images ? images.url: ''} alt=""/>
                                        <span onClick={() => handleDestroy(images)}>X</span>
                                    </div>
                                }
                            </div>
                            
                        </div>
                        
                    </form>

                    

                    <div className={cx('col')}>
                        {
                            categories.map(category => (
                                <div className={cx('row')} key={category._id}>
                                    <p>{category.name}</p>
                                    <div>
                                        <button onClick={() => editCategory(category._id, category.name, category.images)}>Sửa</button>
                                        <button onClick={() => deleteCategory(category)}>Xóa</button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
        
        
    )
}

export default Categories;