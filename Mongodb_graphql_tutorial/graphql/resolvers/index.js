const Content = require('../../database/models/content');
const Person = require('../../database/models/persons');
const resolvers = {
  Query: {
    async people(_, args){
        try {
            console.log(args.id);
            const people = await Person.find({"_id": `${args.id}`}).exec();
            console.log(people)
            return people;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    async allPeople(_, args){
      try {
        const people = await Person.find();
        return people;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    async contents(_, args) {
        try {
            const contents = await Content.find();
            return contents;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
  },
  Person: {
    _id(_, args) {
      return _._id;
    },
    name(_, args) {
      return _.name;
    },
    async friends(_,args){
      const friends = await Person.find({ _id: { $in: _.friendIds } })
      return friends
    },
  },
  Content: {
    _id(_, args) {
        return _._id;
    },
    title(_, args) {
        return _.title;
    },
    content(_, args) {
        return _.content;
    },
    createdAt(_, args) {
        return _.createdAt;
    }
  },
  Mutation: {
    async createContent(_, args) {
        try {
            const content = new Content({
            ...args.contentInput
        })
        const result = await content.save();
        return result;
        } catch (err) {
        console.log(err);
        throw err;
    }
    }
  }
};

module.exports = resolvers; 