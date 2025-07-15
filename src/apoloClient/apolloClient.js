// src/apolloClient.js
import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

// Optional: Error logging for GraphQL and network errors
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      console.error(`[GraphQL error]: ${err.message}`);
    }
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError.message}`);
  }
});

// Optional: Attach token from localStorage to every request
const authLink = new HttpLink({
  uri: "http://192.168.1.5:5000/graphql",
  headers: {
    authorization: localStorage.getItem("token")
      ? `Bearer ${localStorage.getItem("token")}`
      : "",
  },
});

// Final Apollo Client instance
const client = new ApolloClient({
  link: from([errorLink, authLink]),
  cache: new InMemoryCache(),
});

export default client;
