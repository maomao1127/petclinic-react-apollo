import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import App from "./App"
// import ApolloClient from "apollo-boost"
import {ApolloClient} from "apollo-client"
import {ApolloProvider} from 'react-apollo'
import {BrowserRouter, Route} from "react-router-dom";
import {InMemoryCache} from "apollo-cache-inmemory"
import {setContext} from 'apollo-link-context';
import {BatchHttpLink} from "apollo-link-batch-http"
import {ApolloLink} from 'apollo-link'
import {onError} from 'apollo-link-error';

// const Link = createHttpLink({
//   uri: 'http://localhost:8090/graphql',
// });

const link = new BatchHttpLink({
  url: "http://localhost:9977/graphql"
});

const authLink = setContext((_, {headers}) => {
  // get the authentication token from local storage if it exists
  // const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1OWMwYWIxZTllNjA0MjIyYzRhM2IxOWYiLCJyb2xlIjoiUk9MRV9VU0VSIiwiZXhwIjoxNTM5NjcxNzkxfQ.w6GS-fI_WCiCKacKPiNBG2CR5U96XpzxDbVGmY2AN4I",
    }
  }
});

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
  // link: authLink.concat(link),
  link: ApolloLink.from([
    onError(({graphQLErrors, networkError}) => {
      if (graphQLErrors)
        graphQLErrors.map(({message, locations, path, code}) =>
            console.log(
                `[GraphQL error]: Message: ${message}, code: ${code}`,
            ),
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    authLink.concat(link)
  ]),
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


