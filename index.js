const { ApolloServer, gql } = require('apollo-server');

// 1. CREATE PROJECT
// Initialize a new Node.js project with npm: npm init --yes
// this will create a package.json file

// 2. INSTALL DEPENDENCIES
// npm install apollo-server graphql

// then make a file for the following content:
// touch index.js

// 3. DEFINE THE GRAPHQL SCHEMA (data structure)

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
`;

// 4. DEFINE THE DATA SET

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

// 5. DEFINE A RESOLVER

//We've defined our data set, but Apollo Server doesn't know
// that it should use that data set when it's executing a query. 
// To fix this, we create a resolver.

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
  },
};

// 6. CREATE AN INSTANCE OF APOLLOSERVER
// We provide this information to Apollo Server when we initialize it.

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

// 7. START THE SERVER AND START QUERYING!
//with command: node index.js
// Go to http://localhost:4000
// also here studio.apollographql.com/sandbox 

