import React, { useState } from 'react';
import './LoginForm.scss';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { initialValuesLogin } from '../../../helpers/initialValuesFormik';
import * as yup from 'yup';
import { LOGIN } from '../../../gql/user.service';
import { useMutation } from '@apollo/client';
import { setToken } from '../../../utils/token';
import useAuth from '../../../hooks/useAuth';
import { decodeToken } from '../../../utils/token';

const LoginForm = () => {

    const [error, setError] = useState('');

    const [login] = useMutation(LOGIN);

    const { setUser } = useAuth();


    const formik = useFormik({
        initialValues: initialValuesLogin(),
        validationSchema: yup.object({
            email: yup.string()
                .email('El email es inválido')
                .required('El email es obligatorio'),
            password: yup.string()
                .required('La contraseña es obligatoria')

        }),
        onSubmit: async(formData) => {
            setError('');
            try {
                const loginUser = formData;
                
                const { data } = await login({
                    variables: {
                        input: loginUser
                    }
                });

                const { token } = data.login;

                setToken(token);
                setUser(decodeToken(token));
            } catch (error) {
                setError(error.message);
                console.log(error)
            }
            console.log(formData);
        }
    })

    return (
        <>
            <h2 className="login-form-title">Entra para ver fotos y vídeos de tus amigos</h2>

            <Form className="login-form" onSubmit={formik.handleSubmit}>
                <Form.Input 
                    type="text"
                    placeholder="Correo electrónico"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.errors.email}
                />

                <Form.Input 
                    type="password"
                    placeholder="Contraseña"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.errors.password}
                />
                <Button type="submit" className="btn-submit">Iniciar sesión</Button>
                {error && <p className="submit-error">{error}</p> }
            </Form>
        </>
    )
}

export default LoginForm
