import React from 'react';
import Modal from 'react-modal';
import AppStore from '../../assets/images/common/app-store.png';
import PlayStore from '../../assets/images/common/google-play.png';

Modal.setAppElement('#root');

const DownloadApp = ({ isOpen, handleCloseModal }) => {

    return (
        <Modal isOpen={isOpen} className="modal-content" overlayClassName="modal-overlay" closeTimeoutMS={200}>
            <div className='bg-primary py-2 px-5 flex justify-between items-center'>
                <div></div>
                <div className='text-white'>For more features, Download our app</div>
                <div onClick={() => handleCloseModal()} className='bg-red-600 text-white py-1 px-5 rounded-md cursor-pointer'>close</div>
            </div>
            <main className='p-10 flex flex-col gap-5 items-center'>
                <b>Astro Book</b>
                <div className='flex gap-5'>
                    <img src={PlayStore} alt="Play Store" />
                    <img src={AppStore} alt="App Store" />
                </div>
            </main>
        </Modal>
    )
}

export default DownloadApp;