import React, { useState } from 'react';

function Modal({ children, isOpen, width, height, borderRadius }) {
    return (
        isOpen && (
            <div className="relative z-[1000]" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex justify-center p-2 text-center sm:items-center sm:p-10 h-[100vh]">
                        <div className={`relative transform overflow-hidden ${borderRadius} bg-white text-left shadow-xl transition-all ${width} ${height}`}>
                            <div>
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}

function useModal() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const ModalWrapper = ({ children, width, height, borderRadius }) => (
        <Modal isOpen={isModalOpen} onClose={closeModal} width={width} height={height} borderRadius={borderRadius}>
            {children}
        </Modal>
    );

    return [openModal, closeModal, ModalWrapper];
}

export default useModal;