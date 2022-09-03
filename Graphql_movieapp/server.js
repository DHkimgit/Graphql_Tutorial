import { ApolloServer, gql } from "apollo-server";

const typeDefs = `
    type User {
        id: ID,
        username: String
    }
    type Tweet {
        id: ID,
        text: String
        author: User
    }
    type Query{
        allTweets: [Tweet],
        tweet(id: ID): Tweet
    }
    type Mutation {
        postTweet(text: String, userId: ID): Tweet,
        deleteTweet(id: ID): Boolean
    }
`

const server = new ApolloServer({typeDefs});

server.listen().then(({url}) => {
    console.log(`Running on ${url}`);
})



/*
                    _ooOoo_
                  o8888888o
                  88" . "88
                  (| -_- |)
                  O\  =  /O
               ____/`---'\____
             .'  \\|     |//  `.
            /  \\|||  :  |||//  \
           /  _||||| -:- |||||-  \
           |   | \\\  -  /// |   |
           | \_|  ''\---/''  |   |
           \  .-\__  `-`  ___/-. /
         ___`. .'  /--.--\  `. . __
      ."" '<  `.___\_<|>_/___.'  >'"".
     | | :  `- \`.;`\ _ /`;.`/ - ` : | |
     \  \ `-.   \_ __\ /__ _/   .-` /  /
======`-.____`-.___\_____/___.-`____.-'======
                   `=---='
            Buddha Bless : "No Bugs"
=============================================
*/