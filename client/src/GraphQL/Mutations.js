import { gql } from '@apollo/client';

export const AddBook = gql`
    mutation addBook(
        $name: String! 
        $genre : String!
        $author: ID!) {
        addBook(
            name : $name
            genre: $genre
            author: $author
        ){
            name
            genre
        }
    }
`