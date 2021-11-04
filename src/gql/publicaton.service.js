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

