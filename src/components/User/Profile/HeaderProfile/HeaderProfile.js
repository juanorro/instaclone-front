import React from 'react';
import './HeaderProfile.scss';
import { Button } from 'semantic-ui-react';
import { useQuery, useMutation } from '@apollo/client';
import { IS_FOLLOW, FOLLOW, UN_FOLLOW} from '../../../../gql/follow.service';

const HeaderProfile = ({ username, auth, handleModal }) => {

    const { data, loading, refetch } = useQuery(IS_FOLLOW, { variables: { username: username } });
    const [follow] = useMutation(FOLLOW);
    const [unFollow] = useMutation(UN_FOLLOW);

    const buttonFollow = () => {
        if(data.isFollow) {
            return(
                <Button className="btn-danger" onClick={handleUnFollow}>
                    Dejar de seguir
                </Button>
            )
        } else {
            return (
                <Button className="btn-action" onClick={handleOnFollow}>
                    Seguir
                </Button>
            )
        }
    }

    const handleOnFollow = async() => {
        try {
            await follow({
                variables: {
                    username: username
                }
            })
            refetch();
        } catch (error) {
            console.log(error)
        }
    }

    const handleUnFollow = async() => {
        try {
            await unFollow({
                variables: {
                    username: username
                }
            })
            refetch();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="header-profile">
            <h2>{username}</h2>

            {username === auth.username ? (
                <Button onClick={() => handleModal('settings')} >Ajustes</Button>
            ) : (
                !loading && buttonFollow()
            )}
        </div>
    )
}

export default HeaderProfile;
