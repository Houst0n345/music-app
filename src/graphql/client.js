import ApolloClient from 'apollo-client';
import {WebSocketLink} from 'apollo-link-ws';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {gql} from 'apollo-boost';
import {GET_QUEUE_SONGS} from "./queries";

const client = new ApolloClient({
    link: new WebSocketLink({
        uri: 'wss://react-music-appp.herokuapp.com/v1/graphql',
        options: {
            reconnect: true
        }
    }),
    cache: new InMemoryCache(),
    typeDefs: gql`
        type Song {
        id: uuid!
        title: String!
        artist: String!
        thumbnail: String!
        duration: String!
        url: String!
        }
        input SongInput {
            id: uuid!
            title: String!
            artist: String!
            thumbnail: String!
            duration: String!
            url: String!
        }
        type Query{
            queue: [Song]!
        }
        type Mutation {
            addOrRemoveFromQue(input: SongInput): [Song]!
        }
    `,
    resolvers: {
        Mutation: {
            addOrRemoveFromQueue: (_, {input}, {cache})=> {
                const queryResult = cache.readQuery({
                    query: GET_QUEUE_SONGS
                })
                if(queryResult){
                    const {queue} = queryResult
                    const isInQueue = queue.some(song => song.id === input.id)
                    const newQueue = isInQueue ?
                        queue.filter(song => song.id !== input.id)
                        : [...queue, input]
                    cache.writeQuery({
                        query: GET_QUEUE_SONGS,
                        data: {queue: newQueue}
                    })
                    return newQueue
                }
                return [];
            }
        }
    }
})

const hasQueue = Boolean(localStorage.getItem("queue"));

const data = {
    queue: hasQueue ? JSON.parse(localStorage.getItem("queue")) : []
}

client.writeData({ data })


export default client;