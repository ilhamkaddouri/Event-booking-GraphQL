const express = require('express')

//a middleware fucnt
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')


const app = express()


app.use(express.json())

app.use('/graphql',graphqlHTTP({
    schema : buildSchema(`
        type RootQuery{
            events : [String!]

        }

        type RootMutation {
            createEvent(name: String):String
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue : {
        events :()=>{
            return ['events']
        },
        createEvent : (args)=>{
            const eventName= args.name;
            return eventName
        }
    },
    graphiql: true
}))

app.listen(5000,()=>{
    console.log('hiihiih i am working -__-')
})