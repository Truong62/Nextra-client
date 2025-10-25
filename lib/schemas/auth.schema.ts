import { z } from "zod";

export const RegisterDtoSchema = z
  .object({
    fullName: z
      .string()
      .min(1, { message: "Full name is required" })
      .max(100, { message: "Full name must not exceed 100 characters" }),
    email: z.string().email({ message: "Invalid email format" }),
    phone: z.string().regex(/^[0-9]{10,15}$/, {
      message: "Phone number must be 10-15 digits",
    }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .max(100, { message: "Password must not exceed 100 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterDto = z.infer<typeof RegisterDtoSchema>;
