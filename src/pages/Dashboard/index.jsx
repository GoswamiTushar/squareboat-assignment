import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { motion } from "framer-motion";
import HomeIcon from "images/icons/home.svg";
import Writing from "images/icons/writing.svg";
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Jobcard from './JobCard';
import Modal from './Modal';
import style from './style.module.scss';

const Index = () => {

    const [allRecords, setAllRecords] = useState([])
    const [open, setOpen] = useState(false);
    const [recordsCount, setRecordsCount] = useState(0);
    const [pageLimit, setPageLimit] = useState(0);
    const [currPage, setCurrPage] = useState(1);
    const [allApplications, setAllApplications] = React.useState([])
    const [clickedJobID, setClickedJobID] = useState(null);
    const paginationCount = Math.ceil(recordsCount / pageLimit);

    const LoginNotification = () => toast("You have successfully logged in.")
    const AuthorizationNotification = () => toast("Not authorized to access!")


    const history = useHistory()
    var baseUrl = "https://jobs-api.squareboat.info/api/v1/recruiters/jobs?page="

    const handleClose = () => setOpen(false)

    const pageChange = (e, p) => {

        setCurrPage(p)

        var myHeaders = new Headers();
        myHeaders.append("Authorization", localStorage.getItem("squareboatToken"));

        var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        }

        fetch(baseUrl + p, requestOptions)
            .then(response => response.json())
            .then(resObj => {
                if (resObj.code === 200) {
                    var data = resObj.data.data;
                    var total = resObj.data.metadata.count;
                    var limit = resObj.data.metadata.limit;
                    setAllRecords(data);
                    setRecordsCount(total);
                    setPageLimit(limit);
                }
            })
            .catch(error => console.log("error", error));

    }

    useEffect(() => {
        if (localStorage.getItem('squareboatToken') === null) {
            history.push("/")
            AuthorizationNotification();
        }
        else {
            LoginNotification()
            var myHeaders = new Headers();
            myHeaders.append("Authorization", localStorage.getItem("squareboatToken"));

            var requestOptions = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow"
            }

            fetch("https://jobs-api.squareboat.info/api/v1/recruiters/jobs?page=1", requestOptions)
                .then(response => response.json())
                .then(resObj => {
                    if (resObj.code === 200) {
                        var data = resObj.data.data;
                        var total = resObj.data.metadata.count;
                        var limit = resObj.data.metadata.limit;
                        setAllRecords(data);
                        setRecordsCount(total);
                        setPageLimit(limit);
                    }
                })
                .catch(error => console.log("error", error));

        }
    }, [history]);

    return (
        <section className={style["dashboard"]}>
            <div className={style["page-indicator"]}>
                <img src={HomeIcon} alt="Home" className={style['icon']} />
                <span className={style["text"]}>Home</span>
            </div>

            <div className={style["page-title"]}>
                Jobs Posted By You
            </div>
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className={style['dashboard-container']}>

                    {
                        allRecords?.length > 0 ?
                            allRecords?.map((obj, index) => {
                                return (
                                    < Jobcard
                                        setAllApplications={setAllApplications}
                                        allApplications={allApplications}
                                        key={index}
                                        jobID={obj.id}
                                        jobTitle={obj.title}
                                        jobDesc={obj.description}
                                        jobLocation={obj.location}
                                        setClickedJobID={setClickedJobID}
                                        handleOpen={() => {
                                            setOpen(true);
                                            setClickedJobID(obj.id)
                                        }}
                                    />
                                )
                            })
                            :
                            <div className={style['no-jobs']}>
                                <div className={style["img-container"]}>
                                    <img src={Writing} alt="writing icon" className={style['img']} />
                                </div>
                                <div className={style["header"]}>
                                    Jobs posted by you will be shown here
                                </div>
                                <div className={style["post-job-btn"]}>
                                    <Link to="/post-a-job">
                                        <button className={style['btn']}>Post a job</button>
                                    </Link>
                                </div>
                            </div>
                    }

                    <Modal allApplications={allApplications} clickedJobID={clickedJobID} open={open} handleClose={handleClose} />
                </div>
            </motion.div>

            <div className={style["pagination"]}>
                <Stack spacing={2}>
                    <Pagination classes={style['pagination-item']} page={currPage} onChange={pageChange} count={paginationCount} variant="outlined" shape="rounded" />
                </Stack>
            </div>
        </section>
    );
}

export default Index;
