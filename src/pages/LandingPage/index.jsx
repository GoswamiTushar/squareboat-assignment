import { motion } from "framer-motion"
import React from 'react'
import { Link } from 'react-router-dom'
import style from './style.module.scss'
import { CardContent, CompanyLogos, LandingPageInfo } from './_base'

function index() {
    return (
        <>
            <motion.div
                className="container text-center  bg-black"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
            >

                <section className={style['landing-page']}>

                    <div className={style["home-wrapper"]}>
                        <div className={`${style["home-heading"]} ${style['fc-centre']}`}>
                            <div className={style['styled-white']}>
                                Welcome to <br />
                                My<span className={style['styled-blue']}>Jobs</span>
                                <div className={style['btn-container']}>
                                    <button className={style['get-started']}>
                                        <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/login"> Get Started</Link></button>
                                </div>
                            </div>
                        </div>
                        <div className={`${style["home-pic"]} ${style['fc-centre']}`}>
                            <img src={LandingPageInfo.image} alt="not available" className={style['landing-image']} />
                        </div>
                    </div>

                    <div className={style["why-us"]}>
                        <div className={style["header"]}>
                            Why Us
                        </div>
                        <div className={style["divider-wrapper"]}>
                            <div className={style["underline"]}></div>
                        </div>

                        <div className={style["why-us-card-container"]}>
                            {
                                CardContent.map((obj, i) => {
                                    return (
                                        <>
                                            <div className={style["card"]}>
                                                <div className={style["card-header"]}>
                                                    {obj.header}
                                                </div>
                                                <div className={style["card-desc"]}>
                                                    {obj.desc}
                                                </div>
                                            </div>
                                        </>
                                    )
                                })
                            }
                        </div>
                    </div>

                    <div className={style["allies"]}>
                        <div className={style["header"]}>Companies Who Trust Us</div>
                        <div className={style["divider-wrapper"]}>
                            <div className={style["underline"]}></div>
                        </div>
                        <div className={style["companies"]}>
                            {
                                CompanyLogos.map((image, i) => {
                                    return (
                                        <div className={style['logo-container']} index={i}>
                                            <img src={image} className={style['logo']} alt="img" srcset="" />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                </section>
            </motion.div>
        </>
    )
}

export default index