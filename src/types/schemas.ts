import { z } from 'zod';

/**
 * Zod schemas for runtime validation of API responses
 */

export const VenueSchema = z.object({
  id: z.union([z.string(), z.number()]).transform(String),
  name: z.string().default(''),
  city: z.string().optional(),
  state: z.string().optional(),
  address: z.string().optional(),
  postcode: z.string().optional(),
  postalCode: z.string().optional(),
  timezone: z.string().optional(),
});

export const RawEventSchema = z.object({
  id: z.union([z.string(), z.number()]).transform(String),
  name: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  info: z.string().optional(),
  type: z.string().optional(),
  venueId: z.union([z.string(), z.number()]).optional(),
  startDate: z.string().optional(),
  dateTime: z.string().optional(),
  timezone: z.string().optional(),
  dates: z.object({
    start: z.object({
      dateTime: z.string().optional(),
    }).optional(),
  }).optional(),
});

export const ApiResponseSchema = z.union([
  z.array(RawEventSchema),
  z.object({
    events: z.array(RawEventSchema),
    venues: z.array(VenueSchema).optional(),
  }),
  z.object({
    _embedded: z.object({
      events: z.array(RawEventSchema),
    }),
  }),
]);

export type RawEvent = z.infer<typeof RawEventSchema>;
export type RawVenue = z.infer<typeof VenueSchema>;
