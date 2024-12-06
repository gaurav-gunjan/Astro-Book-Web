import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TopHeaderSection from '../../components/common/TopHeaderSection';
import * as StaticPageActions from '../../redux/actions/staticPageAction';

const TermsOfUse = () => {
    const dispatch = useDispatch();
    const { termsAndConditionData } = useSelector(state => state?.staticPageReducer);

    useEffect(() => {
        const user_type = localStorage.getItem('user_type');
        const pageType = user_type === 'customer' ? 'Customer' : 'Astrologer';
        //! Dispatching API For Getting Terms And Conditions
        dispatch(StaticPageActions.getTermsAndCondition({ type: pageType }));
    }, [dispatch]);

    return (
        <>
            <TopHeaderSection title={'Terms And Conditions'} />

            <div className='px-[100px] max-lg:px-[20px] max-lg:text-sm py-[50px] text-gray-800'>
                {termsAndConditionData ? (
                    <div dangerouslySetInnerHTML={{ __html: termsAndConditionData }}></div>
                ) : (
                    <div>No terms and conditions available at the moment.</div>
                )}
            </div>
        </>
    );
};

export default TermsOfUse;