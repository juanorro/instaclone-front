import React from 'react';
import { Container, Grid, Image } from 'semantic-ui-react';
import './Header.scss';
import Logo from '../../assets/png/logo.png';
import { Link } from 'react-router-dom';
import RightHeader from './RightHeader';
import Search from './Search';

const Header = () => {
    return (
        <div className="header">
            <Container>
                <Grid>
                    <Grid.Column width={3} className="header_logo">
                        <Link to="/">
                            <Image src={Logo} alt="Instaclone" />
                        </Link>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Search />
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <RightHeader />
                    </Grid.Column>
                </Grid>
            </Container>
        </div>
    )
}

export default Header;
