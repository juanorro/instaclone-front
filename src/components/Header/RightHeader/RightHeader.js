import React, { useState } from 'react';
import './RightHeader.scss';
import { Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import Avatar from '../../../assets/png/avatar.png';
import ModalUpload from '../../Modal/ModalUpload';

const RightHeader = () => {

    const [showModal, setShowModal] = useState(false);
    const { auth } = useAuth();


    return (
        <>
            <div className="right-header">
                <Link to="/">
                    <Icon name="home" />
                </Link>
                <Icon name="plus" onClick={() => setShowModal(true)} />
                <Link to={`/${auth.username}`}>
                    <Image src={Avatar} avatar />
                </Link>
            </div>
            <ModalUpload show={showModal} setShowModal={setShowModal} />
        </>
    )
}

export default RightHeader
