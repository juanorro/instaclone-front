import React from 'react';
import './EmailForm.scss';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { initialValuesChangeEmail } from '../../../helpers/initialValuesFormik';
import { UPDATE_USER } from '../../../gql/user.service';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';

const EmailForm = ({ currentEmail, setShowModal, refetch }) => {

    const [updateUser] = useMutation(UPDATE_USER);

    const formik = useFormik({
        initialValues: initialValuesChangeEmail(currentEmail),
        validationSchema: yup.object({
            email: yup.string()
                .email('No es formato email')
                .required('Rellenar con un email es obligatorio')
        }),
        onSubmit: async(formData) => {
            try {
                const result = await updateUser({
                    variables: {
                        input: formData,
                    }
                })
                if(result) toast.success('Cambio de email correcto')
                refetch();
                setShowModal(false)
            } catch (error) {
                toast.error('Error al cambiar el email')
            }
        }
    });

    const { handleSubmit, handleChange, errors, values } = formik;

    return (
        <Form className="email-form" onSubmit={handleSubmit} >
            <Form.Input 
                placeholder="Escribe tu nuevo email"
                name="email"
                value={values.email}
                onChange={handleChange}
                error={errors.email}
            />
            <Button type="submit" className="btn-submit">Actualizar</Button>
        </Form>
    )
}

export default EmailForm;
