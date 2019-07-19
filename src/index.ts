import { ApolloServer, gql } from 'apollo-server';
import { IncomingMessage, ServerResponse } from 'http';
import { importSchema } from 'graphql-import';
import { join } from 'path';
import { PokemonRestDataSource } from './datasources/PokemonRestDataSource';
import { resolvers } from './resolvers';
import { fakeResolvers } from './resolvers/fake';

interface RequestResponseWrapper {
  req: IncomingMessage;
  res: ServerResponse;
}

const typeDefs = gql(importSchema(join(__dirname, 'schema.graphql')));

const server = new ApolloServer({
  typeDefs,
  resolvers: 'tests' === process.env.NODE_ENV ? fakeResolvers : resolvers,
  dataSources: () => ({
    pokemonRestDataSource: new PokemonRestDataSource(),
  }),
  context: (arg: RequestResponseWrapper) => ({
    language: arg.req.headers.language as string
  })
});

server.listen().then(({ url }): any => {
  console.log(`🚀 Server ready at ${url}`);
});