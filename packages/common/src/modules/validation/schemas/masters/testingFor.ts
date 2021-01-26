import { object } from "yup";

import { getBaseEditSchema } from "./baseSchema";
import { getBaseCreateSchema } from "./baseSchema";

export const createTestingForSchema = object().shape(
  getBaseCreateSchema("menu")
);

export const editTestingForSchema = object().shape(getBaseEditSchema());
