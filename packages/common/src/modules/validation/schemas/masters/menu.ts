import { object } from "yup";

import { getBaseCreateSchema } from "./baseSchema";
import { getBaseEditSchema } from "./baseSchema";

export const createMenuSchema = object().shape(getBaseCreateSchema("module"));

export const editMenuSchema = object().shape(getBaseEditSchema());
