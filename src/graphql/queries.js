import {gql} from 'apollo-boost';

export const GET_QUEUE_SONGS =  gql`
    query getQueueSongs {
        queue @client{
            id
            duration
            title
            artist
            thumbnail
            url
        }
    }
    `

