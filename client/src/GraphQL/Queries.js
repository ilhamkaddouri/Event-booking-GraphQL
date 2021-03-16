import { gql } from '@apollo/client';

export const getBookQuery= gql`
    query {
        books{
        id
        name
        genre
      }
    }
`