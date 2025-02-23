import { z } from 'zod';

export const updateProfileSchema = z.object({
  firstName: z.string().min(3).max(100),
  lastName: z.string().min(3).max(100),
  username: z.string().min(3).max(100),
  // bio: z.string().nullish(),
  profilePicture: z.instanceof(File).nullish(),
  email: z.string({ required_error: "Can't be empty" }).email(),
});

export type UpdateProfileDto = z.infer<typeof updateProfileSchema>;
