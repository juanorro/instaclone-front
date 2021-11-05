import React from 'react';
import './UserNotFollows.scss';
import { Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_NOT_FOLLOWERS } from '../../../gql/follow.service';
import ImageNotFound from '../../../assets/png/avatar.png';

const UserNotFollows = () => {

    const { data, loading } = useQuery(GET_NOT_FOLLOWERS);
    if(loading) return null;
    console.log(data)

    const { getNotFollowers } = data;


    return (
        <div className="users-not-followers">
            <h1>Usuarios no seguidos</h1>
            {getNotFollowers.map((user, i) => (
                <Link key={i} to={`/${user.username}`} className="users-not-followers__user">
                    <Image src={user.avatar || ImageNotFound} avatar />
                    <span>{user.name}</span>
                </Link>
            ))}
        </div>
    )
}

export default UserNotFollows;