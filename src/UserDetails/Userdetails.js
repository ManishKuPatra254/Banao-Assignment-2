import React, { Fragment, useState, useEffect } from 'react';
import styles from './Userdetails.module.css';

export function Userdetails() {
    const [displayName, setDisplayName] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);

    useEffect(() => {
        fetch('https://602e7c2c4410730017c50b9d.mockapi.io/users')
            .then(data => data.json())
            .then(response => setDisplayName(response))
            .catch(error => console.log(error));
    }, []);

    function handleClickNameDisplay(user) {
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
                                        <button onClick={() => handleClickNameDisplay(items.id)}>{items.profile.firstName} {items.profile.lastName}</button>
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
                        selectedUserId && (
                            <Fragment>
                                <p>{selectedUserId}</p>
                                <p>{selectedUserId.jobTitle}</p>
                                <img src={selectedUserId.avatar} alt="" />
                            </Fragment>

                        )}
                </div>
            </div>
        </Fragment>
    );
}
