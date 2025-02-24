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
    const totalAmount = useMemo(() => cartProduct.reduce((acc, item) => acc + item.price, 0), [cartProduct]);
    const totalProduct = useMemo(() => cartProduct.length, [cartProduct]);
    const {isAuthenticated} = useSelector((state) => state.auth);

    if (!isAuthenticated) return <Navigate to="/login"/>;
    const handelRemoveFromCart = (product) => {
        dispatch(addToCart(product));
        toast.success("Product remove from cart");
    }
    const resetCart = () => {
        cartProduct.forEach((product) => {
            dispatch(addToCart(product));
        })

        toast.success('Thank you for purchase ')
    }
    return (
        <div className={'flex gap-[20px]'}>
            {totalProduct > 0 ? <div>
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
            </div> : <div><p className={'text-[40px]'}>No product in cart</p></div>}
            {totalProduct > 0 && (<div className={'h-[20px] py-[20px] flex flex-col gap-[10px]'}>
                <p className={'text-[20px]'}>Total number of product:- {totalProduct}</p>
                <p className={'text-[20px]'}>Total amount:- ${totalAmount}</p>
                <div>
                    <Button type={'primary'} onClick={resetCart}>Buynow</Button>
                </div>
            </div>)}
        </div>
    );
};

export default Cart;
