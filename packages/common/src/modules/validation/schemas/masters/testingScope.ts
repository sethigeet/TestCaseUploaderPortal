import * as yup from "yup";

import { getBaseCreateSchema } from "./baseSchema";
import { getBaseEditSchema } from "./baseSchema";

export const createTestingScopeSchema = yup
  .object()
  .shape(getBaseCreateSchema("testingFor"));

export const editTestingScopeSchema = yup.object().shape(getBaseEditSchema());
