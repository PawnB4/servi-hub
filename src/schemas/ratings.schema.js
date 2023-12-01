import { z } from "zod";

export const createRatingSchema = z.object({
  service_id: z.number({
    required_error: "service_id is required",
    invalid_type_error: "service_id must be a number",
  }),
  rating: z
    .string({
      required_error: "rating is required",
      invalid_type_error: "rating must be a number",
    })
    .min(1)
    .max(5),
});
