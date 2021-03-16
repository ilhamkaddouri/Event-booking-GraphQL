import React, { useEffect, useState } from 'react'
import {  useQuery } from '@apollo/client';
import {getBookQuery} from '../GraphQL/Queries'

// const getBookQuery= gql`
//     query {
//         books{
//         id
//         name
//         genre
//       }
//     }
// `
function BookList() {
    const {error, loading, data} = useQuery(getBookQuery)
    const [books,setBooks]= useState([])

    useEffect(()=>{
        if(data){
            setBooks(data.books)
            console.log(data)
        }
    },[data])

    return (
        <div>
            
             {books.map(book=> (
                <div key={book.id}>{book.name} of gender : {book.genre}</div>
            ))} 
        </div>
    )
}

export default BookList
