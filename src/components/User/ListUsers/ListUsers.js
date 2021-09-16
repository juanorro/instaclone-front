import { map, size } from 'lodash';
import React from 'react';
import './Listusers.scss';
import { Image } from 'semantic-ui-react';
import ImageNotFound from '../../../assets/png/avatar.png';
import { useHistory } from 'react-router';

const ListUsers = ({ followers, setShowModal, follows, users }) => {

    const history = useHistory();

    const goToUser = (username) => {
        setShowModal(false)
        history.push(`/${username}`);
    }

    return (

        <div className="list-users">
            {size(users) === 0 ? (
                <p className="list-users-not-users">No tienes seguidores todavía</p>
            ) : (
                map(users, (user, i) => (
                    <div
                        key={i}
                        className="list-users-user"
                        onClick={() => goToUser(user.username)}
                    >
                        <Image src={ user.avatar || ImageNotFound } avatar />
                        <div>
                            <p>{user.name}</p>
                            <p>{user.username}</p>
                        </div>
                    </div>
                ))
            )}
        </div>
        // <div className="list-users">
        //     {followers ?
        //         size(followers) === 0 ? (
        //             <p className="list-users-not-users">No tienes seguidores todavía</p>
        //         ) : (
        //             map(followers, (follower, i) => (
        //                 <div 
        //                     key={i} 
        //                     className="list-users-user" 
        //                     onClick={() => goToUser(follower.username)}
        //                 >
        //                     <Image src={follower.avatar || ImageNotFound} avatar />
        //                     <div>
        //                         <p>{follower.name}</p>
        //                         <p>{follower.username}</p>
        //                     </div>
        //                 </div>
        //             ))
        //         ) : 

        //         size(follows) === 0 ? (
        //             <p className="list-user-not-user">No has seguido a nadie todavía</p>
        //         ) : (
        //             map(follows, (follows, i) => (
        //                 <div
        //                     key={i}
        //                     className="list-users-user"
        //                     onClick={() => goToUser(follows.username)}
        //                 >
        //                     <Image src={follows.avatar || ImageNotFound} avatar />
        //                     <div>
        //                         <p>{follows.name}</p>
        //                         <p>{follows.username}</p>
        //                     </div>
        //                 </div>
        //             ))
        //         )
        //     }
            
        // </div>
    )
}

export default ListUsers;
