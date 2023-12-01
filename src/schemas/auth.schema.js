import { z } from "zod";

export const signUpSchema = z.object({
  lastName: z
    .string({
      required_error: "lastName is required",
      invalid_type_error: "lastName must be a string",
    })
    .min(1)
    .max(255),
  mail: z
    .string({
      required_error: "mail is required",
      invalid_type_error: "mail must be a string",
    })
    .min(1)
    .max(255),
  name: z
    .string({
      required_error: "name is required",
      invalid_type_error: "name must be a string",
    })
    .min(1)
    .max(255),
  password: z
    .string({
      required_error: "password is required",
      invalid_type_error: "password must be a string",
    })
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .max(255),
  phone: z
    .string({
      required_error: "phone is required",
      invalid_type_error: "phone must be a string",
    })
    .min(1)
    .max(255),
});

export const logInSchema = z.object({
  mail: z
    .string({
      required_error: "mail is required",
      invalid_type_error: "mail must be a string",
    })
    .min(1)
    .max(255),
  password: z
    .string({
      required_error: "password is required",
      invalid_type_error: "password must be a string",
    })
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .max(255),
});

export const updateUserSchema = z.object({
  user_id: z.string({
    required_error: "user_id is required",
    invalid_type_error: "user_id must be a string",
  }),
  degree: z
    .string({
      required_error: "degree is required",
      invalid_type_error: "degree must be a string",
    })
    .min(1)
    .max(255),
  work_experience: z
    .string({
      required_error: "work_experience is required",
      invalid_type_error: "work_experience must be a string",
    })
    .min(20)
    .max(200),
});
