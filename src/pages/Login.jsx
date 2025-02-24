import {useDispatch} from "react-redux";
import {Button, Input} from "antd";
import {login} from "../store/authSlice";

const Login = () => {
    const dispatch = useDispatch();

    return (
        <div>
            <Input placeholder="Username"/>
            <Input placeholder="Password"/>
            <Button type="primary" onClick={() => dispatch(login())}>Login</Button>
        </div>
    );
};

export default Login;
