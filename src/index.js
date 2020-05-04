import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {MuiThemeProvider} from '@material-ui/core';
import Theme from './Components/Theme/Theme';
import CssBaseline from '@material-ui/core/CssBaseline';
import client from './graphql/client';
import {ApolloProvider} from '@apollo/react-hooks';


ReactDOM.render(
    <ApolloProvider client={client}>
        <MuiThemeProvider theme={Theme}>
            <CssBaseline/>
            <App/>
        </MuiThemeProvider>
    </ApolloProvider>,
        document.getElementById('root')
    );


