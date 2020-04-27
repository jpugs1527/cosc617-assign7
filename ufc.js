var express = require('express');
var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
    type Query {
        fighter(name: String): Fighter
        fighters(weightClass: String): [Fighter]
    },
    type Fighter {
        name: String
        nickname: String
        wins: String
        losses: String
        height: String
        weightClass: String
        origin: String
    }
`);
var fightersData = [
    {
        name: 'Todd Duffee',
        nickname: 'The Irish Car Bomb',
        wins: '9',
        losses: '3',
        height: '1.91m',
        weightClass: 'Heavyweight',
        origin: 'Coconut Creek, Florida'
    },
    {
        name: 'Ben Rothwell',
        nickname: 'Big Ben',
        wins: '37',
        losses: '12',
        height: '1.93m',
        weightClass: 'Heavyweight',
        origin: 'Kenosha, Wisconsin'
    },
    {
        name: 'Daniel Cormier',
        nickname: 'DC',
        wins: '22',
        losses: '2',
        height: '1.83m',
        weightClass: 'Heavyweight',
        origin: 'San Jose, California'
    },
    {
        name: 'Stipe Miocic',
        nickname: 'N/A',
        wins: '9',
        losses: '4',
        height: '1.93m',
        weightClass: 'Heavyweight',
        origin: 'Independence, Ohio'
    },
    {
        name: 'Walt Harris',
        nickname: 'The Vault',
        wins: '13',
        losses: '7',
        height: '1.96m',
        weightClass: 'Heavyweight',
        origin: 'Birmingham, Alabama'
    },
    {
        name: 'Curtis Blaydes',
        nickname: 'Razor',
        wins: '13',
        losses: '2',
        height: '1.93m',
        weightClass: 'Heavyweight',
        origin: 'Chicago, Illinois'
    },
    {
        name: 'Maurice Greene',
        nickname: 'The Crochet Boss',
        wins: '8',
        losses: '4',
        height: '2.01m',
        weightClass: 'Heavyweight',
        origin: 'Evanston, Illinois'
    },
    {
        name: 'Jeff Hughes',
        nickname: 'Light Out',
        wins: '10',
        losses: '3',
        height: '1.88m',
        weightClass: 'Heavyweight',
        origin: 'Canton, Ohio'
    },
    {
        name: 'Ed Herman',
        nickname: 'Short Fuse',
        wins: '25',
        losses: '14',
        height: '1.87m',
        weightClass: 'Light Heavyweight',
        origin: 'Portland, Oregon'
    },
    {
        name: 'Luke Rockhold',
        nickname: 'N/A',
        wins: '16',
        losses: '5',
        height: '1.91m',
        weightClass: 'Light Heavyweight',
        origin: 'San Jose, California'
    },
    {
        name: 'Jon Jones',
        nickname: 'Bones',
        wins: '26',
        losses: '1',
        height: '1.93m',
        weightClass: 'Light Heavyweight',
        origin: 'Albuquereuq, New Mexico'
    },
    {
        name: 'Gian Villante',
        nickname: 'N/A',
        wins: '17',
        losses: '11',
        height: '1.91m',
        weightClass: 'Light Heavyweight',
        origin: 'Bellmore, New York'
    },
    {
        name: 'Chris Weidman',
        nickname: 'All-American',
        wins: '14',
        losses: '5',
        height: '1.88m',
        weightClass: 'Light Heavyweight',
        origin: 'Baldwin, New York'
    },
    {
        name: 'Corey Anderson',
        nickname: 'Overtime',
        wins: '13',
        losses: '5',
        height: '1.91m',
        weightClass: 'Light Heavyweight',
        origin: 'Rockton, Illinois'
    },
    {
        name: 'Sam Alvey',
        nickname: 'Smilin',
        wins: '33',
        losses: '13',
        height: '1.92m',
        weightClass: 'Light Heavyweight',
        origin: 'Murrieta, California'
    },
    {
        name: 'Rodney Collier',
        nickname: 'The Prototype',
        wins: '11',
        losses: '4',
        height: '1.91m',
        weightClass: 'Light Heavyweight',
        origin: 'Cuba, Missouri'
    },
    {
        name: 'Anthony Smith',
        nickname: 'Lionheart',
        wins: '32',
        losses: '14',
        height: '1.93m',
        weightClass: 'Light Heavyweight',
        origin: 'Denver, Colorado'
    },
    {
        name: 'Khalil Roundtree',
        nickname: 'The War Horse',
        wins: '8',
        losses: '4',
        height: '1.94m',
        weightClass: 'Light Heavyweight',
        origin: 'Phuket, Thailand'
    },
    {
        name: 'Devin Clark',
        nickname: 'Brown Bear',
        wins: '11',
        losses: '4',
        height: '1.83m',
        weightClass: 'Light Heavyweight',
        origin: 'Sioux Falls, South Dakota'
    },
    {
        name: 'Justin Ledet',
        nickname: 'El Blanco',
        wins: '9',
        losses: '3',
        height: '1.93m',
        weightClass: 'Light Heavyweight',
        origin: 'Rosharon, Texas'
    }
    
]
var getFighter = function(args) { 
    var name = args.name;
    return fightersData.filter(fighter => {
        return fighter.name == name;
    })[0];
}
var getFighters = function(args) {
    if (args.weightClass) {
        var weightClass = args.weightClass;
        return fightersData.filter(fighter => fighter.weightClass === weightClass);
    } else {
        return fightersData;
    }
}
var root = {
    fighter: getFighter,
    fighters: getFighters
};

var app = express();
app.use('/testgraphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));