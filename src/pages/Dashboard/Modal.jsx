import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CloseBtn from 'images/icons/close.svg'
import CurriculumIcon from 'images/icons/curriculum.svg'
import style from "./style.module.scss"

const defaultStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    p: 4,
};
const ModalCard = ({ name = "", email, skills }) => {
    return (
        <div className={style['card']}>
            <div className={style["applicant-info"]}>
                <div className={style["image-container"]}>
                    {name.substr(0, 1)}
                </div>
                <div className={style["name-email"]}>
                    <div className={style["name"]}>{name}</div>
                    <div className={style["email"]}>{email}</div>
                </div>
            </div>
            <div className={style["skills-container"]}>
                <div className={style["label"]}>Skills</div>
                <div className={style["skills"]}>{skills}</div>
            </div>
        </div>
    )
}

const Index = ({ open, handleClose, clickedJobID, allApplications }) => {

    return (
        <div>
            <Modal
                className={style['modal']}
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={defaultStyle}
                    className={style['content-area']}
                >
                    <div className={style["header"]}>
                        <div className={style["title"]}>
                            Applications for this job
                        </div>
                        <div className={style["close-btn"]}>
                            <img
                                src={CloseBtn}
                                alt="close"
                                className={style['btn']}
                                onClick={handleClose}
                            />
                        </div>
                    </div>

                    <div className={style["application-count"]}>
                        Total {allApplications?.length} applications
                    </div>

                    <div className={style["applications"]}>
                        {
                            allApplications?.length > 0 ?
                                allApplications?.map((obj, index) => {
                                    return (
                                        <ModalCard key={index} email={obj.email} name={obj.name} skills={obj.skills} />
                                    )
                                })
                                :
                                <div className={style["no-content"]}>
                                    <div className={style["img-container"]}>
                                        <img src={CurriculumIcon} alt="" />
                                    </div>
                                    <div className={style["text"]}>
                                        No applications available!
                                    </div>
                                </div>
                        }
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default Index;
