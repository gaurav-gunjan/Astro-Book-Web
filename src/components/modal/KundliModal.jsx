import React from 'react';
import Modal from 'react-modal';
import * as KundliActions from '../../redux/actions/kundliAction';
import BirthDetail from './kundli/BirthDetail';
import Panchang from './kundli/Panchang';
import Chart from './kundli/Chart';
import Planets from './kundli/Planets';
import KPPlanets from './kundli/KPPlanets';
import KPHouseCup from './kundli/KPHouseCup';
import VimshottariDasha from './kundli/VimshottariDasha';
import HouseReport from './kundli/HouseReport';
import RashiReport from './kundli/RashiReport';
import AstakVarga from './kundli/AstakVarga';
import SarvAstak from './kundli/SarvAstak';
import AscedentReport from './kundli/AscedentReport';

Modal.setAppElement('#root');

const KundliModal = ({ intakeData, kundliData, modalData, visible, handleVisible }) => {

    return (
        <>
            <Modal isOpen={visible} className="modal-content" overlayClassName="modal-overlay" closeTimeoutMS={200}>
                <div className='flex justify-between items-center bg-primary text-white px-5 py-2'>
                    <div>{modalData?.title}</div>
                    <div onClick={() => handleVisible(false)} className='bg-red-600 text-white px-4 py-1 rounded-md cursor-pointer'>Close</div>
                </div>
                <div className='p-5'>
                    {modalData?.title == 'Birth Details' && <BirthDetail data={modalData?.data} intakeData={intakeData} kundliData={kundliData} />}
                    {modalData?.title == 'Panchang' && <Panchang data={modalData?.data} intakeData={intakeData} kundliData={kundliData} />}
                    {modalData?.title == 'Chart' && <Chart data={modalData?.data} />}
                    {modalData?.title == 'Planets' && <Planets data={modalData?.data} />}
                    {modalData?.title == 'KP Planets' && <KPPlanets data={modalData?.data} />}
                    {modalData?.title == 'KP House Cup' && <KPHouseCup data={modalData?.data} />}
                    {modalData?.title == 'Vimshottari Dasha' && <VimshottariDasha data={modalData?.data} />}
                    {modalData?.title == 'House Report' && <HouseReport data={modalData?.data} />}
                    {modalData?.title == 'Rashi Report' && <RashiReport data={modalData?.data} />}
                    {modalData?.title == 'Astak Varga' && <AstakVarga data={modalData?.data} />}
                    {modalData?.title == 'Sarv Astak' && <SarvAstak data={modalData?.data} />}
                    {modalData?.title == 'Ascedent Report' && <AscedentReport data={modalData?.data} />}
                </div>
            </Modal>
        </>
    )
}

export default KundliModal;