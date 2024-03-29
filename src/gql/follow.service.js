import { gql } from '@apollo/client';

export const IS_FOLLOW = gql`
    query isFollow($username: String!) {
        isFollow(username: $username)
    }
`;

export const FOLLOW = gql`
    mutation	follow($username: String!) {
        follow(username: $username)
    }
`;

export const UN_FOLLOW = gql`
    mutation unFollow($username: String!) {
        unFollow(username: $username)
    }
`;

export const GET_FOLLOWERS = gql`
    query getFollowers($username: String!) {
        getFollowers(username: $username){
            username
            name
            avatar
        }
    }
`;

export const GET_FOLLOWS = gql`
    query getFollows($username: String!) {
        getFollows(username: $username){
            username
            name
            avatar
        }
    }
`;

export const GET_NOT_FOLLOWERS = gql`
    query getNotFollowers {
        getNotFollowers {
            username
            name
            avatar
        }
    }
`;