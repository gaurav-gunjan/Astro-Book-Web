import React from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import AppStore from '../../assets/images/common/app-store.png';
import PlayStore from '../../assets/images/common/google-play.png';
import * as CommonActions from '../../redux/actions/commonAction';
import { website_name } from '../../utils/constants';
import { CrossSvg } from '../../assets/svg';

Modal.setAppElement('#root');

const DownloadApp = () => {
    const dispatch = useDispatch();
    const { isdownloadOurAppModalOpen } = useSelector(state => state?.commonReducer)

    return (
        <Modal isOpen={isdownloadOurAppModalOpen} className="modal-content-small" overlayClassName="modal-overlay-small" closeTimeoutMS={200}>
            <div className='bg-primary py-2 px-5 flex justify-between items-center'>
                <div className='text-white'>For more features, Download our app</div>
                <div onClick={() => dispatch(CommonActions?.closeDownloadOurAppModal())} className='bg-red-600 text-white p-1.5 rounded-full cursor-pointer'><CrossSvg /></div>
            </div>
            <main className='p-10 flex flex-col gap-5 items-center'>
                <b className='text-lg'>{website_name}</b>
                <div className='flex gap-5'>
                    <div className='flex-1' ><img src={PlayStore} alt="Play Store" /></div>
                    <div className='flex-1' ><img src={AppStore} alt="App Store" /></div>
                </div>
            </main>
        </Modal>
    )
}

export default DownloadApp;