import React from 'react';
import './ModalPublication.scss';
import { Modal, Grid, Image } from 'semantic-ui-react';
import Comments from './Comments';
import CommentForm from './CommentForm';
import Actions from './Actions';

const ModalPublication = ({ show, setShow, publication }) => {

    const onClose = () => setShow(false)

    return (
        <Modal open={show} onClose={onClose} className="modal-publication">
            <Grid>
                <Grid.Column 
                    className="modal-publication__left" 
                    width={10} 
                    style={{ backgroundImage: `url('${publication.file}')`}} 
                />
                <Grid.Column className="modal-publication__right" width={6}>
                    <Comments publication={publication} />
                    <Actions publication={publication} />
                    <CommentForm publication={publication} />
                </Grid.Column>
            </Grid>
        </Modal>
    )
}

export default ModalPublication;
