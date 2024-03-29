import React, { useCallback, useState } from 'react';
import { Button } from 'semantic-ui-react';
import './AvatarForm.scss';
import { useDropzone } from 'react-dropzone';
import { useMutation } from '@apollo/client';
import { DELETE_AVATAR, GET_USER, UPDATE_AVATAR } from '../../../gql/user.service';
import { toast } from 'react-toastify';

const AvatarForm = ({ setShowModal, auth }) => {
    const [loading, setLoading] = useState(false)

    const [updateAvatar] = useMutation(UPDATE_AVATAR, {
        update(cache, { data: { updateAvatar } }) {
            const { getUser } = cache.readQuery({
                query: GET_USER, 
                variables: { username: auth.username },
            });

            cache.writeQuery({
                query: GET_USER, 
                variables: { username: auth.username },
                data: {
                    getUser: {
                        ...getUser,
                        avatar: updateAvatar.urlAvatar,
                    }
                }
            });
        }
    });

    const [deleteAvatar] = useMutation(DELETE_AVATAR, {
        update(cache, { data: { deleteAvatar } }) {
            const { getUser } = cache.readQuery({
                query: GET_USER,
                variables: { username: auth.username },
            });

            cache.writeQuery({
                query: GET_USER, 
                variables: { username: auth.username },
                data: {
                    getUser: {
                        ...getUser,
                        avatar: '',
                    }
                }
            });
        }
    });

    const onDrop = useCallback(async(acceptedFile) => {
        const file = acceptedFile[0];

        try {
            setLoading(true)
            const result = await updateAvatar({ variables: { file }});
            const { data } = result;
            if(!data.updateAvatar.status) {
                toast.warning('Error al actualizar el avatar')
                setLoading(false)
            } else {
                toast.success('Avatar modificado correctamente')
                setLoading(false)
                setShowModal(false)
            }

            console.log(result);
        } catch (error) {
            console.log(error)
        }
    }, []) 

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        multiple: false,
        onDrop,
    });

    const onDeleteAvatar = async() => {
        try {
            const result = await deleteAvatar();
            const { data } = result;

            if(!data.deleteAvatar) {
                toast.warning('Error al borrar el avatar');
            } else {
                setShowModal(false);
                toast.success('El avatar se ha borrado con éxito')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="avatar-form">
            <Button {...getRootProps()} loading={loading}>Cargar una foto</Button>
            <Button onClick={() => onDeleteAvatar()}>Eliminar foto actual</Button>
            <Button onClick={() => setShowModal(false)}>Cancelar</Button>
            <input { ...getInputProps()} />
        </div>
    )
}

export default AvatarForm;
