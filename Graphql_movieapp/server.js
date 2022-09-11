import { ApolloServer, gql } from "apollo-server";

const rosterinformation = [
    {
        roster_id: "R22-01",
        roster_name: "무전실 근무",
        roster_work_rule:"timely",
        roster_create_user_servicenumber:"22-76014925",
        roster_time_group:[
            {
                time_group_id: "01",
                time: ["06:00 - 08:00"],
                order: "forward",
                input_person: "1",
                apply_group: ["weekday","weekend"]
            },
            {
                time_group_id:"02",
                time:["08:00 - 10:00","10:00 - 12:00","12:00 - 14:00","14:00 - 16:00","18:00 - 18:00"],
                order:"forward",
                input_person:"1",
                apply_group:["weekend"]
            }
        ]
    },
    {
        roster_id: "R22-02",
        roster_name: "위병소 근무",
        roster_work_rule:"timely",
        roster_create_user_servicenumber:"22-76014926",
        roster_time_group:[
            {
                time_group_id: "01",
                time: ["06:00 - 08:00"],
                order: "forward",
                input_person: "1",
                apply_group: ["weekday","weekend"]
            },
            {
                time_group_id:"02",
                time:["08:00 - 10:00","10:00 - 12:00","12:00 - 14:00","14:00 - 16:00","18:00 - 18:00"],
                order:"forward",
                input_person:"1",
                apply_group:["weekend"]
            }
        ]
    }
]

const user = [
    {
        name: "김두현",
        rank: "일병"
    },
    {
        name: "김두횬",
        rank: "상병"
    }
]

const typeDefs = `
    type User {
        name: String
        rank: String
        nameandrank: String
    }
    type TimeGroup {
        time_group_id: String
        time: [String]
        order: String
        input_person: Int
        apply_group: [String]
    }
    type RosterInformation {
        roster_id: String
        roster_create_user_servicenumber: String
        roster_name: String
        roster_work_rule: String
        roster_time_group: [TimeGroup]
    }
    type Query{
        allRosterInformation: [RosterInformation]
        RosterInformation(roster_create_user_servicenumber: String!): RosterInformation
        allUsers: [User]
    }
    
`
const resolvers = {
    Query: {
        allRosterInformation() {
            return rosterinformation
        },
        RosterInformation(root, {roster_create_user_servicenumber}) {
            return rosterinformation.find((x) => x.roster_create_user_servicenumber === roster_create_user_servicenumber)
        },
        allUsers(){
            return user
        }
    },
        User: {
        nameandrank({name, rank}){
            return `${rank} ${name}`
        }
    }

}
//mongod --dbpath /var/lib/mongodb/

const server = new ApolloServer({typeDefs, resolvers});

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