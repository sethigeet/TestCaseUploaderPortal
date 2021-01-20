import { createMethodDecorator } from "type-graphql";

import { UserRoles } from "@portal/common";

import { Context } from "../types";
import { User } from "../../user/userEntity";

export const isAuthenticated = (
  requiredRole?: UserRoles | UserRoles[]
): MethodDecorator => {
  return createMethodDecorator<Context>(async ({ context: { req } }, next) => {
    const { userId } = req.session;
    if (!userId) {
      throw new Error("Not Authenticated!");
    }

    const user = await User.findOne(userId);
    if (!user) {
      throw new Error("Not authenticated!");
    }

    if (requiredRole) {
      if (Array.isArray(requiredRole)) {
        let hasRequiredRole = false;
        for (const role of requiredRole) {
          if (role === user.role) {
            hasRequiredRole = true;
            break;
          }
        }

        if (!hasRequiredRole) {
          throw new Error("Insufficient Permissions!");
        }
      } else {
        if (user.role !== requiredRole) {
          throw new Error("Insufficient Permissions!");
        }
      }
    }

    return next();
  });
};
