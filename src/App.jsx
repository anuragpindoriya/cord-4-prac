import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Button, Layout, Menu} from "antd";
import {logout} from "./store/authSlice";
import Dashboard from "./pages/Dashboard";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import {useEffect} from "react";
import {addToCart, addToWishlist, updateAllProductProperty, updatePropertyOfProduct} from "./store/productSlice.js";
import ProductDetail from "./pages/ProductDetail.jsx";

const {Header, Content} = Layout;

const App = () => {
    const {isAuthenticated, userName} = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    // this get value of product from local storage and update product
    useEffect(() => {

        // only update cart and wishlist if user is authenticated
        if (isAuthenticated) {
            const cartValue = JSON.parse(localStorage.getItem('cart'));
            const wishlistValue = JSON.parse(localStorage.getItem('wishlist'));

            cartValue.forEach((item) => {
                dispatch(addToCart(item));
                dispatch(updatePropertyOfProduct({id: item.id, property: "isInCart", value: true}));
            });

            wishlistValue.forEach((item) => {
                dispatch(addToWishlist(item));
                dispatch(updatePropertyOfProduct({id: item.id, property: "isInWishlist", value: true}));
            });
        }

    }, [dispatch, isAuthenticated]);
    const handelLogout = () => {
        dispatch(logout());

        // after logout it handel to remove all product from cart and wishlist
        dispatch(updateAllProductProperty({property: "isInCart", value: false}));
        dispatch(updateAllProductProperty({property: "isInWishlist", value: false}));
    }
    return (
        <Router>
            <Layout className={'h-[100%]'}>
                <Header>
                    <Menu theme="dark" mode="horizontal" className="flex justify-between">
                        <div>
                            <Menu.Item key="1"><Link to="/">Dashboard</Link></Menu.Item>
                            <Menu.Item key="2"><Link to="/cart">Cart</Link></Menu.Item>
                            <Menu.Item key="3"><Link to="/wishlist">Wishlist</Link></Menu.Item>
                        </div>
                        <div className={'flex items-center gap-4'}>
                            {isAuthenticated ? (<>
                                    <p>Welcome back {userName}</p>
                                    <Button onClick={() => handelLogout()}>Logout</Button>

                                </>
                            ) : (
                                <Link to="/login"><Button>Login</Button></Link>
                            )}
                        </div>

                    </Menu>
                </Header>
                <Content style={{padding: "20px"}}>
                    <Routes>
                        <Route path="/" element={<Dashboard/>}/>
                        <Route path="/product/:id" element={<ProductDetail/>}/>
                        <Route path="/login" element={<Login/>}/>

                        {/* Protected Routes */}
                        <Route path="/cart" element={<ProtectedRoute><Cart/></ProtectedRoute>}/>
                        <Route path="/wishlist" element={<ProtectedRoute><Wishlist/></ProtectedRoute>}/>
                    </Routes>
                </Content>
            </Layout>
        </Router>
    );
};

export default App;
