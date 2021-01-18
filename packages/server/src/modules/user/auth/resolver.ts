import { BuildSchemaOptions } from "type-graphql";

import { LoginResolver } from "./login";
import { LogoutResolver } from "./logout";
import { MeResolver } from "./me";
import { RegisterResolver } from "./register";

export const authResolvers: BuildSchemaOptions["resolvers"] = [
  RegisterResolver,
  LoginResolver,
  MeResolver,
  LogoutResolver,
];
