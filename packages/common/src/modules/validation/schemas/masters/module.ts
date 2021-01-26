import { object } from "yup";

import { getBaseCreateSchema } from "./baseSchema";
import { getBaseEditSchema } from "./baseSchema";

export const createModuleSchema = object().shape(
  getBaseCreateSchema("product")
);

export const editModuleSchema = object().shape(getBaseEditSchema());
