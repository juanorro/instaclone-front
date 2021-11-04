import React from 'react';
import { useParams } from 'react-router-dom';
import Profile from '../components/User/Profile';
import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_ALL_PUBLICATIONS } from '../gql/publicaton.service';
import { size } from 'lodash';
import Publications from '../components/Publications';

const User = () => {

    const { username } = useParams();
    const { data, loading } = useQuery(GET_ALL_PUBLICATIONS, {
        variables: { username }
    });

    if(loading) return null;

    const { getAllPublications } = data;

    return (
        <>
            <Profile username={username} totalPublications={size(getAllPublications)} />
            <Publications getAllPublications={getAllPublications} />
        </>
    )
}

export default User;