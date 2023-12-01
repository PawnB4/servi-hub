import { z } from "zod";

const validCategories = [
  "Tareas del hogar",
  "Cuidado de ninos",
  "Servicios para mascotas",
  "Educacion",
  "Eventos",
  "Tecnologia",
  "Fitness y bienestar",
  "Diseno y creatividad",
  "Otro",
];

const validFrequencies = [
  "1/semana",
  "2/semana",
  "3/semana",
  "1/mes",
  "2/mes",
  "A definir",
];

export const createServiceSchema = z.object({
  user_id: z.string({
    required_error: "user_id is required",
    invalid_type_error: "user_id must be a string",
  }),
  name: z
    .string({
      required_error: "name is required",
      invalid_type_error: "name must be a string",
    })
    .min(1)
    .max(255),
  category: z
    .string({
      required_error: "category is required",
      invalid_type_error: "category must be a string",
    })
    .min(1)
    .max(255)
    .refine((value) => validCategories.includes(value), {
      message: "invalid category",
    }),
  description: z
    .string({
      required_error: "description is required",
      invalid_type_error: "description must be a string",
    })
    .min(1)
    .max(255),
  frequency: z
    .string({
      required_error: "frequency is required",
      invalid_type_error: "frequency must be a string",
    })
    .min(1)
    .max(255),
  duration: z
    .string({
      required_error: "duration is required",
      invalid_type_error: "duration must be a string",
    })
    .min(1)
    .max(255)
    .refine((value) => validFrequencies.includes(value), {
      message: "invalid frequency",
    }),
  cost: z
    .string({
      required_error: "cost is required",
      invalid_type_error: "cost must be a string",
    })
    .min(1)
    .max(255),
});

export const updateServiceSchema = z.object({
  service_id: z.string({
    required_error: "service_id is required",
    invalid_type_error: "service_id must be a string",
  }),
  name: z
    .string({
      required_error: "name is required",
      invalid_type_error: "name must be a string",
    })
    .min(1)
    .max(255),
  category: z
    .string({
      required_error: "category is required",
      invalid_type_error: "category must be a string",
    })
    .min(1)
    .max(255),
  description: z
    .string({
      required_error: "description is required",
      invalid_type_error: "description must be a string",
    })
    .min(1)
    .max(255),
  frequency: z
    .string({
      required_error: "frequency is required",
      invalid_type_error: "frequency must be a string",
    })
    .min(1)
    .max(255),
  duration: z
    .string({
      required_error: "duration is required",
      invalid_type_error: "duration must be a string",
    })
    .min(1)
    .max(255),
  cost: z
    .string({
      required_error: "cost is required",
      invalid_type_error: "cost must be a string",
    })
    .min(1)
    .max(255),
});
