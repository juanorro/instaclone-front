import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../../../gql/user.service'
import './Profile.scss';
import { Grid, Image } from 'semantic-ui-react';
import Avatar from '../../../assets/png/avatar.png';
import UserNotFound from '../../UserNotFound';
import ModalBasic from '../../Modal/ModalBasic';
import AvatarForm from '../AvatarForm';
import useAuth from '../../../hooks/useAuth';
import HeaderProfile from './HeaderProfile/HeaderProfile';
import SettingsForm from '../SettingsForm';
import Followers from './Followers';

const Profile = ({ username, totalPublications }) => {

    const [ showModal, setShowModal] = useState(false);
    const [titileModal, setTitleModal] = useState('');
    const [childrenModal, setChildrenModal] = useState(null);

    const { auth } = useAuth();

    const { data, loading, error, refetch } = useQuery(GET_USER, {
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
                setChildrenModal( <AvatarForm setShowModal={setShowModal} auth={auth} />)
                setShowModal(true);
                break;
            case 'settings': 
                setTitleModal('Ajustes de usuario');
                setChildrenModal(
                    <SettingsForm 
                        setShowModal={setShowModal} 
                        setTitleModal={setTitleModal}
                        setChildrenModal={setChildrenModal}
                        getUser={getUser}
                        refetch={refetch}
                    />);
                setShowModal(true)
                break;
        
            default:
                break;
        }
    }
    
    return (
        <>
            <Grid className="profile">
                <Grid.Column width={5} className="profile_left">
                    <Image src={getUser.avatar ? getUser.avatar : Avatar} avatar onClick={() => username === auth.username && handleModal('avatar')} />
                </Grid.Column>
                <Grid.Column width={11} className="profile_right">
                    <HeaderProfile username={username} auth={auth} handleModal={handleModal}/>

                    <Followers username={username} totalPublications={totalPublications} />
                    
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
