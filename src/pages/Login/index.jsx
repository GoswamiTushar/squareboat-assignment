import { motion } from "framer-motion";
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { loginValidator } from 'utils/validators';
import style from './style.module.scss';

const Login = () => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState(null)
    const history = useHistory();

    const handleLogin = () => {
        var res = loginValidator({ email: email, password: password, setError: setError })
        if (res) {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "email": email,
                "password": password
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("https://jobs-api.squareboat.info/api/v1/auth/login/", requestOptions)
                .then(response => response?.json())
                .then(resObj => {
                    if (resObj?.data?.token) {
                        localStorage.clear();
                        localStorage.setItem('squareboatToken', resObj.data.token);
                        history.push("/dashboard")
                    } else {
                        localStorage.clear();
                    }
                })
                .catch(error => {
                    console.log('error', error)
                    setError(error)
                });
        }
        else {
            console.log("error");
        }
    }
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className={style['login-card']}>
                <div className={style["header"]}>
                    Login
                </div>
                <div className={style["login-form"]}>
                    <label htmlFor="email">
                        Email address
                    </label>
                    <input
                        className={error === null ? style['normal-state'] : style['error-state']}
                        type="email"
                        placeholder="Enter you email"
                        name="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                    />
                    <label htmlFor="pasword">
                        Password
                    </label>
                    <input
                        className={error === null ? style['normal-state'] : style['error-state']}
                        type="password"
                        placeholder="Enter your password"
                        name="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                    />
                </div>
                {
                    error !== null ?
                        <div className={style["error-message"]}>
                            {error}
                        </div>
                        :
                        ""
                }
                <div className={style["btn-container"]}>
                    <button
                        onClick={handleLogin}
                        className={style['login-btn']}>
                        Login
                    </button>
                </div>
                <div className={style["signup-switch"]}>
                    New to MyJobs?<Link className={style['signup-link']} to="/"> Create an account</Link>
                </div>
            </div>
        </motion.div>
    )
}




const Index = () => {
    return (
        <div className={style['auth-page']}>
            <Login />
        </div>
    );
}

export default Index;
