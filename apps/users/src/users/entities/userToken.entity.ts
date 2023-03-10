import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UserToken {
  @Field(() => String)
  accessToken:  string;
}
