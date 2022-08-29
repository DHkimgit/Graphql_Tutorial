import { ApolloServer, gql } from "apollo-server";

const typeDef = `
    type Query{
        text: String
        
    }
`

const server = new ApolloServer({});

server.listen().then(({url}) => {
    console.log(`Running on ${url}`);
})
