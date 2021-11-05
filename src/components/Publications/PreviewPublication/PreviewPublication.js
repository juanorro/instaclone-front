import React, { useState } from 'react';
import './PreviewPublication.scss';
import { Image } from 'semantic-ui-react';
import ModalPublication from '../../Modal/ModalPublication';

const PreviewPublication = ({ publication }) => {

    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="preview-publications" onClick={() => setShowModal(true)} >
                <Image className="preview-publications__image" src={publication.file} />
            </div>
                <ModalPublication 
                    show={showModal} 
                    setShow={setShowModal} 
                    publication={publication} 
                />
        </>
    )
}

export default PreviewPublication;
