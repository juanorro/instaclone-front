import React, { useCallback } from 'react';
import { Button } from 'semantic-ui-react';
import './AvatarForm.scss';
import { useDropzone } from 'react-dropzone';
import { useMutation } from '@apollo/client';
import { UPDATE_AVATAR } from '../../../gql/user.service';

const AvatarForm = ({ setShowModal }) => {

    const [updateAvatar] = useMutation(UPDATE_AVATAR);

    const onDrop = useCallback(async(acceptedFile) => {
        const file = acceptedFile[0];

        try {
            console.log('este es el file del client => ', file)
            const result = await updateAvatar({ variables: { file }});

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

    return (
        <div className="avatar-form">
            <Button {...getRootProps()}>Cargar una foto</Button>
            <Button>Eliminar foto actual</Button>
            <Button onClick={() => setShowModal(false)}>Cancelar</Button>
            <input { ...getInputProps()} />
        </div>
    )
}

export default AvatarForm;
