import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import './CommentForm.scss';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../../../../gql/commet.service';

const CommentForm = ({ publication }) => {

    const [addComment] = useMutation(ADD_COMMENT);

    const formik = useFormik({
        initialValues: {
            comment: '',
        },
        validationSchema: yup.object({
            comment: yup.string().required(),
        }),
        onSubmit: async(formData) => {
            try {
                await addComment({
                    variables: {
                        input: {
                            idPublication: publication.id,
                            comment: formData.comment,
                        }
                    }
                });

                formik.handleReset()
            } catch (error) {
                console.log(error)
            }
        }
    })

    return (
        <Form className="comment-form" onSubmit={formik.handleSubmit}>
            <Form.Input 
                placeholder="Añade un comentario" 
                name="comment"
                value={formik.values.comment}
                onChange={formik.handleChange}
                error={formik.errors.comment && true}
            />
            <Button type="submit">Publicar</Button>
        </Form>
    )
};

export default CommentForm;
