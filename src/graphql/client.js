import ApolloClient from 'apollo-client';
import {WebSoketLink} from 'apollo-link-ws';
import {InMemoryCache} from 'apollo-cache-inmemory';

const client = new ApolloClient({
    link: new WebSoketLink({
        uri: 'wss://react-music-appp.herokuapp.com/v1/graphql',
        options: {
            reconect: true
        }
    }),
    cache: new InMemoryCache()
})



export default  client;