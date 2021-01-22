import { createParamDecorator } from "type-graphql";

import { Context } from "../types";
import { User } from "../../user";

export const CurrentUser = (): ParameterDecorator => {
  return createParamDecorator<Context>(
    ({ context: { req, userLoader } }): Promise<User | undefined> => {
      const { userId } = req.session;
      if (!userId) {
        return Promise.resolve(undefined);
      }

      return userLoader.load(userId);
    }
  );
};
