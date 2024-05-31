import { z } from "zod";

import { inquiryVahicleFormSchema } from "./inquiry-vehicle-form.validations";

export type InquiryFormData = z.infer<typeof inquiryVahicleFormSchema>