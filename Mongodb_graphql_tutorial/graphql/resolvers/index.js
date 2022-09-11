const Content = require('../../database/models/content');
const Person = require('../../database/models/persons');
const User1 = require('../../database/models/user1');
const Booking1 = require('../../database/models/booking1');
const { startSession } = require('mongoose')

const resolvers = {
  Query: {
    async people(_, args){
        try {
            console.log(args.id);
            const people = await Person.findOne({ _id: { $in: args.id } });
            console.log(people)
            return people;
        } catch (err) {
            console.log(err);
            throw err;
        }
        //{"_id": `${args.id}`}
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
    },
    async user1s(_, args){
      try {
        const user1s = await User1.find();
        return user1s;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    async booking1s(_, args) {
      try {
        const booking1s = await Booking1.find();
        return booking1s;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
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
  User1: {
    async booking1s(_,args){
      const booking1s = await Booking1.find({ _id: { $in: _.booking1Ids } })
      return booking1s
    },
  },
  Booking1: {
    async user1(_, args) {
      try {
        const user1 = await User1.findOne({ booking1Ids: { $in: _._id } })
        console.log(user1);
        return user1;
      } catch (err) {
        console.log(err);
        throw err;
      }
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
    },
    async createUser1(_, args){
      try {
        const user1 = new User1({
          ...args.user1Input
        })
        const result = await user1.save();
        return result;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    async createBooking1(_, args) {
      try {
        const booking1 = new Booking1({
          name: args.booking1Input.name
        })
        const result = await booking1.save();
        await User1.findByIdAndUpdate(args.booking1Input.user1Id,
          { $push: { booking1Ids: result._id } },
          { useFindAndModify: false }
        );
        return result;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }    
  }
};

module.exports = resolvers; 