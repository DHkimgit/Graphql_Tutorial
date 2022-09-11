const { gql } = require('apollo-server');
const typeDefs = gql`
  type Query {
    allPeople:[Person]
    contents  : [Content]
    people(id: String!): Person!
    user1s: [User1]
    booking1s: [Booking1]
  }
  type Booking1{
    _id: ID
    name: String
    user1: User1
    createdAt: String
  }
  input Booking1Input{
    name: String
    user1Id: String
  }
  type User1{
    _id: ID
    name: String
    booking1s: [Booking1]
    createdAt: String
  }
  input User1Input{
    name: String
  }
  type Content {
    _id: ID!
    title: String!
    content: String!
    createdAt: String!
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
    createContent(contentInput: ContentInput): Content!
    createUser1(user1Input: User1Input): User1!
    createBooking1(booking1Input: Booking1Input): Booking1!
  }
`;

module.exports = typeDefs;