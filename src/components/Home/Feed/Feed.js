import React, { useState, useEffect } from 'react';
import { Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_PUBLICATIONS_FOLLOWERS } from '../../../gql/publicaton.service';
import ImageNotFound from '../../../assets/png/avatar.png';
import './Feed.scss';
import Action from '../../Modal/ModalPublication/Actions';
import CommentForm from '../../Modal/ModalPublication/CommentForm';
import ModalPublication from '../../Modal/ModalPublication';

const Feed = () => {

    const [showModal, setShowModal] = useState(false);
    const [publicationSelect, setPublicationSelect] = useState(null);
    const { data, loading, startPolling, stopPolling } = useQuery(GET_PUBLICATIONS_FOLLOWERS);

    useEffect(() => {
        startPolling(1000);
        return () => {
            stopPolling()
        }
    }, [startPolling, stopPolling])

    if(loading) return null;

    const { getPublicationsFollowers } = data;

    const openPublication = (publication) => {
        setPublicationSelect(publication);
        setShowModal(true);
    };

    return (
        <>
            <div className="feed">
                {getPublicationsFollowers.map((publication, i) => (
                    <div key={i} className="feed__box">
                        <Link to={`/${publication.idUser.username}`}>
                            <div className="feed__box-user">
                                <Image src={publication.idUser.avatar || ImageNotFound} avatar />
                                <span>{publication.idUser.name}</span>
                            </div>
                        </Link>
                        <div 
                            className="feed__box-photo"
                            style={{ backgroundImage: `url('${publication.file}')`}}
                            onClick={() => openPublication(publication)}
                        />
                        <div className="feed__box-actions">
                            <Action publication={publication} />
                        </div>
                        <div className="feed__box-form">
                            <CommentForm publication={publication} />
                        </div>
                    </div>
                ))}
            </div>
            {showModal && (
                <ModalPublication 
                    show={showModal} 
                    setShow={setShowModal} 
                    publication={publicationSelect} 
                />
            )}
        </>
    )
}

export default Feed;
