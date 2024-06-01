import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../services/firebase';

const LockButton = () => {
    const [isChecked, setIsChecked] = useState(false);
    const { currentUser } = useAuth();

    useEffect(() => {
        const checkPublicOrPrivate = async () => {
            const userAccessDoc = await getDoc(doc(db, "userAccess", currentUser.uid));
            const currentAccess = userAccessDoc.data().access;
            console.log("Current access", currentAccess)
            setIsChecked(currentAccess);
        }
        checkPublicOrPrivate();
    }, [currentUser.uid]);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <input
                type="checkbox"
                id="lock"
                checked={isChecked}
                onChange={handleCheckboxChange}
                style={{ display: 'none' }}
            />
            <label
                htmlFor="lock"
                style={{
                    width: '35px',
                    height: '35px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: isChecked ? 'rgb(255, 69, 69)' : 'rgb(13, 27, 76)',
                    borderRadius: '7px',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                }}
            >
                <span
                    style={{
                        width: 'fit-content',
                        height: 'fit-content',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transform: 'rotate(-10deg)',
                    }}
                >
                    <span
                        style={{
                            backgroundColor: 'transparent',
                            height: '9px',
                            width: '14px',
                            borderTopRightRadius: '10px',
                            borderTopLeftRadius: '10px',
                            borderTop: '3px solid white',
                            borderLeft: '3px solid white',
                            borderRight: '3px solid white',
                            transition: 'all 0.3s',
                            transform: isChecked ? 'rotateY(150deg) translateX(3px)' : 'none',
                            transformOrigin: 'right',
                        }}
                    ></span>
                    <svg
                        className="lock-body"
                        width="15px"
                        height="15px"
                        viewBox="0 0 28 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ width: '15px' }}
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0 5C0 2.23858 2.23858 0 5 0H23C25.7614 0 28 2.23858 28 5V23C28 25.7614 25.7614 28 23 28H5C2.23858 28 0 25.7614 0 23V5ZM16 13.2361C16.6137 12.6868 17 11.8885 17 11C17 9.34315 15.6569 8 14 8C12.3431 8 11 9.34315 11 11C11 11.8885 11.3863 12.6868 12 13.2361V18C12 19.1046 12.8954 20 14 20C15.1046 20 16 19.1046 16 18V13.2361Z"
                            fill="white"
                        ></path>
                    </svg>
                </span>
            </label>
        </div>
    );
};

export default LockButton;
