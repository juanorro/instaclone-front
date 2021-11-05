import React from 'react';
import { Grid } from 'semantic-ui-react';
import { map } from 'lodash'
import './Publications.scss';
import PreviewPublication from './PreviewPublication';

const Publications = ({ getAllPublications }) => {

    return (
        <div className="publications">
            <h1>Publicaciones</h1>
            <Grid columns={4} >
                {map(getAllPublications, (publication, i) => (
                    <Grid.Column key={i} >
                        <PreviewPublication publication={publication} />
                    </Grid.Column>
                ))}
            </Grid>
        </div>
    )
}

export default Publications;
