import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [errors, setErrors] = useState(null);
    const { setUser, setToken } = useStateContext();
    const navigate = useNavigate();

    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        axiosClient.post('/login', payload)
            .then(({ data }) => {
                setToken(data.token);
                setUser(data.user);
                navigate('/tasks');
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    console.log(response.data.errors);
                    setErrors(response.data.errors);
                }
            });
    };

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">Login na sua Conta</h1>
                    {errors && (
                        <div className="Alert">
                            {Object.keys(errors).map(key => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    )}
                    <div className="input-group">
                        <input ref={emailRef} type="text" className="form-control" placeholder="Email" />
                    </div>
                    <div className="input-group">
                        <input ref={passwordRef} type="password" className="form-control" placeholder="Password" />
                    </div>
                    <div className="input-group">
                        <button type="submit" className="btn btn-primary btn-block">Login</button>
                    </div>
                    <p className="message">
                        Not Registered? <Link to="/register">Create an account</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
