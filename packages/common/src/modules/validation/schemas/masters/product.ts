import { object } from "yup";

import { getBaseCreateSchema } from "./baseSchema";

export const createProductSchema = object().shape(getBaseCreateSchema());
