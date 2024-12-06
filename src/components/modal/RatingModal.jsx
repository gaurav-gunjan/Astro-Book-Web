import React, { useState } from 'react';
import Modal from 'react-modal';
import ReactStars from 'react-stars';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import * as ChatActions from '../../redux/actions/chatAction';
import { api_urls } from '../../utils/api-urls';
import { CrossSvg } from '../../assets/svg';

Modal.setAppElement('#root');

const RatingModal = () => {
    const dispatch = useDispatch();
    const { astrologerRatingVisibility } = useSelector(state => state.chatReducer);

    const [description, setDescription] = useState('');
    const [star, setStar] = useState(0);

    const handleCloseRating = () => {
        dispatch(ChatActions.setAstrologerRatingVisibility({ data: null, ratingVisible: false }));
        setDescription('');
        setStar(0);
        localStorage.removeItem('chat_requested_data');
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
        <Modal isOpen={astrologerRatingVisibility?.ratingVisible} className="modal-content-small" overlayClassName="modal-overlay-small" closeTimeoutMS={200}>
            <div className='p-5 flex flex-col gap-5'>
                <div className='flex justify-between items-center gap-40'>
                    <div className='text-lg font-bold'>Ratings</div>
                    <div onClick={handleCloseRating} className='bg-red-600 text-white w-7 h-7 flex items-center justify-center rounded-full cursor-pointer'><CrossSvg h='17' w='17' /></div>
                </div>

                <ReactStars count={5} value={star} onChange={ratingChanged} size={24} color2={'#ffd700'} />

                <div>
                    <div>Description</div>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={5} className='w-[100%] outline-none border p-4' />
                </div>

                <div onClick={handleRating} className='bg-blue-900 text-white py-1 rounded-md text-center cursor-pointer'>Submit</div>
            </div>
        </Modal>
    );
};

export default RatingModal;
