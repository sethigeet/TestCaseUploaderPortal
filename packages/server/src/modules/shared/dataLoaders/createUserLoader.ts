import DataLoader from "dataloader";

import { User } from "../../user/userEntity";

export const createUserLoader = (): DataLoader<string, User> =>
  new DataLoader<string, User>(async (userIds) => {
    const users = await User.findByIds(userIds as string[]);
    const userIdsToUser: Record<string, User> = {};
    users.forEach((user) => (userIdsToUser[user.id] = user));

    return userIds.map((userId) => userIdsToUser[userId]);
  });
