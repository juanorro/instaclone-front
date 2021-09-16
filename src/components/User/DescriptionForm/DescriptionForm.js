import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import React from 'react';
import { Button, Form, TextArea } from 'semantic-ui-react';
import { UPDATE_USER } from '../../../gql/user.service';
import { initialValuesChangeDescription } from '../../../helpers/initialValuesFormik';
import './DescriptionForm.scss';
import * as yup from 'yup';
import { toast } from 'react-toastify';

const DescriptionForm = ({ setShowModal, currentDescription, refetch }) => {

    const [updateUser] = useMutation(UPDATE_USER);

    const formik = useFormik({
        initialValues: initialValuesChangeDescription(currentDescription),
        validationSchema: yup.object({
            description: yup.string().required('El cambio de descripción es obligatoria')
        }),
        onSubmit: async(formData) => {

            try {
                const result = await updateUser({
                    variables: {
                        input: formData,
                    }
                });

                if(result) toast.success('Cambio de descripción correcta')
                refetch();
                setShowModal(false)

            } catch (error) {
                toast.error('Error al cambiar la descripción')
            }
        }
    })

    const { handleSubmit, handleChange, errors, values } = formik;

    return (
        <Form className="description-form" onSubmit={handleSubmit}>
            <TextArea
                placeholder="Escribe tu nueva descripción"
                name="description"
                value={values.description}
                onChange={handleChange}
                error={errors.description}
                className={errors.description && "error"}
            />
            <Button className="btn-submit" type="submit">Actualizar</Button>
        </Form>
    )
}

export default DescriptionForm;
 