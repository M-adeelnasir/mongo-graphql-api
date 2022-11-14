import * as dotenv from 'dotenv';
dotenv.config();
import 'reflect-metadata';
import express from 'express';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageProductionDefault,
} from 'apollo-server-core';
import mongo from './utils/mongo';
import { resolvers } from './resolvers';
import { verifyJwt, UserFromToken } from './utils/jwt';
import { Context } from './types/context';
import authChecker from './utils/authChecker';

const PORT = process.env.PORT;
async function bootstrap() {
  //   @ Build Schema
  const schema = await buildSchema({
    resolvers,
    authChecker,
  });

  //   @ Initialize application
  const app = express();

  //create apollo server
  const server = new ApolloServer({
    schema,
    context: (ctx: Context) => {
      if (ctx.req.headers.cookie?.split('=')[1]) {
        const decoded = verifyJwt<UserFromToken>(
          ctx.req.headers.cookie?.split('=')[1]
        );
        ctx.user = decoded;
      }
      return ctx;
    },
    plugins: [
      process.env.NODE_ENV === 'production'
        ? ApolloServerPluginLandingPageProductionDefault()
        : ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
  });

  await server.start();

  //applumiddleware
  server.applyMiddleware({ app });

  await mongo();
  //   @ listen the server
  app.listen(PORT, async () => {
    console.log('Server is listing and up on port 1337');
  });
}

bootstrap();
