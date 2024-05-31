import { z } from "zod";

import { FormDataSchema } from "./payment-form.validation";

export type Inputs = z.infer<typeof FormDataSchema>