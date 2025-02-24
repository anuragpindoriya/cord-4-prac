import {useDispatch, useSelector} from "react-redux";
import {Button, Card} from "antd";
import {addToCart, addToWishlist} from "../store/productSlice.js";
import {toast} from "sonner";

const Dashboard = () => {

    const products = useSelector((state) => state.products.products);
    const dispatch = useDispatch();
    const handelProductAction = (product, action) => {
        if (action === "cart") {
            dispatch(addToCart(product));
            if (product.isInCart) {
                toast.success("Product remove from cart");
            } else {
                toast.success("Product added to cart");
            }
        } else {
            dispatch(addToWishlist(product));
            if (product.isInWishlist) {
                toast.success("Product remove from wishlist");
            } else {
                toast.success("Product added to wishlist");
            }
        }
    }
    return (
        <div style={{display: "flex", gap: "20px", flexWrap: "wrap"}}>
            {products.map((product) => {
                // console.log(product)
                return (
                    <Card key={product.id} title={product.title} style={{width: 300}}>
                        <img src={product.image} alt={product.title}/>
                        <p>Price: ${product.price}</p>
                        <Button type={product.isInCart ? "primary" : ""}
                                onClick={() => handelProductAction(product, "cart")}>Add to Cart</Button>
                        <Button type={product.isInWishlist ? "primary" : ""}
                                onClick={() => handelProductAction(product)} danger>Add to Wishlist</Button>
                    </Card>
                )
            })}
        </div>
    );
};

export default Dashboard;
