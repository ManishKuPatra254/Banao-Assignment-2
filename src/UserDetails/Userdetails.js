import React, { Fragment, useState, useEffect } from 'react';
import styles from './Userdetails.module.css';
import { Button } from '@mui/material';
import { CircularProgress } from '@mui/material';


export function Userdetails() {
    const [displayName, setDisplayName] = useState([]);
    const [clickedUser, setClickedUser] = useState(null);
    const [progessLoad, setProgressLoad] = useState(false)


    useEffect(() => {

        fetch('https://602e7c2c4410730017c50b9d.mockapi.io/users')
            .then(data => data.json())
            .then(response => {
                console.log(response)
                setDisplayName(response)

            })
            .catch(error => console.log(error));
    }, []);


    function handleClickNameDisplay(id) {
        setProgressLoad(true)
        const user = displayName.find(user => user.id === id);
        setClickedUser(user);
        setTimeout(() => {
            setClickedUser(user);
            setProgressLoad(false);
        }, 2000);
    }

    return (
        <Fragment>
            <div className={styles.main_user_details}>
                <div className={styles.sub_user_details1}>
                    <h1>USER LIST</h1>
                    {
                        displayName.map((items) => (
                            <Fragment>
                                <div className={styles.names_id_btn}>
                                    <div className={styles.names} key={items.id}>
                                        <Button sx={{ textTransform: 'unset' }} variant="contained" onClick={() => handleClickNameDisplay(items.id)}>{items.profile.firstName} {items.profile.lastName}</Button>
                                    </div>
                                </div>
                            </Fragment>
                        ))
                    }
                </div>

                <div className={styles.sub_user_details2}>
                    <h1>USER DETAILS</h1>
                    {
                        progessLoad ? (
                            <Fragment>
                                <div className={styles.image_loader}>
                                    <p><CircularProgress size={90} sx={{ color: '#dd7973' }} /></p>
                                </div>
                            </Fragment>
                        ) : (
                            clickedUser ? (
                                <Fragment>
                                    <div className={styles.results_d}>
                                        <h5>USER DETAILS</h5>
                                        <img src={clickedUser.avatar} alt="Not found" />
                                        <p id={styles.pr1}>@{clickedUser.profile.username}</p>
                                        <p id={styles.pr2}>{clickedUser.Bio}</p>

                                        <div className={styles.user_info}>
                                            <h4>Full Name</h4>
                                            <p id={styles.pr3}>{clickedUser.profile.firstName} {clickedUser.profile.lastName}</p>
                                            <h4>Job Title</h4>
                                            <p id={styles.pr3}>{clickedUser.jobTitle}</p>
                                            <h4>Email</h4>
                                            <p id={styles.pr3}>{clickedUser.profile.email}</p>
                                        </div>
                                    </div>
                                </Fragment>
                            ) : (
                                <p>Select a user to see details.</p>
                            )
                        )}
                </div>
            </div>
        </Fragment>
    );
}
