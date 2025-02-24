import {useDispatch, useSelector} from "react-redux";
import {Button, Input} from "antd";
import {addUserDetails, login} from "../store/authSlice";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

const Login = () => {
    const dispatch = useDispatch();
    const {isAuthenticated} = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        dispatch(addUserDetails({username, password}));
        dispatch(login());
        navigate('/');
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className={'flex h-[400px] items-center justify-center flex-col gap-4'}>
            <div className={'flex flex-col gap-4'}>
                <Input placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
                <Input type={"password"} placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                <Button type="primary" onClick={handleLogin}
                        disabled={username === "" || password === ""}>Login</Button>
            </div>
        </div>
    );
};

export default Login;