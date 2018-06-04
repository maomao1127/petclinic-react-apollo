import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import App from "./App"
import ApolloClient from "apollo-boost"
import {ApolloProvider} from 'react-apollo'
import {BrowserRouter, Route} from "react-router-dom";
// import {message} from "antd"
import {BatchHttpLink} from "apollo-link-batch-http"
import {InMemoryCache} from "apollo-cache-inmemory"

//TODO:没有生效，还是三个请求
const link = new BatchHttpLink({url: "http://localhost:9977/graphql"});

const cache = new InMemoryCache({
  cacheRedirects: {
    Query: {
      owner: (_, {id}, {getCacheKey}) =>
          getCacheKey({__typename: 'Owner', id}),
      pet: (_, {id}, {getCacheKey}) =>
          getCacheKey({__typename: 'Pet', id})
    }
  }
});

const client = new ApolloClient({
  link: link,
  cache: cache
});

// const client = new ApolloClient({
//   url: "http://localhost:9977/graphql",
//   cacheRedirects: {
//     Query: {
//       owner: (_, {id}, {getCacheKey}) =>
//           getCacheKey({__typename: 'Owner', id}),
//       pet: (_, {id}, {getCacheKey}) =>
//           getCacheKey({__typename: 'Pet', id})
//     }
//   },
//   onError: ({graphQLErrors, networkError}) => {
//     if (graphQLErrors) {
//       message.error(graphQLErrors[0].message, 1);
//     }
//     if (networkError) {
//       message.error(networkError.message, 1);
//     }
//   }
// });

ReactDOM.render(
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Route component={App} path={""}/>
      </BrowserRouter>
    </ApolloProvider>,
    document.getElementById('root'));
registerServiceWorker();


