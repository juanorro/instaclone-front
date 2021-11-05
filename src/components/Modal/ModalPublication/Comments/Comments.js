import React, { useEffect } from 'react';
import { Image } from 'semantic-ui-react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_COMMENTS } from '../../../../gql/commet.service';
import './Comments.scss';
import ImageNotFound from '../../../../assets/png/avatar.png';

const Comments = ({ publication }) => {

    const { data, loading, startPolling, stopPolling } = useQuery(GET_COMMENTS, {
        variables: {
            idPublication: publication.id,
        }
    });

    useEffect(() => {
        startPolling(1000); 

        return () => {
            stopPolling()
        }
    }, [startPolling, stopPolling])

    if(loading) return null;

    const { getComments } = data;

    return (
        <div className="comments">
            {getComments.map((comment, i) => (
                <Link to={`/${comment.idUser.username}`} key={i} className="comment">
                    <Image src={comment.idUser.avatar ? comment.idUser.avatar : ImageNotFound} avatar />
                    <div>
                        <p>{comment.idUser.username}</p>
                        <p>{comment.comment}</p>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default Comments;