import { gql } from '@apollo/client';

export const PUBLISH = gql`
    mutation publish($file: Upload) {
        publish(file: $file) {
            status
            urlFile
        }
    }
`;

export const GET_ALL_PUBLICATIONS = gql`
    query getAllPublications($username: String!) {
        getAllPublications(username: $username) {
            id
            idUser
            file
            typeFile
        }
    }
`;

export const GET_PUBLICATIONS_FOLLOWERS = gql`
    query getPublicationsFollowers {
        getPublicationsFollowers{
            id
            idUser {
                name
                username
                avatar
            }
            file
            typeFile
            createAt
        }
    }
`;

