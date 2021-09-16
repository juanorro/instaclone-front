import React from 'react';
import './SettingsForm.scss';
import { Button } from 'semantic-ui-react';
import { useApolloClient } from '@apollo/client'
import { useHistory } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import PasswordForm from '../PasswordForm';
import EmailForm from '../EmailForm/EmailForm';
import DescriptionForm from '../DescriptionForm/DescriptionForm';
import SiteWebForm from '../SiteWebForm/SiteWebForm';

const SettingsForm = ({ setShowModal, setTitleModal, setChildrenModal, getUser, refetch }) => {

    const history = useHistory();
    const client = useApolloClient();
    const { logout } = useAuth();

    const onChangePassword = () => {
        setTitleModal('Cambiar tu contraseña');
        setChildrenModal(<PasswordForm onLogout={onLogout}/>)
    };

    const onChangeEmail = () => {
        setTitleModal('Cambiar email');
        setChildrenModal(
            <EmailForm 
                setShowModal={setShowModal} 
                currentEmail={getUser.email}
                refetch={refetch}
            />);
    };

    const onChangeDescription = () => {
        setTitleModal('Cambiar descripción');
        setChildrenModal(
            <DescriptionForm 
                setShowModal={setShowModal}
                currentDescription={getUser.description}
                refetch={refetch}
            />
        )
    };

    const onChangeSiteWeb = () => {
        setTitleModal('Cambiar sitio web');
        setChildrenModal(
            <SiteWebForm 
                setShowModal={setShowModal}
                currentSiteWeb={getUser.siteWeb}
                refetch={refetch}
            />
        )
    };

    const onLogout = () => {
        //limpia a caché del servidor apollo
        client.clearStore();
        logout();
        history.push('/')
    };

    return (
        <div className="settings-form">
            <Button onClick={onChangePassword}>Cambiar contraseña</Button>
            <Button onClick={onChangeEmail}>Cambiar email</Button>
            <Button onClick={onChangeDescription} >Cambiar descripción</Button>
            <Button onClick={onChangeSiteWeb} >Cambiar sitio web</Button>
            <Button onClick={onLogout}>Cerrar sesión</Button>
            <Button onClick={() => setShowModal(false)}>Cancelar</Button>
        </div>
    )
}

export default SettingsForm;