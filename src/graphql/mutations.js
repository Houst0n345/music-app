import {gql} from 'apollo-boost';

export const ADD_OR_REMOVE_FROM_QUEUE = gql`
    mutation addOrRemoveFromQueue($input: SongInput!){
        addOrRemoveFromQueue(input: $input) @client 
    }
`


export const ADD_SONG =  gql`
    mutation AddSong(
    $artist: String!, 
    $title: String!, 
    $duration: Float!,
    $url: String!, 
    $thumbnail: String!
) {
  insert_songs(
     objects: {
         artist: $artist, 
         duration: $duration, 
         title: $title, 
         url: $url, 
         thumbnail: $thumbnail
     }) {
    affected_rows
  }
}
`