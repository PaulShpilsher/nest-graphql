import { ApolloFederationDriverConfig, ApolloFederationDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TasksModule } from '../tasks/tasks.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
       driver: ApolloFederationDriver,
       autoSchemaFile: true,
     }),
     TasksModule
   ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
