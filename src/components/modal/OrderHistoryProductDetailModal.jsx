import Modal from 'react-modal';
import React from 'react';
import { CrossSvg } from '../../assets/svg';
import { IndianRupee } from '../../utils/common-function';
import { api_urls } from '../../utils/api-urls';

Modal.setAppElement('#root');

const OrderHistoryProductDetailModal = ({ isOpen, handleClose, data }) => {

    return (
        <Modal
            isOpen={isOpen}
            className="modal-content-small"
            overlayClassName="modal-overlay-small"
            closeTimeoutMS={200}
        >
            <div className="p-5 flex flex-col gap-5">
                {/* Header Section */}
                <div className="flex justify-between items-center">
                    <div className="text-xl font-semibold">Product Detail</div>
                    <div onClick={() => handleClose()} className="bg-red-600 text-white w-7 h-7 flex items-center justify-center rounded-full cursor-pointer">
                        <CrossSvg h="17" w="17" />
                    </div>
                </div>

                {/* Product List Section */}
                <div className="flex flex-col gap-5">
                    {data?.products?.map((value, index) => (
                        <div key={index} className="flex flex-col gap-5 mb-5">
                            {/* Image Section */}
                            <div className="flex-1">
                                <img src={api_urls + 'uploads/' + value?.productId?.image} alt={value?.productId?.productName} className="w-full h-full max-h-48 object-contain rounded-lg border" />
                            </div>

                            {/* Product Details Section */}
                            <div className="flex-1">
                                <div className="font-semibold text-lg text-nowrap">{value?.productId?.productName}</div>
                                <div className="text-sm text-gray-600">{value?.productId?.description}</div>
                                <div className="mt-2 font-medium">Price: {IndianRupee(value?.price)}</div>
                                <div className="mt-1 text-sm">Quantity: {value?.quantity}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Modal>

    );
};

export default OrderHistoryProductDetailModal;