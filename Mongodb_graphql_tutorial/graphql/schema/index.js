const { gql } = require('apollo-server');
const typeDefs = gql`
  type Query {
    allPeople:[Person]
    contents  : [Content]
    people(id: String!): Person
  }
  type Content {
    _id: ID
    title: String
    content: String
    createdAt: String
  }
  type Person{
    _id: ID
    name: String
    friends: [Person]
  }
  input ContentInput {
    title: String
    content: String
  }
  type Mutation{
    createContent(contentInput: ContentInput): [Content]!
  }
`;

module.exports = typeDefs;