import { gql } from '@apollo/client';

export const ADD_BOOK = gql`
    mutation addBook(
        $name: String! 
        $genre : String!
        $authorid : ID!
        ) {
        addBook(
            name : $name
            genre: $genre
            authorid: $authorid
           
        ){
            name
            genre
        }
    }
`