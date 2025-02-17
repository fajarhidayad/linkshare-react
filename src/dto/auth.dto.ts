import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string({ required_error: "Can't be empty" }).email(),
  password: z.string().min(8, { message: 'min 8 chars' }),
  confirmPassword: z.string().min(8, { message: 'min 8 chars' }),
});

export const loginSchema = registerSchema.omit({ confirmPassword: true });

export type LoginRequest = z.infer<typeof loginSchema>;
export type RegisterRequest = z.infer<typeof registerSchema>;
