import { Request, Response } from "express";
import { SessionData } from "express-session";
import { Redis } from "ioredis";
import DataLoader from "dataloader";

import { User } from "../../user/userEntity";

export type Context = {
  req: Request & { session: SessionData & { userId?: string } };
  res: Response;
  redisClient: Redis;
  userLoader: DataLoader<string, User>;
};
