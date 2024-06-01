import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100%);
  }
`;

const NotificationWrapper = styled.div`
  position: fixed;
  top: 11%;
  right: 0px;
  padding: 10px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  z-index: 1000;
  animation: ${props => (props.show ? slideIn : slideOut)} 0.5s forwards;
`;

const Message = styled.p`
  margin: 0;
  color: #333;
  font-size: 14px;
`;

const Notification = ({ message, duration = 3000, key }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (message) {
            setShow(true);
            const timer = setTimeout(() => {
                setShow(false);
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [message, duration, key]);

    if (!message) return null;

    return (
        <NotificationWrapper show={show}>
            <Message>{message}</Message>
        </NotificationWrapper>
    );
};

export default Notification;
