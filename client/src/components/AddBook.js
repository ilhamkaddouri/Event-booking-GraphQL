import React, { useState } from 'react'
import {AddBook} from '../GraphQL/Mutations'
import {  useMutation } from '@apollo/client';
function Book() {

    const [name,setName]= useState()
    const [genre,setGenre] = useState()

    const [addBook, {error}] = useMutation(AddBook)
    const createBook = ()=>{
        addBook({
            variables:{
                name,
                genre,
                author : "60507001e55f314a641100a4"
            }
        })
        if(error){
            console.log(error)
        }
    }
    return (
        <div>
            <form>
                <input placeholder="Book Name" type="text" onChange={e=> setName(e.target.value)} />
                <input placeholder="Book Gender" type="text" onChange={e=> setGenre(e.target.value)}/>
                <button onClick={createBook}>Add a book</button>
            </form>
        </div>
    )
}

export default Book
