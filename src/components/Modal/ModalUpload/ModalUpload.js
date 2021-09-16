import React from 'react';
import './ModalUpload.scss';
import { Modal, Icon, Button, Dimmer, Loader } from 'semantic-ui-react';

const ModalUpload = ({ show, setShowModal }) => {

    const handleClose = () => {
        setShowModal(false)
    }

    return (
        <Modal size="small" open={show} onClose={handleClose} className="modal-upload">
            <h2>Esto es el modal Upload</h2>
        </Modal>
    )
}

export default ModalUpload;
