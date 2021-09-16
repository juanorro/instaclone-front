import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import { UPDATE_USER } from '../../../gql/user.service';
import { initialValuesChangeSiteWeb } from '../../../helpers/initialValuesFormik';
import './SiteWebForm.scss';
import * as yup from 'yup';
import { toast } from 'react-toastify';

const SiteWebForm = ({ setShowModal, currentSiteWeb, refetch }) => {

    const [updateUser] = useMutation(UPDATE_USER);

    const formik = useFormik({
        initialValues: initialValuesChangeSiteWeb(currentSiteWeb),
        validationSchema: yup.object({
            siteWeb: yup.string()
                .required('El cambio de sitio web es obligatorio')
        }),
        onSubmit: async(FormData) => {

            try {
                
                const result = await updateUser({
                    variables: {
                        input: FormData,
                    }
                });

                if(result) toast.success('Cambio de sitio web correcto')
                refetch();
                setShowModal(false)

            } catch (error) {
                toast.error('Error al cambiar el sitio web')
            }
        }
    });

    const { handleChange, handleSubmit, errors, values } = formik;
    
    return (
        <Form className="siteweb-form" onSubmit={handleSubmit} >
            <Form.Input 
                placeholder="Escribe tu nuevo sitio web"
                name="siteWeb"
                value={values.siteWeb}
                onChange={handleChange}
                error={errors.siteWeb}
            />
            <Button type="submit" className="btn-submit">Actualizar</Button>
        </Form>
    )
}

export default SiteWebForm;
