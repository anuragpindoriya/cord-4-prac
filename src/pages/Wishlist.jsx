import {useDispatch, useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {Button, Card} from "antd";
import {addToWishlist} from "../store/productSlice.js";
import {toast} from "sonner";
import {useMemo} from "react";

const Cart = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);
    const wiseListProduct = useMemo(() => products?.filter((item) => item.isInWishlist), [products]);
    const totalProduct = useMemo(() => wiseListProduct.length, [wiseListProduct]);

    const {isAuthenticated} = useSelector((state) => state.auth);

    if (!isAuthenticated) return <Navigate to="/login"/>;
    const handelRemoveFromWiseList = (product) => {
        dispatch(addToWishlist(product));
        toast.success("Product remove from wishlist");
    }
    return (
        <>
            {
                totalProduct > 0 ? <div>
                    <h2>Wish List</h2>
                    <div style={{display: "flex", gap: "20px", flexWrap: "wrap"}}>
                        {wiseListProduct.map((product) => (
                            <Card key={product.id} title={product.title} style={{width: 300}}>
                                <img src={product.image} alt={product.title}/>
                                <p>Price: ${product.price}</p>
                                <Button type={"primary"}
                                        onClick={() => handelRemoveFromWiseList(product)} danger>Remove from
                                    wishlist</Button>

                            </Card>
                        ))}
                    </div>
                </div> : <div><p className={'text-[40px]'}>No product in wishlist</p></div>
            }

        </>
    );
};

export default Cart;
