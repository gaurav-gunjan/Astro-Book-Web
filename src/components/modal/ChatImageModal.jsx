import React, { useState } from 'react';
import Modal from 'react-modal';
import { CrossSvg } from '../../assets/svg';

Modal.setAppElement('#root');

const ChatImageModal = ({ visible, image, handleClose }) => {

    return (
        <Modal isOpen={visible} className="modal-content-small" overlayClassName="modal-overlay-small" closeTimeoutMS={200} style={{ content: { backgroundColor: 'transparent' } }}>
            <div className='relative'>
                <img src={image} className="" />
                <div onClick={() => handleClose()} className='cursor-pointer absolute z-10 top-1 right-1 text-white bg-red-500 p-1.5 rounded-full'><CrossSvg h='15' w='15' /></div>
            </div>
        </Modal>
    );
};

export default ChatImageModal;