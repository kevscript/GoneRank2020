import { gql } from 'apollo-boost'

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      userId
      token
      tokenExpiration
      roles
      votes {
        matchId
      }
    }
  }
`

export const REGISTER_USER = gql`
  mutation RegisterUser($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      _id
      email
    }
  }
`
