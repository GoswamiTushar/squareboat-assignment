import React from 'react';
import { useLocation } from 'react-router-dom'
import style from './style.module.scss'

const Index = () => {
    const location = useLocation()
    return (
        <>
            {location.pathname === "/"
                ?
                <div className={style['bg-formatted-landingpage']} />
                :
                location.pathname === "/login"
                    ?
                    <div className={style['bg-formatted-login']} />
                    :
                    location.pathname === "/dashboard" ?
                        <div className={style['bg-formatted-dashboard']} />
                        :
                        location.pathname === "/post-a-job" ?
                            <div className={style['bg-formatted-post-job']} />
                            :
                            ""
            }
        </>
    );
}

export default Index;
