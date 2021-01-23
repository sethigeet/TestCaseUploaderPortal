import DataLoader from "dataloader";

import { FindConditions } from "typeorm";

import { User } from "../../user";

export const createUserLoader = (): DataLoader<FindConditions<User>, User> =>
  new DataLoader<FindConditions<User>, User>(async (whereConds) => {
    const users = await User.find({
      where: whereConds as FindConditions<User>[],
    });
    const userIdsToUser: Record<string, User> = {};
    users.forEach((user) => (userIdsToUser[user.id] = user));

    return whereConds.map(({ id }) => userIdsToUser[id as string]);
  });
