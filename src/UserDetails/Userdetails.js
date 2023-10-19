import React, { Fragment, useState, useEffect } from 'react';
import styles from './Userdetails.module.css';
import { Button } from '@mui/material';


export function Userdetails() {
    const [displayName, setDisplayName] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);


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
        const user = displayName.find(user => user.id === id);
        setSelectedUserId(user);
    }

    return (
        <Fragment>
            <div className={styles.main_user_details}>
                <div className={styles.sub_user_details1}>
                    <h1>USER LIST</h1>
                    {displayName.length >= 0 ? (
                        displayName.map((items, index) => (
                            <Fragment>
                                <div className={styles.names_id_btn}>
                                    <div className={styles.names} key={index}>
                                        <Button sx={{ textTransform: 'unset' }} variant="contained" onClick={() => handleClickNameDisplay(items.id)}>{items.profile.firstName} {items.profile.lastName}</Button>
                                    </div>
                                </div>
                            </Fragment>
                        ))
                    ) : (
                        <p>Loading user details...</p>
                    )}
                </div>

                <div className={styles.sub_user_details2}>
                    <h1>USER DETAILS</h1>
                    {
                        selectedUserId ? (
                            <Fragment>
                                <div className={styles.results_d}>
                                    <h5>USER DETAILS</h5>
                                    <img src={selectedUserId.avatar} alt="Not found" />
                                    <p id={styles.pr1}>@{selectedUserId.profile.username}</p>
                                    <p id={styles.pr2}>{selectedUserId.Bio}</p>

                                    <div className={styles.user_info}>
                                        <h4>Full Name</h4>
                                        <p id={styles.pr3}>{selectedUserId.profile.firstName} {selectedUserId.profile.lastName}</p>
                                        <h4>Job Title</h4>
                                        <p id={styles.pr3}>{selectedUserId.jobTitle}</p>
                                        <h4>Email</h4>
                                        <p id={styles.pr3}>{selectedUserId.profile.email}</p>
                                    </div>
                                </div>
                            </Fragment>
                        ) : (
                            <p>Select a user to see details.</p>
                        )}
                </div>
            </div>
        </Fragment>
    );
}
