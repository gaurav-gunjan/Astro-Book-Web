import React, { useState } from 'react';
import Modal from 'react-modal';
import { CrossSvg } from '../../assets/svg';

Modal.setAppElement('#root');

const ChatImageModal = ({ visible, image, handleClose }) => {

    return (
        <Modal isOpen={visible} className="modal-content-small" overlayClassName="modal-overlay-small" closeTimeoutMS={200}>
            <div className='relative'>
                <img src={image} className="" />
                <div onClick={() => handleClose()} className='cursor-pointer absolute z-10 top-1 right-1 text-black'><CrossSvg strokeWidth='3' /></div>
            </div>
        </Modal>
    );
};

export default ChatImageModal;