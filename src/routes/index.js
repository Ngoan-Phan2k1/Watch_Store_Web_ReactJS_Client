import { useSelector, useDispatch } from 'react-redux';



//Layouts
import { HeaderOnly } from '~/components/Layout';

//Pages
import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Products from '~/pages/Products';
import Upload from '~/pages/Upload';
import Seacrh from '~/pages/Search';
import Cart from '~/pages/Cart';
import DetailProduct from '~/pages/DetailProduct';
import Login from '~/components/Layout/components/Login';
import Form from '~/components/Layout/Form';
import OrderHistory from '~/pages/OrderHistory';
import OrderDetailHistory from '~/pages/OrderDetailHistory';
import Categories from '~/pages/Categories';
import CreateProduct from '~/pages/CreateProduct.js';
import ToTalSale from '~/pages/ToTalSale';

//Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/following', component: Following },
    { path: '/products', component: Products, layout: null },
    {path: '/products/:id', component: DetailProduct, layout: HeaderOnly},
    {path: '/upload', component: Upload, layout: HeaderOnly },
    {path: '/search', component: Seacrh, layout: null },
    {path: '/cart', component: Cart, layout: null},
    {path: '/login', component: Login, layout: null},
    {path: '/form', component: Form, layout: null},
    // {path: '/history', component: OrderHistory, layout: null},
    // {path: '/history/:id', component: OrderDetailHistory, layout: null},
    
    
]

const privateRoutes = [
    // {path: '/category', component: Categories, layout: null},
    {path: '/history', component: OrderHistory, layout: null},
    {path: '/history/:id', component: OrderDetailHistory, layout: null},
]


const adminRoutes = [
    {path: '/category', component: Categories, layout: null},
    {path: '/create_product', component: CreateProduct, layout: null},
    {path: '/edit_product/:id', component: CreateProduct, layout: null},
    {path: '/total_sale', component: ToTalSale, layout: null},
]



export { publicRoutes, privateRoutes, adminRoutes }