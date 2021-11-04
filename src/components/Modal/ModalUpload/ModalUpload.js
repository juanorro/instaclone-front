import React, { useCallback, useState } from 'react';
import './ModalUpload.scss';
import { Modal, Icon, Button, Dimmer, Loader } from 'semantic-ui-react';
import { useDropzone } from 'react-dropzone';
import { PUBLISH } from '../../../gql/publicaton.service';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';

const ModalUpload = ({ show, setShowModal }) => {

    const [fileUpload, setFileUpload] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [publish] = useMutation(PUBLISH);

    const onDrop = useCallback((acceptedFile) => {
        const file = acceptedFile[0]
        setFileUpload({
            type: 'image',
            file,
            preview: URL.createObjectURL(file),
        });
    });

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/jpg, image/jpeg, image/png',
        noKeyboard: false,
        multiple: false,
        onDrop 
    });

    const handleClose = () => {
        setIsLoading(false);
        setFileUpload(null);
        setShowModal(false)
        window.location.reload();
    }

    const onPublish = async() => {
        try {
            setIsLoading(true)
            const result = await publish({
                variables: {
                    file: fileUpload.file
                }
            });

            const { data } = result;

            if(!data.publish.status) {
                toast.warning('Error en la publicación');
                isLoading(false)
            } else {
                handleClose();
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Modal size="small" open={show} onClose={handleClose} className="modal-upload">
            <div 
                { ...getRootProps() } 
                className="dropzone" 
                style={fileUpload && { border: 0 }}
            >
                { !fileUpload && (
                    <>
                        <Icon name="cloud upload" />
                        <p>Arrastra la foto que quieras publicar</p>
                    </>
                )}
                <input { ...getInputProps() } />
            </div>

            {fileUpload?.type === 'image' && (
                <div 
                    className="image" 
                    style={{ backgroundImage: `url("${fileUpload.preview}")`}} 
                />
            )}

            {fileUpload && (
                <Button className="btn-upload btn-action" onClick={onPublish}>
                    Publicar
                </Button>
            )}

            {isLoading && (
                <Dimmer active className="publishing">
                    <Loader />
                    <p>Publicando... </p>
                </Dimmer>
            )}
        </Modal>
    )
}

export default ModalUpload;
