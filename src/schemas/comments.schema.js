import { z } from "zod";

export const createCommentSchema = z.object({
  service_id: z.number({
    required_error: "service_id is required",
    invalid_type_error: "service_id must be a number",
  }),
  comment_text: z
    .string({
      required_error: "comment_text is required",
      invalid_type_error: "comment_text must be a string",
    })
    .min(1)
    .max(255, {
      message: "Comment exceeds characters limit (255)",
    }),
});

export const updateCommentSchema = z.object({
  new_state: z
    .number({
      required_error: "new_state is required",
      invalid_type_error: "new_state must be a number",
    })
    .min(0)
    .max(1),
  id_list: z
    .number()
    .array({
      required_error: "id_list is required",
      invalid_type_error: "id_list must be an array",
    })
    .nonempty(),
});
