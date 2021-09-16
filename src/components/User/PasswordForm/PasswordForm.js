import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import './PasswordForm.scss';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { initialValuesChangePassword } from '../../../helpers/initialValuesFormik';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../../gql/user.service';
import { toast } from 'react-toastify';

const PasswordForm = ({ onLogout }) => {

    const [updateUser] = useMutation(UPDATE_USER);

    const formik = useFormik({
        initialValues: initialValuesChangePassword(),
        validationSchema: yup.object({
            currentPassword: yup.string()
                .required('Este campo es obligatorio'),
            newPassword: yup.string()
                .required('Este campo es obligatorio')
                .oneOf([yup.ref('repeatNewPassword')], 'Las contraseñas no coinciden'),
            repeatNewPassword: yup.string()
                .required('Este campo es obligatorio')
                .oneOf([yup.ref('newPassword')], 'Las contraseñas no coinciden'),
        }),
        onSubmit: async(formData) => {

            console.log(formData)
            try {
                const result = await updateUser({
                    variables: {
                        input: {
                            currentPassword: formData.currentPassword,
                            newPassword: formData.newPassword
                        }
                    }
                })

                if(!result.data.updateUser){
                    toast.error('Error al cambiar la contraseña');
                } else {
                    toast.success('Cambio de contraseña correcta')
                    //logout después de hacer el cambio de contraseña
                    onLogout();
                }
                
            } catch (error) {
                toast.error('Error al cambiar la contraseña');
            }
        }
    });

    const { handleSubmit, handleChange, errors } = formik

    return (
        <Form className="password-form" onSubmit={handleSubmit}>
            <Form.Input 
                placeholder="Contraseña actual"
                name="currentPassword"
                value={formik.values.currentPassword}
                onChange={handleChange}
                type="password"
                error={errors.currentPassword}
            />
            <Form.Input 
                placeholder="Nueva contraseña"
                name="newPassword"
                value={formik.values.newPassword}
                onChange={handleChange}
                type="password"
                error={errors.newPassword}
            />
            <Form.Input 
                placeholder="Repetir nueva contraseña"
                name="repeatNewPassword"
                value={formik.values.repeatNewPassword}
                onChange={handleChange}
                type="password"
                error={errors.repeatNewPassword}
            />
            <Button type="submit" className="btn-submit">Actualizar</Button>
        </Form>
    )
}

export default PasswordForm;
