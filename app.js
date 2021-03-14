const express = require('express')
//a middleware fucnt
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
//Mongoose
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
//dotenv
require('dotenv').config()


const app = express()
//models
const Event = require('./models/Event')
const User = require('./models/User')

app.use(express.json())

app.use('/graphql',graphqlHTTP({
    schema : buildSchema(`

        type Event{
            _id : ID!
            title:String!
            description:String!
            price: Float!
            date: String!
        }

        type User{
            _id : ID!
            email : String!
            password: String

        }

        input EventInput{
            title:String!
            description:String!
            price: Float!
            date: String!
        }

        input UserInput{
            email : String!
            password: String!

        }

        type RootQuery{
            events : [Event!]!

        }

        type RootMutation {
            createEvent(eventInput : EventInput):Event
            craeteUser(userInput : UserInput) :User
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    //resolver, bundle of resolvers
    rootValue : {
        events :()=>{
            return Event.find()
        },
        createEvent : (args)=>{
            const event =new Event({
               
                title : args.eventInput.title,
                description : args.eventInput.description,
                price : +args.eventInput.price,
                date : new Date(args.eventInput.date),
                creator :"604e6846ddf5e91f78c81f50"

            })
            let createdEvent;
            event.save().then(result => {
                createdEvent  = {...result._doc}
                return User.findById("604e6846ddf5e91f78c81f50")
            
            }).then(user=>{
                user.createdEvents.push(event);
                return user.save()
            }).catch(err=>{
                console.log(err);
                throw err
            })
            return event
        },
        craeteUser :args=>{
            const usr= User.findOne({email: args.userInput.email})
            if(!usr){ 
                return bcrypt.hash(args.userInput.password,12)
                    .then(hashedPassword=>{
                        const user = new User({
                            email : args.userInput.email,
                            password : hashedPassword
                            }) ;
                        return user.save()
                    }).then(result=>{
                        return {...result._doc,password:null}
                    }).catch(err=>{
                        throw err;
                    })
            }else{
                throw new Error('user alreadu exosts')
            }
        }    
    },
    graphiql: true
}))

const DB = process.env.DATABASE.replace(
    '<password>',
    process.env.DATABASE_PASSWORD
  );

mongoose.connect(DB,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> console.log('connection')).catch(()=>console.log('error connecting bd'))

app.listen(5000,()=>{
    console.log('hiihiih i am working -__-')
})