const graphql = require('graphql')

const Book = require("../../models/Book")
const Author = require("../../models/Author")

const {GraphQLObjectType, GraphQLString,GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql

const BookType = new GraphQLObjectType({
    name : 'Book',
    fields : ()=>({
        id : {type : GraphQLID},
        name : {type : GraphQLString},
        genre :{type : GraphQLString},
        author:{
            type : AuthorType,
            resolve(parent,args){
                //return te author with parent.authorid
                return Author.findById(parent.author)
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name:'Author',
    fields :()=>({
        id:{type : GraphQLID},
        name:{type : GraphQLString},
        age:{type : GraphQLInt},
        books:{
            type : new GraphQLList(BookType),
            resolve(parent,args){
                return Book.find({author : parent.id})
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        book:{
            type : BookType,
            args:{id:{type : GraphQLID}},
            resolve(parent,args){
                //args.id
                //code to get data from DB
                //parant : relationship btw data
                return Book.findById(args.id)
            }
        },
        author:{
            type : AuthorType,
            args:{id :{type : GraphQLID}},
            resolve(parent,args){
                return Author.findById(args.id)
            }
        },
        books:{
            type  : new GraphQLList(BookType),
            resolve(parent,args){
                return Book.find().populate('author');
            }
        },
        authors:{
            type  : new GraphQLList(AuthorType),
            resolve(parent,args){
                return Author.find();
            }
        }
    }
})


const Muttation = new GraphQLObjectType({
    name:"Mutation",
    fields:{
        addAuthor : {
            type : AuthorType,
            args : {
                name :{type : GraphQLString},
                age : {type : GraphQLInt}
            },
            resolve(parent,args){
                let author = new Author({
                    name : args.name,
                    age : args.age
                })
                return author.save()
            }
        },
        addBook : {
            type : BookType,
            args:{
                name :{type : GraphQLString},
                genre:{type : GraphQLString},
                authorid : {type : GraphQLID}
            },
            resolve(parent,args){
                let book = new Book({
                    name : args.name,
                    genre : args.genre,
                    author: args.authorid
                })
                return book.save()
            }
        }
    }
})

module.exports =new GraphQLSchema({
    query : RootQuery,
    mutation :Muttation
})