import {useDispatch, useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {Button, Card} from "antd";
import {useMemo} from "react";
import {addToCart} from "../store/productSlice.js";
import {toast} from "sonner";

const Cart = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);
    const cartProduct = useMemo(() => products?.filter((item) => item.isInCart), [products]);
    const {isAuthenticated} = useSelector((state) => state.auth);

    if (!isAuthenticated) return <Navigate to="/login"/>;
    const handelRemoveFromCart = (product) => {
        dispatch(addToCart(product));
        toast.success("Product remove from cart");
    }

    return (
        <div>
            <h2>Cart</h2>
            <div style={{display: "flex", gap: "20px", flexWrap: "wrap"}}>
                {cartProduct.map((product) => (
                    <Card key={product.id} title={product.title} style={{width: 300}}>
                        <img src={product.image} alt={product.title}/>
                        <p>Price: ${product.price}</p>
                        <Button type={"primary"}
                                onClick={() => handelRemoveFromCart(product)}>Remove from cart</Button>

                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Cart;
