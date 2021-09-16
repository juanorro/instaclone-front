import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { GET_FOLLOWERS, GET_FOLLOWS } from '../../../../gql/follow.service';
import './Followers.scss';
import { size } from 'lodash';
import ModalBasic from '../../../Modal/ModalBasic';
import ListUsers from '../../ListUsers';

const Followers = ({ username }) => {

    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState('');
    const [childrenModal, setChildrenModal] = useState(null);
    const [messageModal, setMessageModal] = useState(null);

    const { 
        data: dataFollowers, 
        loading: loadingFollowers, 
        startPolling: startPollingFollowers,
        stopPolling: stopPollingFollowers,
    } = useQuery(GET_FOLLOWERS, { variables: { username }});

    const {
        data: dataFollows, 
        loading: loadingFollows,
        startPolling: startPoolingFollows,
        stopPolling: stopPollingFollows,
    } = useQuery(GET_FOLLOWS, { variables: { username }});

    useEffect(() => {
        startPollingFollowers(1000);

        return () => {
            stopPollingFollowers();
        }
    }, [startPollingFollowers, stopPollingFollowers]);

    useEffect(() => {
        startPoolingFollows(1000);

        return () => {
            stopPollingFollows();
        }
    }, [startPoolingFollows, stopPollingFollows]);

    const openFollowers = () => {
        setTitleModal('Seguidores');
        setChildrenModal(
            <ListUsers users={getFollowers} setShowModal={setShowModal} />
        );
        setShowModal(true)
    };

    const openFollows = () => {
        setTitleModal('Seguidos');
        setChildrenModal(
            <ListUsers users={getFollows} setShowModal={setShowModal} />
        );
        setShowModal(true);
    }; 

    if(loadingFollowers || loadingFollows) {
        return null
    };

    const { getFollowers } = dataFollowers;
    const { getFollows } = dataFollows;

    return (
        <>
            <div className="followers">
                <p>
                    <span>**</span> publicaciones
                </p>
                <p className="link" onClick={openFollowers}>
                    <span>{size(getFollowers)}</span> seguidores
                </p>
                <p className="link" onClick={openFollows}>
                    <span>{size(getFollows)}</span> seguidos
                </p>
            </div>

            <ModalBasic 
                show={showModal} 
                setShow={setShowModal} 
                title={titleModal} 
            >
                {childrenModal}
            </ModalBasic>
        </>
    )
}

export default Followers;