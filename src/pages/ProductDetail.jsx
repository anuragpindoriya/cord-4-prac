import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Button} from "antd";
import {addToCart, addToWishlist} from "../store/productSlice.js";
import {toast} from "sonner";

const ProductDetail = () => {
    const {id} = useParams();

    const products = useSelector((state) => state.products.products);
    const dispatch = useDispatch();
    const product = products.find((product) => product.id.toString() === id);

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

    return (<div className={'flex gap-[20px]'}>
            <div className={'max-w-[50%]'}>
                <span className={'text-[20px]'}>{product?.title}</span>
                <img src={product.image} alt={product.title}/>

            </div>
            <div className={'flex flex-col gap-4 pt-[200px]'}>
                <div>
                    <h2>Product name :- {product.title}</h2>
                    <p>Product description :- {product.description}</p>
                    <p>Product price :- {product.price}</p>
                </div>
                <div className={'flex gap-[10px]'}>
                    <Button type={product.isInCart ? "primary" : ""}
                            onClick={() => handelProductAction(product, "cart")}>Add to Cart</Button>
                    <Button type={product.isInWishlist ? "primary" : ""}
                            onClick={() => handelProductAction(product)} danger>Add to Wishlist</Button>
                </div>

            </div>
        </div>
    );
}
export default ProductDetail;