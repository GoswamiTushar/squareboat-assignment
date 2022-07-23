import Down from 'images/icons/down.svg';
import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import style from './style.module.scss';

export const Index = () => {
    const location = useLocation();
    const [logoutTileOpen, setLogoutTileOpen] = useState(false);
    const history = useHistory();

    const LogoutNotification = () => toast("You have successfully Logged Out");

    const handleLogout = () => {
        if (localStorage.getItem('squareboatToken') !== null) {
            localStorage.removeItem('squareboatToken');
            history.push("/");
            LogoutNotification();

        }
    }

    return (
        <div className={style.navigationbar}>
            <div className={style['nav-content']}>
                <div className={style["nav-title"]}>
                    <Link style={{ textDecoration: "none" }} to="/">
                        <h6 className={style['title-pt-1']}>
                            My
                            <span className={style['title-pt-2']}>
                                Jobs
                            </span>
                        </h6>
                    </Link>
                </div>
                {
                    location.pathname === "/" ?
                        <>
                            <div className={style["login-btn-container"]}>
                                <Link to="/login">
                                    <button className={style['login-btn']}>
                                        Login/Signup
                                    </button>
                                </Link>
                            </div>
                        </>
                        :
                        location.pathname === "/dashboard" ?
                            <>
                                <div className={style["container"]}>
                                    <span className={style['post-job-link']}> Post a Job
                                    </span>
                                    <span className={style['profile-bubble']}>R</span>
                                    <span
                                        className={style['expand-btn']}
                                        onClick={() => {
                                            setLogoutTileOpen(!logoutTileOpen)
                                        }}
                                    >
                                        <img src={Down} alt={"Down arrow"} className={style['icon']} />
                                    </span>
                                </div>
                                {
                                    logoutTileOpen ?
                                        <>
                                            <div className={style["logout-tile"]} onClick={handleLogout}>
                                                <Link style={{ textDecoration: "none", color: "inherit" }} to="/">Logout</Link>
                                            </div>
                                        </>
                                        :
                                        ""
                                }
                            </>
                            :
                            ""
                }
            </div>
            <ToastContainer
                hideProgressBar={true}
                autoClose={3000}
                style={{ top: "5rem", padding: "2rem" }}
            />
        </div>
    );
}

export default Index;

