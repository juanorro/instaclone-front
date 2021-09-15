import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import './RegisterForm.scss';
import { useFormik } from 'formik';
import { initialValuesRegister } from '../../../helpers/initialValuesFormik';
import * as yup from 'yup';
import { REGISTER } from '../../../gql/user.service';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';

const RegisterForm = (props) => {

    const { setShowLogin } = props;

    const [register] = useMutation(REGISTER);

    const formik = useFormik({
        initialValues: initialValuesRegister(),
        validationSchema: yup.object({
            name: yup.string().required('Tu nombre es obligatorio'),
            username: yup.string()
                .matches(/^[a-zA-Z0-9-]*$/, 'El nombre de usuario no puede tener espacios')
                .required('El nombre de usuario es obligatorio'),
            email: yup.string()
                .email('El formato de correo electrónico no es válido')
                .required('El correo electrónico es obligatorio'),
            password: yup.string()
                .required('La contraseña es obligatoria')
                .oneOf([yup.ref('checkPassword')], 'Las contraseñas no coinciden'),
            checkPassword: yup.string()
                .required('La contraseña es obligatoria')
                .oneOf([yup.ref('password')], 'Las contraseñas no coinciden'),
        }),
        onSubmit: async(formData) => {
            try {
                const newUser = formData;
                delete newUser.checkPassword;

                console.log(formData)

                const result = await register({
                    variables: {
                        input: newUser
                    }
                });

                toast.success('Usuario registrado correctamente');
                setShowLogin(true);
                console.log('registro hecho con éxito => ', result)
            } catch (error) {
                toast.error(error.message)
                console.log('error de onsubmit => ', error)
            }
        }
    });

    return (
        <>
            <h2 className="register-form-title">Registrate para ver fotos y vídeos de tus amigos.</h2>

            <Form className="register-form" onSubmit={formik.handleSubmit}>
                <Form.Input 
                    type="text"
                    placeholder="Nombre y apellidos"
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    error={formik.errors.name}
                />
                <Form.Input 
                    type="text"
                    placeholder="Nombre de usuario"
                    name="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    error={formik.errors.username}
                />
                <Form.Input
                    type="text"
                    placeholder="Correo electrónico"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    error={formik.errors.email}
                />
                <Form.Input 
                    type="password"
                    placeholder="Contraseña"
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    error={formik.errors.password}
                />
                <Form.Input
                    type="password"
                    placeholder="Repite la contreaseña"
                    name="checkPassword"
                    onChange={formik.handleChange}
                    value={formik.values.checkPassword}
                    error={formik.errors.checkPassword}
                />

                <Button className="btn-submit" type="submit" >Registrarse </Button>
            </Form>
        </>
    )
}

export default RegisterForm;