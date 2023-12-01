import { z } from "zod";

export const createContractSchema = z.object({
  service_id: z.number({
    required_error: "service_id is required",
    invalid_type_error: "service_id must be a number",
  }),
  contract_message: z
    .string({
      required_error: "contract_message is required",
      invalid_type_error: "contract_message must be a string",
    })
    .min(20)
    .max(200),
  contract_phone: z
    .string({
      required_error: "contract_phone is required",
      invalid_type_error: "contract_phone must be a string",
    })
    .min(1)
    .max(255),
  contract_mail: z
    .string({
      required_error: "contract_mail is required",
      invalid_type_error: "contract_mail must be a string",
    })
    .min(1)
    .max(255),
});

export const updateContractSchema = z.object({
  contract_id: z.number({
    required_error: "contract_id is required",
    invalid_type_error: "contract_id must be a number",
  }),
  contract_status: z
    .string({
      required_error: "contract_status is required",
      invalid_type_error: "contract_status must be a string",
    })
    .min(1)
    .max(20),
});
