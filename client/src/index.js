import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import App from './App'
import * as serviceWorker from './utils/serviceWorker'

const client = new ApolloClient({
  uri: '/graphql',
  request: (operation) => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      const token = user.token
      operation.setContext({
        headers: {
          authorization: token ? `Bearer ${token}` : '',
        },
      })
    }
  },
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
