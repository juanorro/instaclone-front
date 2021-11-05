import React from 'react';
import useAuth from '../../hooks/useAuth';
import { Grid } from 'semantic-ui-react';
import './Home.scss';
import Feed from '../../components/Home/Feed';
import UserNotFollows from '../../components/Home/UserNotFollows';

const Home = () => {

    const auth = useAuth();

    return (
        <Grid className="home">
            <Grid.Column className="home__left" width={11}>
                <Feed />
            </Grid.Column>
            <Grid.Column className="home__right" width={5}>
                <UserNotFollows />
            </Grid.Column>
        </Grid>
    );
};

export default Home;
