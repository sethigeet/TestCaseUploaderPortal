import { createParamDecorator } from "type-graphql";

import { Context } from "../types";
import { User } from "../../user";

export const CurrentUser = (): ParameterDecorator => {
  return createParamDecorator<Context>(
    ({ context: { req } }): Promise<User | undefined> => {
      const { userId } = req.session;
      if (!userId) {
        return Promise.resolve(undefined);
      }

      return User.findOne({ id: userId });
    }
  );
};
