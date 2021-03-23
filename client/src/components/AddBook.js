import React, { useState, useEffect } from 'react'
import {ADD_BOOK} from '../GraphQL/Mutations'
import {getAuthorQuery} from '../GraphQL/Queries'
import {  useMutation, useQuery } from '@apollo/client';
function Book() {

    const [name,setName]= useState()
    const [genre,setGenre] = useState()
    const [authorId,setAuthor] = useState()
    const {err, loading, data} = useQuery(getAuthorQuery)
    const [authors,setAuthors]= useState([])

    useEffect(()=>{
        if(data){
            setAuthors(data.authors)
            console.log(data)
        }
    },[data])

    const [addBook, {error}] = useMutation(ADD_BOOK)
    const createBook = ()=>{
        
        console.log(name+genre+"book")
        addBook({
            variables:{
                name : name,
                genre : genre,
                authorid : authorId
               
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
                <div>
                    <label>author</label>
                    <select onChange={(e)=> setAuthor(e.target.value)}>
                        <option>select author</option>
                        {authors.map(author=> (
                        
                        <option key={author.id} value={author.id}>{author.name}</option>
                        ))}
                    </select>
                </div>
                
                <button onClick={createBook}>Add a book</button>
            </form>
        </div>
    )
}

export default Book
