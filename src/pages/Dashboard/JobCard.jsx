import React from 'react';
import { useHistory } from 'react-router-dom';
import locationIcon from "images/icons/location.svg"
import style from './style.module.scss'

const Jobcard = ({ jobTitle, jobDesc, jobLocation, handleOpen, jobID, setClickedJobID, allApplications, setAllApplications }) => {

    const history = useHistory();

    const URL = `https://jobs-api.squareboat.info/api/v1/recruiters/jobs/${jobID}/candidates`

    const handleCLick = () => {
        setClickedJobID(jobID)
        handleOpen();
        console.log(jobID);

        if (localStorage.getItem('squareboatToken') === null) {
            history.push("/")
            alert("Not authorized")
        }
        else {
            var myHeaders = new Headers();
            console.log(localStorage.getItem("squareboatToken"));
            console.log(jobID);
            myHeaders.append("Authorization", localStorage.getItem("squareboatToken"));

            var requestOptions = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow"
            }

            fetch(URL, requestOptions)
                .then(response => response.json())
                .then(resObj => {
                    console.log(resObj)

                    if (resObj.code === 200) {
                        setAllApplications(resObj.data)
                    }
                })
                .catch(error => console.log("error", error));
        }
    }
    return (
        <>
            <div className={style["dashboard-item"]}>
                <div className={style["post-title"]}>
                    {jobTitle}
                </div>
                <div className={style["post-desc"]}>
                    {jobDesc}
                </div>
                <div className={style["additional-info"]}>
                    <div className={style["location"]}>
                        <img src={locationIcon} alt="location icon" className={style['icon']} />
                        <span className={style['location-name']}>
                            {jobLocation}
                        </span>
                    </div>
                    <div className={style["btn-container"]}>
                        <button
                            onClick={handleCLick}
                            className={style["view-btn"]}>
                            View Application
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Jobcard;
