import { z } from 'zod';
import { request } from './request';

const userLink = z.object({
  name: z.string().nullish(),
  platform: z.string(),
  url: z.string().url(),
});
export const linkSchema = z.object({
  links: userLink.array(),
});

export type UserLink = z.infer<typeof linkSchema>;
export type Link = z.infer<typeof userLink>;

export const linkApi = {
  get: () => request('get', '/api/links'),
  update: ({ links }: UserLink) =>
    request('put', '/api/links', {
      links,
    }),
};
