import React from 'react';
import {
    BrowserRouter as Router,
} from "react-router-dom";
import ReactDOM from 'react-dom';
import { ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import './index.css';
import { App } from './components/app';
import * as serviceWorker from './serviceWorker';

// Setup connection to SpaceX api
const client = new ApolloClient({
    uri: 'https://api.spacex.land/graphql',
    cache: new InMemoryCache()
});

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <Router>
                <App />
            </Router>
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
