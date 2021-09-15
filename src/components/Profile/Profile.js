import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../../gql/user.service'
import './Profile.scss';
import { Grid, Image } from 'semantic-ui-react';
import Avatar from '../../assets/png/avatar.png';
import UserNotFound from '../UserNotFound';
import ModalBasic from '../Modal/ModalBasic';
import AvatarForm from '../User/AvatarForm';
import useAuth from '../../hooks/useAuth';

const Profile = ({ username }) => {

    const [ showModal, setShowModal] = useState(false);
    const [titileModal, setTitleModal] = useState('');
    const [childrenModal, setChildrenModal] = useState(null);

    const { auth } = useAuth();

    const { data, loading, error } = useQuery(GET_USER, {
        variables: {
            username
        }
    });

    if(loading) {
        return null
    }

    if(error) {
        return <UserNotFound />
    }

    const { getUser } = data;

    const handleModal = (type) => {
        switch (type) {
            case 'avatar':
                setTitleModal('Cambiar foto de perfil');
                setChildrenModal( <AvatarForm setShowModal={setShowModal} />)
                setShowModal(true);
                break;
        
            default:
                break;
        }
    }
    
    return (
        <>
            <Grid className="profile">
                <Grid.Column width={5} className="profile_left">
                    <Image src={Avatar} avatar onClick={() => username === auth.username && handleModal('avatar')} />
                </Grid.Column>
                <Grid.Column width={11} className="profile_right">
                    <div>
                        Header Profile
                    </div> 

                    <div>
                        Followers
                    </div>
                    <div className="other">
                        <p className="name">{getUser.name}</p>
                        {getUser.siteWeb && (
                            <a href={getUser.siteWeb} className="siteWeb" target="_blank" >
                                {getUser.siteWeb}
                            </a>
                        )}

                        {getUser.description && (
                            <p className="description">{getUser.description}</p>
                        )}


                    </div>
                </Grid.Column>
            </Grid>
            <ModalBasic show={showModal} setShow={setShowModal} title={titileModal}>
                {childrenModal}
            </ModalBasic>
        </>
    )
}

export default Profile
