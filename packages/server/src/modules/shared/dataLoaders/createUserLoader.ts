import DataLoader from "dataloader";

import { FindConditions } from "typeorm";

import { User } from "../../user";

export const createUserLoader = (): DataLoader<FindConditions<User>, User> =>
  new DataLoader<FindConditions<User>, User>(async (whereConds) => {
    const users = await User.find({
      where: whereConds as FindConditions<User>[],
    });

    if (users.length !== whereConds.length) {
      throw new Error("User not found!");
    }

    return users;
  });
