import { IntrospectAndCompose } from '@apollo/gateway';
import { ApolloGatewayDriverConfig, ApolloGatewayDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { RequestHandler } from '@nestjs/common/interfaces';
import { GraphQLModule } from '@nestjs/graphql';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { verify } from 'jsonwebtoken';


const handleAuthContext = ({ req }) => {
  if (req && req.headers.authorization) {
    try {
      const jwtToken = req.headers.authorization.split('Bearer ')[1]
      const decodedJwt = verify(jwtToken, process.env.SECRET );
      return {user: decodedJwt};
    }
    catch(err) {
      //throw Http error if required.
      return;
    }
  }
  else
    //throw Http error if required.
    return;
};

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        // ... Apollo server options
        cors: true,
        context: handleAuthContext
      },
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            { name: 'users', url: 'http://localhost:3331/graphql' },
            { name: 'tasks', url: 'http://localhost:3332/graphql' },
          ],
        }),
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
