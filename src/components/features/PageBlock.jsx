import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as ChatActions from '../../redux/actions/chatAction';
import * as AstrologerActions from '../../redux/actions/astrologerAction';
import { toaster } from '../../utils/services/toast-service';

const PageBlock = () => {
    const dispatch = useDispatch();
    const { requestInitiatedByCustomer } = useSelector(state => state?.chatReducer);

    useEffect(() => {
        let timerInterval;
        if (requestInitiatedByCustomer.initiated && requestInitiatedByCustomer.timer > 0) {
            timerInterval = setInterval(() => {
                dispatch(ChatActions?.requestInitiatedByCustomer({ initiated: true, timer: requestInitiatedByCustomer.timer - 1 }));
            }, 1000);
        } else if (requestInitiatedByCustomer.timer === 0) {
            dispatch(ChatActions?.requestInitiatedByCustomer({ initiated: false, timer: 60 }));
            toaster.info({ text: 'Astrologer is busy, please try again later!' });
            setTimeout(() => {
                dispatch(AstrologerActions?.getAstrologer({ page: 1, search: '' }));
            }, 2000);
        }

        return () => clearInterval(timerInterval); // Cleanup the interval when component unmounts or timer reaches 0
    }, [requestInitiatedByCustomer.initiated, requestInitiatedByCustomer.timer, dispatch]);

    return (
        <>
            <div className='fixed inset-0 z-[1000] bg-transparent flex justify-center items-center'>
                <div className='bg-gray-100 px-10 py-7 shadow-2xl h-60 rounded-md border border-primary flex flex-col items-center gap-10 justify-center'>
                    <div className='text-primary'>Please wait, astrologer will accept your request!</div>
                    <div>Wait till ~ {requestInitiatedByCustomer?.timer} sec</div>
                </div>
            </div>
        </>
    )
}

export default PageBlock;