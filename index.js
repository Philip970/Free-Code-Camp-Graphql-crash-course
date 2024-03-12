import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { typeDefs } from "./schema.js";
import _db from "./_db.js";

// How to response to query to the graph
const resolvers = {
  // Resolver for the root query type
  Query: {
    games() {
      return _db.games;
    },
    reviews() {
      return _db.reviews;
    },
    authors() {
      return _db.authors;
    },
    review(_, args) {
      return _db.reviews.find((review) => review.id === args.id);
    },
    game(_, args) {
      return _db.games.find((game) => game.id === args.id);
    },
    author(_, args) {
      return _db.authors.find((author) => author.id === args.id);
    },
  },
};

// Server setup
const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log("Server ready at port : ", 4000);
