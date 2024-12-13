import React, { useState } from 'react';
import Modal from 'react-modal';
import ReactStars from 'react-stars';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import * as ChatActions from '../../redux/actions/chatAction';
import { api_urls } from '../../utils/api-urls';
import { useNavigate } from 'react-router-dom';

Modal.setAppElement('#root');

const ChatRating = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { astrologerRatingVisibility } = useSelector(state => state.chatReducer);

    const [description, setDescription] = useState('');
    const [star, setStar] = useState(0);

    const handleCloseRating = () => {
        dispatch(ChatActions.setAstrologerRatingVisibility({ data: null, ratingVisible: false }));
        setDescription('');
        setStar(0);
        localStorage.removeItem('chat_requested_data');
        navigate('/', { replace: true });

    };

    const ratingChanged = (newRating) => setStar(newRating);

    const handleRating = async () => {
        const payload = {
            customerId: localStorage.getItem('current_user_id'),
            astrologerId: astrologerRatingVisibility?.data?._id,
            ratings: star,
            comments: description
        };

        try {
            const { data } = await axios.post(api_urls + 'api/admin/add-review', payload);
            console.log('Rating Data:', data);
        } catch (error) {
            console.error('Error adding review:', error);
        }

        handleCloseRating();
    };

    return (
        <>
            <div className='fixed z-10 bottom-0 w-full p-5 bg-[#FFFCD1] flex flex-col gap-5 items-center justify-center'>
                <div className='text-lg font-[500] -mb-5'>Your Review</div>
                <ReactStars count={5} value={star} onChange={ratingChanged} size={40} color2={'green'} className='m-0' />

                <textarea value={description} placeholder='Write you review here....' onChange={(e) => setDescription(e.target.value)} rows={3} className='w-[80%] max-md:w-full outline-none rounded-md border p-4' />

                <div onClick={handleRating} className='bg-primary text-black text-sm py-2 px-5 rounded-md text-center cursor-pointer'>Submit</div>

                {/* <div className='flex justify-between items-center gap-40'>
                    <div className='text-lg font-bold'>Ratings</div>
                    <div onClick={handleCloseRating} className='bg-red-600 text-white w-7 h-7 flex items-center justify-center rounded-full cursor-pointer'><CrossSvg h='17' w='17' /></div>
                </div>

                <ReactStars count={5} value={star} onChange={ratingChanged} size={24} color2={'#ffd700'} />

                <div>
                    <div>Description</div>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={5} className='w-[100%] outline-none border p-4' />
                </div>

                <div onClick={handleRating} className='bg-blue-900 text-white py-1 rounded-md text-center cursor-pointer'>Submit</div> */}
            </div >
        </>
    );
};

export default ChatRating;
