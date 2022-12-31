import { createParamDecorator } from "@nestjs/common/decorators";
import { GraphQLExecutionContext } from "@nestjs/graphql";

export const CurrentUser = createParamDecorator(
    (data: string, ctx: GraphQLExecutionContext) => {
      try {
        const headers = ctx.getArgs()[2].req.headers;
        if (headers.user) {
          return JSON.parse(headers.user);
        }
      }
      catch (err) {
        return null;
      }
  }
);
