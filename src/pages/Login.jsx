import {useDispatch, useSelector} from "react-redux";
import {Button, Input} from "antd";
import {login} from "../store/authSlice";
import {Navigate} from "react-router-dom";


const Login = () => {
    const dispatch = useDispatch();
    const {isAuthenticated} = useSelector((state) => state.auth);
    if (isAuthenticated) return <Navigate to="/"/>;


    return (
        <div>
            <Input placeholder="Username"/>
            <Input placeholder="Password"/>
            <Button type="primary" onClick={() => dispatch(login())}>Login</Button>
        </div>
    );
};

export default Login;
