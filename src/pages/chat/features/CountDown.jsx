import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

const CountDown = () => {
    const { chatTimerCountDown } = useSelector(state => state?.chatReducer);
    // console.log('chatTimerCountDown', chatTimerCountDown);

    const timeFormat = (seconds) => {
        const duration = moment.duration(seconds, 'seconds');
        const hours = Math.floor(duration.asHours());
        const minutes = duration.minutes();
        const secs = duration.seconds();

        // Format the duration into hours, minutes, and seconds
        const formattedTime = `${hours}:${minutes}:${secs}`;

        return formattedTime;
    }

    return (
        <>
            <div>{chatTimerCountDown ? timeFormat(chatTimerCountDown) : '0:0:0'}</div>
        </>
    )
};

export default CountDown;